import { Chunk, SummaryReadable, ChunkCollection, SimilarChunk } from "@/app/constants/types"
import toast from "react-hot-toast"

async function fetchSummaryReadable({url}: SimilarChunk): Promise<SummaryReadable | null> {
    try {
        const response = await fetch(`/api/summary-readables?url=${encodeURIComponent(url)}`)

        if (!response.ok) {
            throw new Error('Summary Readable not found')
        }

        const data = await response.json()

        return data.summary_readable
    } catch (error) {
        toast.error('Failed to fetch chapter extraction')

        console.error('ERROR FETCHING SUMMARY READABLE', error)

        return null
    }
}

async function fetchAllSummaryReadables(chunks: SimilarChunk[]): Promise<Record<string, SummaryReadable>> {
    const results = await Promise.all(chunks.map(async (chunk) => {
        const summary = await fetchSummaryReadable(chunk)

        return summary ? {url: chunk.url, summary} : null
    }))

    return results.reduce((acc, result) => {
        if (result) {
            acc[result.url] = result.summary
        }

        return acc
    }, {} as Record<string, SummaryReadable>)
}

async function fetchAdjacentChunks({url, chunk_index}: SimilarChunk): Promise<Chunk[] | null> {
    try {
        const response = await fetch(`/api/indexed-chunks?url=${encodeURIComponent(url)}&chunkIndex=${chunk_index}`)

        if (!response.ok) {
            throw new Error('Failed to fetch adjacent chunks')
        }

        return await response.json()
    } catch (err) {
        toast.error('Failed to fetch adjacent chunks')

        console.error('ERROR FETCHING ADJACENT CHUNKS:', err)

        return null
    }
}

async function fetchAllAdjacentChunks(chunks: SimilarChunk[]): Promise<Record<string, Chunk[]>> {
    const results = await Promise.all(chunks.map(async (chunk) => {
        const adjacentChunks = await fetchAdjacentChunks(chunk)

        return adjacentChunks ? {url: chunk.url, adjacentChunks} : null
    }))

    return results.reduce((acc, result) => {
        if (result) {
            acc[result.url] = result.adjacentChunks
        }

        return acc
    }, {} as Record<string, Chunk[]>)
}

export async function fetchChunkCollections(chunks: SimilarChunk[]): Promise<ChunkCollection[]> {
    const [summaryReadables, adjacentChunks] = await Promise.all([
        fetchAllSummaryReadables(chunks),
        fetchAllAdjacentChunks(chunks)
    ])

    return chunks.map(chunk => ({
        chunks: adjacentChunks[chunk.url] || [],
        summaryReadable: summaryReadables[chunk.url] || {url: chunk.url, summaryText: ""}
    }))
}
