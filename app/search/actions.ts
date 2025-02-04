/* eslint-disable  @typescript-eslint/no-unused-vars */

"use server"

import prisma, { OurCustomFakeEmbedder } from "@/lib/prisma"

export async function similaritySearch(query: string, threshold = 0.3) {
  const json = JSON.stringify({ text: query })
  const vector = await fetch('https://4cb3-2601-602-8b82-92b0-64d0-4b7b-a51a-85fb.ngrok-free.app/embed/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: json
  }).then(res => res.json())
  console.log('vector size:', vector.embedding.length)
  console.log('vector:', vector)

  // const matches = await vectorStore.similaritySearchVectorWithScore(vector, 10)
  // console.log('All matches:', matches);
  // // Filter matches where the score is BELOW the threshold (closer match)
  // const filteredMatches = matches.filter(([_, score]) => score <= threshold);
  // if (filteredMatches.length === 0) {
  //   return [];
  // }
  // const docIds = filteredMatches.map(([match]) => match.metadata.documentId).filter(id => !!id)
  // console.log('Filtered matches:', filteredMatches);
  // console.log('Doc IDs:', docIds);
  // const docs = await prisma.document.findMany({
  //   where: { id: { in: docIds } }
  // });
  // return docs;
}
