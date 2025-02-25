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
  console.log({sourceDocuments})

  useEffect(() => {
    if (paragraphs || sourceDocuments) setIsInitialLoad(false)
  }, [paragraphs, sourceDocuments])

  const handleSubmit = (inputValue: string) => {
    search(inputValue)
  }

  return (
    <div className="flex w-full h-full flex-col gap-1">
      <div className="mb-4">
        <SearchInput handleSubmit={handleSubmit} isSearching={isSearching} />
      </div>
      {isInitialLoad ? (
        <Suggestions />
      ) : (
        <div className="flex w-full h-full">
          <div className="w-1/2">
            <SourceDocuments sourceDocuments={sourceDocuments} />
          </div>
          <div className="w-1/2 pl-2 pr-2">
            <Paragraphs paragraphs={paragraphs} />
          </div>
        </div>
      )}
    </div>
  )
}
