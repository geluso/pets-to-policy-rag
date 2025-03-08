import { errorCodeToMessage, errorFailedFetchingSourceDocs, errorSourceDocValidationFailed } from '@/app/errors'
import { ChunkCollection, CodeDomain, SourceDocument, StateDomain } from '@/app/types'
import toast from 'react-hot-toast'

export async function fetchSourceDocument(
    stateDomain: StateDomain,
    codeDomain: CodeDomain,
    query: string,
    chunkCollection: ChunkCollection,
): Promise<SourceDocument | null> {
    try {
        const response = await fetch('/api/source-documents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({stateDomain, codeDomain, query, chunkCollection}),
        })

        if (!response.ok) {
            throw errorFailedFetchingSourceDocs
        }

        const data = await response.json()

        if (!data.url || !data.relevantKeywords || !data.relevantSubsections || !data.relevantLanguage || !data.section) {
            throw errorSourceDocValidationFailed
        }

        return {
            url: data.url,
            relevantKeywords: data.relevantKeywords,
            relevantSubsections: data.relevantSubsections,
            relevantLanguage: data.relevantLanguage,
            section: data.section,
        }
    } catch (error) {
        throw error
    }
}

export async function fetchSourceDocuments(
    stateDomain: StateDomain,
    codeDomain: CodeDomain,
    query: string,
    chunkCollections: ChunkCollection[],
): Promise<SourceDocument[]> {
    const results = await Promise.all(
        chunkCollections.map(async (chunkCollection) => {
            try {
                return await fetchSourceDocument(stateDomain, codeDomain, query, chunkCollection)
            } catch (error) {
                console.warn(`Skipping failed fetch for chunk: ${chunkCollection.summaryReadable.url}`, error)
                const message = errorCodeToMessage(error)
                toast.error(message)
                return null
            }
        })
    )

    return results.filter((doc): doc is SourceDocument => doc !== null)
}
