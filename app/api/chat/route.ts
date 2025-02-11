'use server'

import { NextRequest } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { search, SearchResult } from '@/app/rag_server/api';
import prisma from '@/lib/prisma';
import { prompt_configuration } from '@prisma/client';

const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    streaming: true, // Enable streaming in LangChain
})

async function preprocessQuery(query: string): Promise<string> {
  const preprocessingModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.3,  // Keep responses factual
      modelName: "gpt-3.5-turbo"  // Use gpt-3.5-turbo for lower cost
  });

  const prompt = `You are a legal AI assistant improving user search queries for a legal document retrieval system. 
  Given the following user query, expand it into a well-formed legal search query while maintaining its intent.

  User Query: "${query}"

  Expanded Legal Query:`;

  const response = await preprocessingModel.invoke([new HumanMessage(prompt)]);
  return response.content.toString().trim();
}

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
  const initialQuery = json.query

  const embeddedQuery = await preprocessQuery(initialQuery)
  console.log('/api/chat', { initialQuery, embeddedQuery })

  const results = await search(embeddedQuery)
  console.log('search results:', results)

  const prompt = await prisma.prompt_configuration.findFirst() as prompt_configuration
  const { systemMessage, humanMessage, documentMessages } = await formatInput(initialQuery, results, prompt)
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