/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */

"use client"

import Paragraphs from "./Paragraphs/Paragraphs"
import SearchInput from "./SearchInput/SearchInput"
import { useSearch } from "./useSearch"
import { useEffect, useState } from "react"
import Suggestions from "./Suggestions/Suggestions"
import SourceDocuments from "./SourceDocuments/SourceDocuments"

export default function Search() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const { search, isSearching, sourceDocuments, paragraphs } = useSearch()

  useEffect(() => {
    (paragraphs || sourceDocuments) && setIsInitialLoad(false)
  }, [paragraphs, sourceDocuments])

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
          <SourceDocuments sourceDocuments={sourceDocuments} isSearching={isSearching} />
          <Paragraphs paragraphs={paragraphs} isSearching={isSearching} />
        </div>
      )}
    </div>
  )
}
