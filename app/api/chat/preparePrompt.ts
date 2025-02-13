import { SearchResult } from "@/app/types"
import prisma from "@/lib/prisma"
import { BaseMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { prompt_configuration } from "@prisma/client"

async function formatInput(query: string, sourceDocuments: SearchResult[], prompt: prompt_configuration) {
  const systemMessage = (prompt?.system_message || '').replace('$query', query)
  const humanMessage = prompt?.human_message || ''
  const sourceDocumentMessages = sourceDocuments.map(({ score, doc: { text } }) => (prompt?.document_message || '').replace('$score', '' + score).replace('$text', text))
  return { systemMessage, humanMessage, sourceDocumentMessages }
}

function createInput(systemMessage: string, sourceDocumentMessages: string[], humanMessage: string) {
  const input = [
    new SystemMessage(systemMessage),
    ...sourceDocumentMessages.map(sourceDocumentMessage => new SystemMessage(sourceDocumentMessage)),
    new HumanMessage(humanMessage)
  ];
  return input
}

export async function preparePrompt(query: string, sourceDocuments: SearchResult[]): Promise<(BaseMessage)[]> {
  const promptConfig = await prisma.prompt_configuration.findFirst() as prompt_configuration
  const { systemMessage, humanMessage, sourceDocumentMessages } = await formatInput(query, sourceDocuments, promptConfig)
  const input = createInput(systemMessage, sourceDocumentMessages, humanMessage)
  return input
}
