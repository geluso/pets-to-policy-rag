"use server"

import OpenAI from "openai";
import { bridgeOnePrompt, outerSystemPrompt } from "./prompts";
const openai = new OpenAI();

export async function preprocessQuery(query: string): Promise<string> {
  const content = `
    ${outerSystemPrompt}

    ${bridgeOnePrompt}

    Input User Query: "${query}"
  `;
  const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [ { role: "user", content } ],
  });
  const preprocessedQuery = completion.choices[0].message.content ?? ''
  console.log({ query, preprocessedQuery })
  return preprocessedQuery
}
