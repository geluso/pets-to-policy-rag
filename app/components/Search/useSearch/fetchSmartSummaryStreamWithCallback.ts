import { ChunkCollection } from '@/app/types'

export async function fetchSmartSummaryStreamWithCallback(
    query: string,
    chunkCollections: ChunkCollection[],
    onData: (delta: string) => void,
) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({query, chunkCollections}),
    })

    if (!response.body) {
        throw new Error('No response body found')
    }

    console.log('Streaming started...')
    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const delta = decoder.decode(value, {stream: true})
        if (delta.trim()) {
            onData(delta)
        }
    }
}
