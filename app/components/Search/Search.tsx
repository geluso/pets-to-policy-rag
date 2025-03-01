"use client"

import SmartSummary from "./SmartSummary/SmartSummary"
import SearchInput from "./SearchInput/SearchInput"
import useSearch from "./useSearch/useSearch"
import { useEffect, useState } from "react"
import Suggestions from "./Suggestions/Suggestions"
import SourceDocuments from "./SourceDocuments/SourceDocuments"

export default function Search() {
  const [isInitialLoad, setIsInitialLoad] = useState(true)
  const {
    search,
    isStreamingSmartSummary,
    isGeneratingSourceDocuments,
    smartSummary,
    sourceDocuments,
  } = useSearch()

  useEffect(() => {
    if (smartSummary) setIsInitialLoad(false)
  }, [smartSummary])

  const handleSubmit = (inputValue: string) => {
    search(inputValue)
  }

  return (
    <div className="flex w-full h-full flex-col gap-5">
      <SearchInput handleSubmit={handleSubmit} isSearching={isStreamingSmartSummary || isGeneratingSourceDocuments} />
      {isInitialLoad ? (
        <Suggestions />
      ) : (
        <div className="flex flex-col w-full h-full">
          <SmartSummary smartSummary={smartSummary} />
          {isStreamingSmartSummary ? (
            <SourceDocuments sourceDocuments={sourceDocuments} />
          ) : null}
        </div>
      )}
    </div>
  )
}
