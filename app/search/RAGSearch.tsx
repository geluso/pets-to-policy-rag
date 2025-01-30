"use client"

import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { getResults } from "./actions"
import { Document } from "@prisma/client"
import WALawDocument from "./WALawDocument"

export default function RagSearch() {
  const searchParams = useSearchParams()
  const [q, setQ ] = useState(searchParams.get('q') ?? '')
  const [results, setResults] = useState<Document[]>([])

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    getResults(q).then(setResults)
  }
  
  return <Suspense>
    <div>
      <h1>PETs to Policy RAG</h1>

      <h2>Question</h2>
      <form onSubmit={handleSubmit}>
        <input value={q} onChange={(e) => setQ(e.target.value)} size={80} type="text" name="q" />
        <button type="submit">Submit</button>
      </form>

      <p>Searching for {q}</p>

      <h2>Answer</h2>
      <p>LLM gibberish</p>

      <h2>Sources</h2>
      {results.map(doc => <WALawDocument key={doc.id} doc={doc} /> )}
    </div>
  </Suspense>
}