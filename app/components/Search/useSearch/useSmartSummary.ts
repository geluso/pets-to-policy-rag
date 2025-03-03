import { ChunkCollection, SmartSummary } from '@/app/types'
import { useCallback, useState } from 'react'
import { fetchSmartSummaryStreamWithCallback } from './fetchSmartSummaryStreamWithCallback'

export default function useSmartSummary(): {
    smartSummary: SmartSummary
    resetSmartSummary: () => void
    generateSmartSummary: (query: string, chunkCollections: ChunkCollection[]) => Promise<void>
    isInitializingSmartSummary: boolean
} {
    const [smartSummary, setSmartSummary] = useState<SmartSummary>('')
    const [isInitializingSmartSummary, setIsInitializingSmartSummary] = useState<boolean>(false)

    const generateSmartSummary = useCallback(async (query: string, chunkCollections: ChunkCollection[]) => {
        setIsInitializingSmartSummary(true)

        try {
            await fetchSmartSummaryStreamWithCallback(
                query,
                chunkCollections,
                (delta) => {
                    setSmartSummary((prev) => prev + delta)
                    setIsInitializingSmartSummary(false)
                },
            )
        } catch (error) {
            console.error('USE SMART SUMMARY', error)
        }
    }, [])

    const resetSmartSummary = useCallback(() => {
        setSmartSummary('')
    }, [])

    return {
        smartSummary,
        resetSmartSummary,
        generateSmartSummary,
        isInitializingSmartSummary,
    }
}
