import { errorCodeToMessage, errorFailedFetchingSourceDocs, errorNoToolCalls, errorRateLimitExceeded, errorSourceDocValidationFailed } from '@/app/errors'
import { ChunkCollection, SourceDocument } from '@/app/types'
import { errorMiddleware } from '@/app/util'
import toast from 'react-hot-toast'

export async function fetchSourceDocument(query: string, chunkCollection: ChunkCollection): Promise<SourceDocument | null> {
    try {
        const response = await fetch('/api/source-documents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query, chunkCollection}),
        })

        if (!response.ok) {
            throw errorFailedFetchingSourceDocs
        }

        const data = await response.json()

        if (!data.question || !data.citation || !data.relevantSubsections || !data.relevantLanguage) {
            throw errorSourceDocValidationFailed
        }

        return {
            url: data.url,
            question: data.question,
            citation: data.citation,
            relevantSubsections: data.relevantSubsections,
            relevantLanguage: data.relevantLanguage,
        }
    } catch (error) {
        throw error
    }
}

export async function fetchSourceDocuments(query: string, chunkCollections: ChunkCollection[]): Promise<SourceDocument[]> {
    const results = await Promise.all(
        chunkCollections.map(async (chunkCollection) => {
            try {
                return await fetchSourceDocument(query, chunkCollection)
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
