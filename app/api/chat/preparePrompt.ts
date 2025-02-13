import prisma from "@/lib/prisma"
import { Message, SearchResult } from "@/app/types"
import { prompt_configuration } from "@prisma/client"

async function formatInput(query: string, sourceDocuments: SearchResult[], prompt: prompt_configuration) {
  const systemMessage = (prompt?.system_message || '').replace('$query', query)
  const humanMessage = prompt?.human_message || ''
  const sourceDocumentMessages = sourceDocuments.map(({ score, doc: { text } }) => (prompt?.document_message || '').replace('$score', '' + score).replace('$text', text))
  return { systemMessage, humanMessage, sourceDocumentMessages }
}

function createInput(systemMessage: string, sourceDocumentMessages: string[], humanMessage: string): Message[] {
  const input: Message[] = [
    { role: "system", content: systemMessage },
    ...sourceDocumentMessages.map(sourceDocumentMessage => ({ role: "system", content: sourceDocumentMessage })),
    { role: "user", content: humanMessage }
  ];
  return input
}

export async function preparePrompt(query: string, sourceDocuments: SearchResult[]): Promise<Message[]> {
  const promptConfig = await prisma.prompt_configuration.findFirst() as prompt_configuration
  const { systemMessage, humanMessage, sourceDocumentMessages } = await formatInput(query, sourceDocuments, promptConfig)
  const input = createInput(systemMessage, sourceDocumentMessages, humanMessage)
  return input
}
