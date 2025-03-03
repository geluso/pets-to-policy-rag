import { ChunkCollection, SourceDocument } from '@/app/types'

export async function fetchSourceDocument(query: string, chunkCollection: ChunkCollection): Promise<SourceDocument | null> {
    try {
        const response = await fetch('/api/source-documents', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query, chunkCollection}),
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Failed to fetch source document: ${errorText}`)
        }

        const data = await response.json()

        if (!data.question || !data.citation || !data.relevantSubsections || !data.relevantLanguage) {
            throw new Error('Invalid response format from API')
        }

        return {
            url: data.url,
            question: data.question,
            citation: data.citation,
            relevantSubsections: data.relevantSubsections,
            relevantLanguage: data.relevantLanguage,
        }
    } catch (error) {
        console.error('Error fetching source document:', error)
        return null
    }
}

export async function fetchSourceDocuments(query: string, chunkCollections: ChunkCollection[]): Promise<SourceDocument[]> {
    const results = await Promise.all(
        chunkCollections.map(async (chunkCollection) => {
            try {
                return await fetchSourceDocument(query, chunkCollection)
            } catch (error) {
                console.error(`Skipping failed fetch for chunk: ${chunkCollection.summaryReadable.url}`, error)
                return null
            }
        })
    )

    return results.filter((doc): doc is SourceDocument => doc !== null)
}
