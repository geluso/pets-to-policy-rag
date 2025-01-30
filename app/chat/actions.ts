"use server"

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

export async function chat(topic: string) {
  console.log({ topic })
  const model = new ChatOpenAI({ model: "gpt-4" });
  const messages = [
    new SystemMessage("Do"),
    new HumanMessage(`write me a two paragraph essay on ${topic}`),
  ];
  
  const response = await model.invoke(messages);
  const { content } = response
  console.log(response)
  console.log({ content })
  return content.toString()
}