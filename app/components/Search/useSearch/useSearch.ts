import { getChunks } from '@/app/lib/rag_server/api'
import { SmartSummary, SourceDocument } from '@/app/types'
import { useCallback, useState } from 'react'
import useSmartSummary from './useSmartSummary'
import useSourceDocuments from './useSourceDocuments'
import { fetchChunkCollections } from './fetchChunkCollections'
import { fetchRelevantChunks } from './fetchRelevantChunks'

export default function useSearch(): {
    search: (query: string) => Promise<void>
    hasSearched: boolean
    isSearching: boolean
    isStreamingSmartSummary: boolean
    isGeneratingSourceDocuments: boolean
    smartSummary: SmartSummary
    sourceDocuments: SourceDocument[]

} {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [hasSearched, setHasSearched] = useState<boolean>(false)
    const {smartSummary, generateSmartSummary, isStreamingSmartSummary} = useSmartSummary()
    const {sourceDocuments, generateSourceDocuments, isGeneratingSourceDocuments} = useSourceDocuments()

    const search = useCallback(async (query: string) => {
        setIsSearching(true)
        setHasSearched(true)

        try {
            const foundChunks = await getChunks(query)

            if (foundChunks.length === 0) {
                console.warn(`No chunks found for query: ${query}`)

                return
            }

            const relevantChunks = await fetchRelevantChunks(query, foundChunks)

            if (relevantChunks.length === 0) {
                console.warn(`No relevant chunks found for query: ${query}`)

                return
            }

            const chunkCollections = await fetchChunkCollections(relevantChunks)

            generateSmartSummary(query, chunkCollections)
            await generateSourceDocuments(query, chunkCollections)
        } catch(error) {
            console.error('USE SEARCH', error)
        } finally {
            setIsSearching(false)
        }
    }, [])

    return {
        search,
        isSearching,
        hasSearched,
        isStreamingSmartSummary,
        isGeneratingSourceDocuments,
        smartSummary,
        sourceDocuments,
    }
}
