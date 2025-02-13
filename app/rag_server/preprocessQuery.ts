"use server"

import OpenAI from "openai";
const openai = new OpenAI();

export async function preprocessQuery(query: string): Promise<string> {
  const content = `You are a legal AI assistant improving user search queries for a legal document retrieval system. 
  Given the following user query, expand it into a well-formed legal search query while maintaining its intent.

  User Query: "${query}"

  Expanded Legal Query:`;
  const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [ { role: "user", content } ],
  });
  const preprocessedQuery = completion.choices[0].message.content ?? ''
  console.log({ query, preprocessedQuery })
  return preprocessedQuery
}
