/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useStreamChat } from "./useStreamChat"
import { search } from "../../rag_server/api"

import { marked } from "marked";
import { Paragraph } from "@/app/types"

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
  
  // return <div>
  //   <h1>PETs to Policy RAG</h1>

  //   <h2>Question</h2>
  //   <form onSubmit={handleSubmit}>
  //     <input value={q} onChange={(e) => setQ(e.target.value)} size={80} type="text" name="q" />
  //     <button type="submit">Submit</button>
  //   </form>

  //   <h2>Answer</h2>
  //   {isLoading && <p>Loading...</p>}
  //   <div>{response}</div>
  // </div>

  const data: Paragraph = [
    {
      isImportant: true,
      text: 'This is a test'
    },
    {
      isImportant: false,
      text: 'This is a test'
    }
  ]

  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 bg-red-500 h-full gap-1 flex flex-col">
        {/* {data.map((item) => (
          <div key={item} className="w-full h-full bg-green-500">
            {item}
          </div>
        ))} */}
      </div>
      <div className="w-1/2 bg-blue-500 h-full">
          {data.map(({isImportant, text}) => (
            <span key={text + Math.random()} className={`${isImportant ? 'text-red-500' : 'text-black'}`}>
              {text}
            </span>
          ))}
      </div>
    </div>
  )
}