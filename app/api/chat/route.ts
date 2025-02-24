'use server'

import { NextRequest } from 'next/server'
import { SearchResult } from '@/app/types';
import { preparePrompt } from './preparePrompt';

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

const openai = new OpenAI();

const ParagraphsSchema = z.object({
  // a: all paragraphs
  // i: is the paragraph important
  // t: paragraph text
  a: z.array(
    z.array(
      z.object({
        i: z.boolean(),
        t: z.string()      
      })
    )
  )}
)

// This is the POST /api/chat/ endpoint
// It returns a streaming response
export async function POST(req: NextRequest) {
  const json = await req.json()
  const query: string = json.query
  const searchResults: SearchResult[] = json.searchResults

  const preparedPrompt = await preparePrompt(query, searchResults) as ChatCompletionMessageParam[]
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      const stream = openai.beta.chat.completions
      .stream({
        model: "gpt-4o",
        messages: preparedPrompt,
        response_format: zodResponseFormat(ParagraphsSchema, "entities"),
      })
      .on("refusal.done", () => console.log("request refused"))
      .on("content.delta", ({ delta }) => {
        // { snapshot, parsed } also available here. deleted in lint.
        // parsed always returns proper JSON from the steam so far.
        // parsed is important as a proof of concept showing JSON can be parsed mid-stream.
        // but, we need the JSON to be parsed mid-stream on the client, not in this route.
        // I have not found a good library that will parse JSON via a stream.
        // opportunity to create a library? ":0)
        console.log("delta:", delta);
        controller.enqueue(encoder.encode(delta));
      })
      .on("content.done", () => {
        console.log("done");
        controller.close();
      });
      await stream.done();
    }
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
    },
  })
}