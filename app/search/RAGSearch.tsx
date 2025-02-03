"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { similaritySearch } from "./actions"
import { Document } from "@prisma/client"
import WALawDocument from "./WALawDocument"
import { DocumentInterface } from "@langchain/core/documents"
import { useStreamChat } from "../chat/useStreamChat"

type SearchResult = {
  docs: {
      id: string;
      url: string;
      title: string;
      text: string;
  }[];
  matches: DocumentInterface<Record<string, any>>[];
}

export default function RagSearch() {
  const searchParams = useSearchParams()
  const [q, setQ ] = useState(searchParams.get('q') ?? '')
  const [results, setResults] = useState<any>([])
  const { response, isLoading, isStreaming, startStreaming } = useStreamChat()

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const docs = await similaritySearch(q)
    setResults(docs)
    console.log('search results:', docs)
    startStreaming(q, docs)
  }
  
  return <div>
    <h1>PETs to Policy RAG</h1>

    <h2>Question</h2>
    <form onSubmit={handleSubmit}>
      <input value={q} onChange={(e) => setQ(e.target.value)} size={80} type="text" name="q" />
      <button type="submit">Submit</button>
    </form>

    <h2>Answer</h2>
    {isLoading && <p>Loading...</p>}
    <p>{response}</p>

    <h2>Sources</h2>
    {results.map((doc: any) => {
      return <div key={doc.id}>
        <div className="border border-solid border-black mb-2 p-2">
          <h3>{doc.title}</h3>
          <p>{doc.text}</p>
          <p>
            <a href={doc.url}>{doc.url}</a>
          </p>
        </div>
      </div>
    })}
  </div>
}