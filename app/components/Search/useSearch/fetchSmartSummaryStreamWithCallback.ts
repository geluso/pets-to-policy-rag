import { SourceDocument } from '@/app/types'
import toast from 'react-hot-toast'

export async function fetchSmartSummaryStreamWithCallback(
    query: string,
    sourceDocuments: SourceDocument[],
    onData: (delta: string) => void,
) {
    try {
        const response = await fetch('/api/smart-summaries', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({query, sourceDocuments}),
        })

        if (!response.ok) {
            console.error(`Server error: ${response.status} ${response.statusText}`)
            return
        }

        if (!response.body) {
            console.error('No response body found')
            return
        }

        console.log('Streaming started...')
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (true) {
            try {
                const { done, value } = await reader.read()
                if (done) break

                onData(decoder.decode(value, {stream: true}))
            } catch (streamError) {
                console.error('Error while reading the stream:', streamError)

                break
            }
        }
    } catch (error) {
        console.error('Error in fetchSmartSummaryStreamWithCallback:', error)

        toast.error('Failed to stream smart summary')
    }
}