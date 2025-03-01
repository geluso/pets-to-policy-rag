import { ChunkCollection, SmartSummary } from '@/app/types'
import { useCallback, useState } from 'react'
import { fetchSmartSummaryStreamWithCallback } from './fetchSmartSummaryStreamWithCallback'

export default function useSmartSummary(): {
    smartSummary: SmartSummary
    generateSmartSummary: (query: string, chunkCollections: ChunkCollection[]) => Promise<void>
    isStreamingSmartSummary: boolean
} {
    const [smartSummary, setSmartSummary] = useState<SmartSummary>('')
    const [isStreamingSmartSummary, setIsStreamingSmartSummary] = useState<boolean>(false)

    const generateSmartSummary = useCallback(async (query: string, chunkCollections: ChunkCollection[]) => {
        setIsStreamingSmartSummary(true)
        setSmartSummary('')

        try {
            await fetchSmartSummaryStreamWithCallback(
                query,
                chunkCollections,
                (delta) => setSmartSummary((prev) => prev + delta)
            )
        } catch (error) {
            console.error('USE SMART SUMMARY', error)
        } finally {
            setIsStreamingSmartSummary(false)
        }
    }, [])

    return {
        smartSummary,
        generateSmartSummary,
        isStreamingSmartSummary,
    }
}
