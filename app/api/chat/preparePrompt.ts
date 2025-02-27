import { Message, SearchResult } from "@/app/types"
import { bridgeTwoPrompt, outerSystemPrompt } from "@/app/lib/rag_server/prompts"

export async function preparePrompt(query: string, sourceDocuments: SearchResult[]): Promise<Message[]> {
  const input: Message[] = [
    { role: "system", content: outerSystemPrompt},
    { role: "system", content: bridgeTwoPrompt},
    ...sourceDocuments.map(({doc: { text }}: SearchResult) => ({ role: "system", content: `summarized chapter or raw text chunk: ${text}` })),
    { role: "user", content: query }
  ];
  return input
}
