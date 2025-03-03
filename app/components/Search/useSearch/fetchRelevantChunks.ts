import { SimilarChunk } from '@/app/types'

export async function fetchRelevantChunks(query: string, chunks: SimilarChunk[]): Promise<SimilarChunk[]> {
    try {
        const response = await fetch('/api/relevant-chunks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query, chunks}),
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch relevant chunks: ${response.statusText}`)
        }

        const data = await response.json()

        if (!Array.isArray(data)) {
            throw new Error('Invalid response format')
        }

        return data as SimilarChunk[]
    } catch (error) {
        console.error('fetchRelevantChunks error:', error)

        return []
    }
}
