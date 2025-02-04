'use server'

import { NextRequest } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { SearchResult } from '@/app/rag_server/api';
import prisma from '@/lib/prisma';
import { prompt_configuration } from '@prisma/client';

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true, // Enable streaming in LangChain
})

async function formatInput(query: string, results: SearchResult[], prompt: prompt_configuration) {
  const systemMessage = (prompt?.system_message || '').replace('$query', query)
  const humanMessage = prompt?.human_message || ''
  const documentMessages = results.map(({ score, doc: { text } }) => (prompt?.document_message || '').replace('$score', '' + score).replace('$text', text))
  console.log(systemMessage, humanMessage, documentMessages)
  return { systemMessage, humanMessage, documentMessages }
}

function createInput(systemMessage: string, documentMessages: string[], humanMessage: string) {
  const input = [
    new SystemMessage(systemMessage),
    ...documentMessages.map(docMessage => new SystemMessage(docMessage)),
    new HumanMessage(humanMessage)
  ];
  return input
}

export async function POST(req: NextRequest) {
  const json = await req.json()
  const query = json.query
  const results = json.results as SearchResult[]
  console.log('/api/chat', { query, results })

  const prompt = await prisma.prompt_configuration.findFirst() as prompt_configuration
  const { systemMessage, humanMessage, documentMessages } = await formatInput(query, results, prompt)
  const input = createInput(systemMessage, documentMessages, humanMessage)

  const stream = await model.stream(input)
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