'use server'

import { NextRequest } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { SearchResult } from '@/app/types';
import { preparePrompt } from './preparePrompt';

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true, // Enable streaming in LangChain
})

// This is the POST /api/chat/ endpoint
// It returns a streaming response
export async function POST(req: NextRequest) {
  const json = await req.json()
  const query: string = json.query
  const searchResults: SearchResult[] = json.searchResults

  const preparedPrompt = await preparePrompt(query, searchResults)
  const stream = await model.stream(preparedPrompt)
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