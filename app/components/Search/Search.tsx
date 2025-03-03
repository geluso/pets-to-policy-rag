"use client"

import SmartSummary from './SmartSummary/SmartSummary'
import useSearch from './useSearch/useSearch'
import SourceDocuments from './SourceDocuments/SourceDocuments'
import SearchInput from './SearchInput/SearchInput'
import Header from './Header/Header'

export default function Search() {
    const {
        search,
        hasSearched,
        isSearching,
        isStreamingSmartSummary,
        isGeneratingSourceDocuments,
        smartSummary,
        sourceDocuments,
    } = useSearch()

    return (
        <>
            <SearchInput
                handleSubmit={search}
                isSearching={isSearching}
            />
            {hasSearched ? (
                <div className="flex flex-col w-full h-full">
                    <SmartSummary
                        smartSummary={smartSummary}
                    />
                    {!isStreamingSmartSummary ? (
                        <SourceDocuments
                            sourceDocuments={sourceDocuments}
                            isGenerating={isGeneratingSourceDocuments}
                        />
                    ) : null}
                </div>
            ) : null}
        </>
    )
}
