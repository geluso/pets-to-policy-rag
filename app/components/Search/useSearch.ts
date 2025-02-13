import { useState, useCallback } from 'react'

export function useSearch(): {
    paragraphs: string
    isSearching: boolean
    isStreaming: boolean
    search: (query: string) => Promise<void>
} {
    const [paragraphs, setParagraphs] = useState('')
    const [isSearching, setIsSearching] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)

    const search = useCallback(async (query: string) => {
        console.log('startStreaming')
        setParagraphs('')
        setIsSearching(true)

        console.log('startStreaming fetch')
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query }),
        })

        if (!response.body) {
            setIsSearching(false)
            throw new Error('No response body found')
        }

        console.log('startStreaming getReader')
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        setIsStreaming(true)
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            console.log('startStreaming read value', value)
            const chunk = decoder.decode(value, { stream: true })
            console.log({ chunk })
            console.log({ chunkToString: chunk.toString() })
            setParagraphs((prev) => prev + chunk) // Auto-re-render
        }

        setIsStreaming(false)
        setIsSearching(false)
    }, [])

    return { paragraphs, isSearching, isStreaming, search }
}