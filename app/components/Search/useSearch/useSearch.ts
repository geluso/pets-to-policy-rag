import { getChunks } from '@/app/lib/rag_server/api'
import { SearchStatus, SmartSummary, SourceDocument } from '@/app/types'
import { useCallback, useState, useEffect } from 'react'
import useSmartSummary from './useSmartSummary'
import useSourceDocuments from './useSourceDocuments'
import { fetchChunkCollections } from './fetchChunkCollections'
import { fetchRelevantChunks } from './fetchRelevantChunks'

export default function useSearch(): {
    search: (query: string) => Promise<void>
    searchStatus: SearchStatus
    smartSummary: SmartSummary
    sourceDocuments: SourceDocument[]
} {
    const [searchStatus, setSearchStatus] = useState<SearchStatus>(SearchStatus.DEFAULT)
    const {smartSummary, resetSmartSummary, generateSmartSummary, isInitializingSmartSummary} = useSmartSummary()
    const {sourceDocuments, resetSourceDocuments, generateSourceDocuments} = useSourceDocuments()

    const search = useCallback(async (query: string) => {

        try {
            resetSmartSummary()
            resetSourceDocuments()
            setSearchStatus(SearchStatus.FINDING_CHUNKS)
            const foundChunks = await getChunks(query)

            if (foundChunks.length === 0) {
                console.warn(`No chunks found for query: ${query}`)
                setSearchStatus(SearchStatus.DEFAULT)
                return
            }

            // setSearchStatus(SearchStatus.FILTERING_CHUNKS)
            // const relevantChunks = await fetchRelevantChunks(query, foundChunks)

            // if (relevantChunks.length === 0) {
            //     console.warn(`No relevant chunks found for query: ${query}`)
            //     setSearchStatus(SearchStatus.DEFAULT)
            //     return
            // }

            const chunkCollections = await fetchChunkCollections(foundChunks)

            setSearchStatus(SearchStatus.GENERATING_SUMMARY)
            generateSmartSummary(query, chunkCollections)

            await generateSourceDocuments(query, chunkCollections)
        } catch (error) {
            console.error('USE SEARCH', error)
        } finally {
            setSearchStatus(SearchStatus.DEFAULT)
        }
    }, [])

    useEffect(() => {
        if (isInitializingSmartSummary) {
            setSearchStatus(SearchStatus.GENERATING_SUMMARY)
        } else if (smartSummary) {
            setSearchStatus(SearchStatus.GENERATING_DOCUMENTS)
        }
    }, [isInitializingSmartSummary, smartSummary])

    return {
        search,
        searchStatus,
        smartSummary,
        sourceDocuments,
    }
}
