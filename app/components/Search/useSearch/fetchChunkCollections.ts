import { Chunk, SummaryReadable, ChunkCollection } from "@/app/types";

async function fetchSummaryReadable({url}: Chunk): Promise<SummaryReadable | null> {
    try {
        const response = await fetch(`/api/summary-readables?url=${encodeURIComponent(url)}`)

        if (!response.ok) {
            throw new Error('Summary Readable not found')
        }

        const data = await response.json()

        return data.summary_readable
    } catch (error) {
        console.error('ERROR FETCHING SUMMARY READABLE', error)

        return null
    }
}

async function fetchAllSummaryReadables(chunks: Chunk[]): Promise<Record<string, SummaryReadable>> {
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

async function fetchAdjacentChunks({url, chunkIndex}: Chunk): Promise<Chunk[] | null> {
    try {
        const response = await fetch(`/api/indexed-chunks?url=${encodeURIComponent(url)}&chunkIndex=${chunkIndex}`)

        if (!response.ok) {
            throw new Error('Failed to fetch adjacent chunks')
        }

        return await response.json()
    } catch (err) {
        console.error('ERROR FETCHING ADJACENT CHUNKS:', err)

        return null
    }
}

async function fetchAllAdjacentChunks(chunks: Chunk[]): Promise<Record<string, Chunk[]>> {
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

export async function fetchChunkCollections(chunks: Chunk[]): Promise<ChunkCollection[]> {
    const [summaryReadables, adjacentChunks] = await Promise.all([
        fetchAllSummaryReadables(chunks),
        fetchAllAdjacentChunks(chunks)
    ])

    return chunks.map(chunk => ({
        chunks: adjacentChunks[chunk.url] || [],
        summaryReadable: summaryReadables[chunk.url] || {url: chunk.url, summaryText: ""}
    }))
}