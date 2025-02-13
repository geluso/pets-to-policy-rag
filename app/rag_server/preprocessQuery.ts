"use server"

import { HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

export async function preprocessQuery(query: string): Promise<string> {
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
