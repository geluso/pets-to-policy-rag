'use server'

import { NextRequest } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { Document } from '@prisma/client';

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true, // Enable streaming in LangChain
})

export async function POST(req: NextRequest) {
  const { query, docs } = await req.json()
  console.log('/api/chat', { query, docs })

  const messages = [
    new SystemMessage(`This is the user query = ${query ?? "No query provided"}`),
    ...(docs?.map((doc: Document) => new SystemMessage(`This is a found document: ${doc.text}`)) || []),
    new HumanMessage(`Answer the given query using specific references from the given found documents.`)
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