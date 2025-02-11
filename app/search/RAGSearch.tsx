/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useStreamChat } from "../hooks/useStreamChat"
import { search } from "../rag_server/api"

import { marked } from "marked";

import classes from './MarkdownText.module.css'

interface Props {
    text: string
}

export const safelyCreateMarkdown = (text: string) => {
    const markdown = marked(text) as string;
    const __html = markdown
    return { __html };
};

export function MarkdownText({text}: Props) {
    return (
        <div
            className={`${classes.markdownReset}`}
            dangerouslySetInnerHTML={safelyCreateMarkdown(text)}
        />
    )
}

export default function RagSearch() {
  const searchParams = useSearchParams()
  const [q, setQ ] = useState(searchParams.get('q') ?? '')
  const [results, setResults] = useState<any>([])
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
    <MarkdownText text={response} />

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