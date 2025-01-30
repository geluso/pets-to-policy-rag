'use server'

import { NextRequest } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true, // Enable streaming in LangChain
})

export async function POST(req: NextRequest) {
  const { topic } = await req.json()

  const messages = [
    new SystemMessage("Do"),
    new HumanMessage(`write me a two paragraph essay on ${topic}`),
  ];
  const stream = await model.stream(messages)
  const reader = stream.getReader();
  const encoder = new TextEncoder();

  const readableStream = new ReadableStream({
    async start(controller) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        // Convert AIMessageChunk to a string before streaming
        const textChunk = value.content.toString(); 
        controller.enqueue(encoder.encode(textChunk));
      }
      controller.close();
    }
  });

  return new Response(readableStream, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache',
    },
  })
}