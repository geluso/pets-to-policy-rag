import { Message, SearchResult } from "@/app/types"
import { bridgeTwoPrompt, outerSystemPrompt } from "@/app/lib/rag_server/prompts"

export async function preparePrompt(query: string, sourceDocuments: SearchResult[]): Promise<Message[]> {
  const input: Message[] = [
    { role: "user", content: `
      ${outerSystemPrompt}

      ${bridgeTwoPrompt}
      
      user's query: ${query}

      retrieved text (in a list): ${sourceDocuments.map(({doc: {text}}: SearchResult) => {
        return `${text}\n`
      })}
    ` }
  ];
  return input
}
