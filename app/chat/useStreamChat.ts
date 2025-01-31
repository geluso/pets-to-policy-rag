import { Document } from '@prisma/client'
import { useState, useCallback } from 'react'

export function useStreamChat() {
    const [response, setResponse] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isStreaming, setIsStreaming] = useState(false)

    const startStreaming = useCallback(async (query: string, docs: Document[]) => {
        console.log('startStreaming')
        setResponse('')
        setIsLoading(true)

        console.log('startStreaming fetch')
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, docs }),
        })

        if (!response.body) {
            setIsLoading(false)
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
            setResponse((prev) => prev + chunk) // Auto-re-render
        }

        setIsStreaming(false)
        setIsLoading(false)
    }, [])

    return { response, isLoading, isStreaming, startStreaming }
}