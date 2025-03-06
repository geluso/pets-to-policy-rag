import { getChunks } from '@/app/lib/rag_server/api'
import { CodeDomain, SearchStatus, SmartSummary, SourceDocument, StateDomain } from '@/app/types'
import { useCallback, useState } from 'react'
import useSmartSummary from './useSmartSummary'
import useSourceDocuments from './useSourceDocuments'
import { fetchChunkCollections } from './fetchChunkCollections'
import toast from 'react-hot-toast'

export default function useSearch(codeDomain: CodeDomain, stateDomain: StateDomain): {
    search: (query: string) => Promise<void>
    searchStatus: SearchStatus
    smartSummary: SmartSummary
    sourceDocuments: SourceDocument[]
} {
    const [searchStatus, setSearchStatus] = useState<SearchStatus>(SearchStatus.DEFAULT)
    const {smartSummary, resetSmartSummary, generateSmartSummary} = useSmartSummary()
    const {sourceDocuments, resetSourceDocuments, generateSourceDocuments} = useSourceDocuments()

    const search = useCallback(async (query: string) => {
        try {
            resetSmartSummary()
            resetSourceDocuments()
            setSearchStatus(SearchStatus.FINDING_CHUNKS)
            const foundChunks = await getChunks(stateDomain, codeDomain, query, 3)

            if (foundChunks.length === 0) {
                console.warn(`No chunks found for query: ${query}`)
                toast.error('Search returned no results')
                setSearchStatus(SearchStatus.DEFAULT)
                return
            }

            const chunkCollections = await fetchChunkCollections(foundChunks)

            setSearchStatus(SearchStatus.GENERATING_DOCUMENTS)
            await generateSourceDocuments(codeDomain, query, chunkCollections)

            setSearchStatus(SearchStatus.GENERATING_SUMMARY)
            await generateSmartSummary(codeDomain, query, sourceDocuments)
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
