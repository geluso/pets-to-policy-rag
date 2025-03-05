import { ChunkCollection, CodeDomain, SourceDocument } from '@/app/constants/types'
import { useCallback, useState } from 'react'
import { fetchSourceDocuments } from './fetchSourceDocuments'

export default function useSourceDocuments(): {
    sourceDocuments: SourceDocument[]
    resetSourceDocuments: () => void
    generateSourceDocuments: (codeDomain: CodeDomain, query: string, chunkCollections: ChunkCollection[]) => Promise<void>
    isGeneratingSourceDocuments: boolean
} {
    const [sourceDocuments, setSourceDocuments] = useState<SourceDocument[]>([])
    const [isGeneratingSourceDocuments, setIsGeneratingSourceDocuments] = useState<boolean>(false)

    const generateSourceDocuments = useCallback(async (codeDomain: CodeDomain, query: string, chunkCollections: ChunkCollection[]) => {
        setIsGeneratingSourceDocuments(true)

        try {
            const documents = await fetchSourceDocuments(codeDomain, query, chunkCollections)
            setSourceDocuments(documents)
        } catch (error) {
            console.error('USE SOURCE DOCUMENTS', error)
        } finally {
            setIsGeneratingSourceDocuments(false)
        }
    }, [])

    const resetSourceDocuments = useCallback(() => {
        setSourceDocuments([])
    }, [])

    return {
        sourceDocuments,
        resetSourceDocuments,
        generateSourceDocuments,
        isGeneratingSourceDocuments,
    }
}
