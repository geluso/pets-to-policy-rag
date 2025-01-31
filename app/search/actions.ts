"use server"

import prisma from "@/lib/prisma"
import { OpenAIEmbeddings } from '@langchain/openai'
import { NeonPostgres } from "@langchain/community/vectorstores/neon";
import { Document } from "@prisma/client";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
})

const vectorStore = await NeonPostgres.initialize(embeddings, {
  connectionString: process.env.DATABASE_URL as string,
});

export async function similaritySearch(query: string) {
  const matches = await vectorStore.similaritySearch(query, 2);
  const docIds = matches.map(match => match.metadata.documentId)
  console.log('doc IDs:', docIds)
  const docs = await prisma.document.findMany({ where: { id: { in: docIds } }})
  return docs
}

export async function llmSummarize(query: string, docs: Document[]) {

}