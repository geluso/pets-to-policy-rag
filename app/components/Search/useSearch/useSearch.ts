import { getChunks } from '@/app/lib/rag_server/api'
import { SearchStatus, SmartSummary, SourceDocument } from '@/app/types'
import { useCallback, useState } from 'react'
import useSmartSummary from './useSmartSummary'
import useSourceDocuments from './useSourceDocuments'
import { fetchChunkCollections } from './fetchChunkCollections'
import { fetchRelevantChunks } from './fetchRelevantChunks'
import toast from 'react-hot-toast'

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
            const foundChunks = await getChunks(query, 3)

            if (foundChunks.length === 0) {
                console.warn(`No chunks found for query: ${query}`)
                setSearchStatus(SearchStatus.DEFAULT)
                return
            }

            setSearchStatus(SearchStatus.FILTERING_CHUNKS)
            const relevantChunks = await fetchRelevantChunks(query, foundChunks)

            if (relevantChunks.length === 0) {
                console.warn(`No relevant chunks found for query: ${query}`)
                setSearchStatus(SearchStatus.DEFAULT)
                return
            }

            const chunkCollections = await fetchChunkCollections(relevantChunks)

            setSearchStatus(SearchStatus.GENERATING_SUMMARY)
            
            await new Promise<void>((resolve) => {
                generateSmartSummary(query, chunkCollections)
                const checkInterval = setInterval(() => {
                    if (!isInitializingSmartSummary) {
                        clearInterval(checkInterval)
                        setSearchStatus(SearchStatus.GENERATING_DOCUMENTS)
                        resolve()
                    }
                }, 100)
            })

            await generateSourceDocuments(query, chunkCollections)
        } catch (error) {
            console.error('USE SEARCH', error)

            toast.error('Search failed')
        } finally {
            setSearchStatus(SearchStatus.DEFAULT)
        }
    }, [])

    return {
        search,
        searchStatus,
        smartSummary,
        sourceDocuments,
    }
}
