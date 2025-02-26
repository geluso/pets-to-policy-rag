"use server"

import OpenAI from "openai";
import { bridgeOnePrompt, outerSystemPrompt } from "./prompts";
const openai = new OpenAI();

export async function preprocessQuery(query: string): Promise<string> {
  const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: outerSystemPrompt },
        { role: "system", content: bridgeOnePrompt },
        { role: "user", content: query },
      ],
  });
  const preprocessedQuery = completion.choices[0].message.content ?? ''
  console.log('preprocessQuery', { query, preprocessedQuery })
  return preprocessedQuery
}
