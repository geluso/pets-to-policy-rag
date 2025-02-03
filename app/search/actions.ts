/* eslint-disable  @typescript-eslint/no-unused-vars */

"use server"

import prisma from "@/lib/prisma"
import { OpenAIEmbeddings } from '@langchain/openai'
import { NeonPostgres } from "@langchain/community/vectorstores/neon";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
})

const vectorStore = await NeonPostgres.initialize(embeddings, {
  connectionString: process.env.DATABASE_URL as string,
});

export async function similaritySearch(query: string, threshold = 0.3) {
  const matches = await vectorStore.similaritySearchWithScore(query, 10); // Get up to 10 matches with scores
  console.log('All matches:', matches);
  // Filter matches where the score is BELOW the threshold (closer match)
  const filteredMatches = matches.filter(([_, score]) => score <= threshold);
  if (filteredMatches.length === 0) {
    return [];
  }
  const docIds = filteredMatches.map(([match]) => match.metadata.documentId);
  console.log('Filtered matches:', filteredMatches);
  console.log('Doc IDs:', docIds);
  const docs = await prisma.document.findMany({
    where: { id: { in: docIds } }
  });
  return docs;
}
