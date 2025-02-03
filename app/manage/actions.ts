"use server"

import prisma from "@/lib/prisma";
import { OpenAIEmbeddings } from '@langchain/openai'
import { NeonPostgres } from "@langchain/community/vectorstores/neon";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
})

const vectorStore = await NeonPostgres.initialize(embeddings, {
  connectionString: process.env.DATABASE_URL as string,
});

export async function createDocument({url, title, text}: { url: string, title: string, text: string }) {
  // 1. Create the document as a row in SQL
  // 2. Obtain the document SQL row ID
  // 3. Prepare the document for embedding
  // 4. Create the embedding with the SQL row ID in metadata
  const doc = await prisma.document.create({ data: { url, title, text }})
  const docId = doc.id

  const docsToEmbed = [
    { pageContent: text, metadata: { documentId: docId } },
  ];
  const vectorIds = await vectorStore.addDocuments(docsToEmbed);
  if (vectorIds.length !== 1) {
    console.warn('CreateDocument error expected 1 item created got', vectorIds.length)
  }
  return doc
}

export async function getAllDocs() {
  return await prisma.document.findMany()
}