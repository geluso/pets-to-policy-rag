import { getSearchResults } from '@/app/rag_server/api'
import { Paragraph, SourceDocument } from '@/app/types'
import { useState, useCallback, useRef, useEffect } from 'react'

export function useSearch(): {
    sourceDocuments: SourceDocument[]
    paragraphs: Paragraph[]
    isSearching: boolean
    search: (query: string) => Promise<void>
} {
    const [sourceDocuments, setSourceDocuments] = useState<SourceDocument[]>([])
    const [paragraphs, setParagraphs] = useState<Paragraph[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const isMounted = useRef(true)

    useEffect(() => {
        isMounted.current = true
        return () => {
            isMounted.current = false
        }
    }, [])

    const search = useCallback(async (query: string) => {
        if (!isMounted.current) return

        console.log('use callback', paragraphs)
        setIsSearching(true)

        const searchResults = await getSearchResults(query)
        console.log('/api/chat', { query, searchResults })

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, searchResults }),
        })

        const sourceDocuments = searchResults.map(searchResult => searchResult.doc)
        setSourceDocuments(sourceDocuments)

        if (!response.body) {
            setIsSearching(false)
            throw new Error('No response body found')
        }

        console.log('startStreaming getReader')
        const reader = response.body.getReader()
        const decoder = new TextDecoder()

        while (isMounted.current) {
            const { done, value } = await reader.read()
            if (done) break
            console.log('startStreaming read value', value)
            const chunk = decoder.decode(value, { stream: true })
            console.log({ chunk })
            console.log({ chunkToString: chunk.toString() })
            const nextParagraph = [{ isImportant: false, text: chunk }]
            console.log({paragraphs})
            setParagraphs(prevParagraphs => [...prevParagraphs, nextParagraph])
        }
        setIsSearching(false)

        if (isMounted.current) {
            setIsSearching(false)
        }
    }, [sourceDocuments])

    return { sourceDocuments, paragraphs, isSearching, search }
}