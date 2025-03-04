"use client"

import { indexed_chunk, summary_readable } from "@prisma/client"

export default function AdminDocs({ indexedChunks, summaryReadables }: { indexedChunks: indexed_chunk[], summaryReadables: summary_readable[] }) {
  return <div>
    <h2>Chunks</h2>
    <p>Total chunks: {indexedChunks.length}</p>

    <h2>Summary Readables</h2>
    <p>Total summary readables: {summaryReadables.length}</p>
    <p>Summary readables are </p>
    <div>
      {summaryReadables.map((sr, index) => {
        return <div key={index}>
          <h3>Source: <a href={sr.url}>{sr.url}</a></h3>
          <p>{sr.summary_readable}</p>
        </div>
      })}
    </div>
  </div>
}