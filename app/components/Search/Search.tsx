/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useStreamChat } from "./useStreamChat"
import { search } from "../../rag_server/api"

import { marked } from "marked";

interface Props {
    text: string
}

export const safelyCreateMarkdown = (text: string) => {
    const markdown = marked(text) as string;
    const __html = markdown
    return { __html };
};

export default function Search() {
  const searchParams = useSearchParams()
  const [q, setQ ] = useState(searchParams.get('q') ?? '')
  const { response, isLoading, isStreaming, startStreaming } = useStreamChat()

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    startStreaming(q)
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
    <div>{response}</div>
  </div>
}