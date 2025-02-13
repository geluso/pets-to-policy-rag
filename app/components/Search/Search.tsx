/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

"use client"

import { search } from "../../rag_server/api"

import Paragraphs from "./Paragraphs/Paragraphs"
import Sources from "./Sources/Sources"
import SearchInput from "./SearchInput/SearchInput"
import { useSearch } from "./useSearch"
import { paragraphs, sources } from "./_mock"
import { useState } from "react"
import Suggestions from "./Suggestions/Suggestions"

export default function Search() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const isSearching = false // remove this
  // const { search, isSearching, sources, paragraphs } = useSearch()

  const handleSubmit = (inputValue: string) => {
    search(inputValue)
  }

  return (
    <div className="flex w-full h-full flex-col gap-1">
      <SearchInput handleSubmit={handleSubmit} isSearching={isSearching} />
      {isInitialLoad ? (
        <Suggestions />
      ) : (
        <div className="flex w-full h-full">
          <Sources sources={sources} isSearching={isSearching} />
          <Paragraphs paragraphs={paragraphs} isSearching={isSearching} />
        </div>
      )}
    </div>
  )
}
