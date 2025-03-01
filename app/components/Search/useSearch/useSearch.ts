import { getChunks } from '@/app/lib/rag_server/api'
import { SmartSummary, SourceDocument } from '@/app/types'
import { useCallback } from 'react'
import useSmartSummary from './useSmartSummary'
import useSourceDocuments from './useSourceDocuments'
import { fetchChunkCollections } from './fetchChunkCollections'

export default function useSearch(): {
    search: (query: string) => Promise<void>
    isStreamingSmartSummary: boolean
    isGeneratingSourceDocuments: boolean
    smartSummary: SmartSummary
    sourceDocuments: SourceDocument[]

} {
    const {smartSummary, generateSmartSummary, isStreamingSmartSummary} = useSmartSummary()
    const {sourceDocuments, generateSourceDocuments, isGeneratingSourceDocuments} = useSourceDocuments()

    const search = useCallback(async (query: string) => {
        try {
            const foundChunks = await getChunks(query)

            if (foundChunks.length === 0) {
                console.warn(`No chunks found for query: ${query}`)

                return
            }

            const chunkCollections = await fetchChunkCollections(foundChunks)

            generateSmartSummary(query, chunkCollections)
            generateSourceDocuments(query, chunkCollections)
        } catch(error) {
            console.error('USE SEARCH', error)
        }
    }, [])

    return {
        search,
        isStreamingSmartSummary,
        isGeneratingSourceDocuments,
        smartSummary,
        sourceDocuments,
    }
}
