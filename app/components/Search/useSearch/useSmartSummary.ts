import { CodeDomain, SmartSummary, SourceDocument } from '@/app/types'
import { useCallback, useState } from 'react'
import { fetchSmartSummaryStreamWithCallback } from './fetchSmartSummaryStreamWithCallback'

export default function useSmartSummary(): {
    smartSummary: SmartSummary
    resetSmartSummary: () => void
    generateSmartSummary: (codeDomain: CodeDomain, query: string, sourceDocuments: SourceDocument[]) => Promise<void>
} {
    const [smartSummary, setSmartSummary] = useState<SmartSummary>('')

    const generateSmartSummary = useCallback(async (codeDomain: CodeDomain, query: string, sourceDocuments: SourceDocument[]) => {
        try {
            await fetchSmartSummaryStreamWithCallback(
                codeDomain,
                query,
                sourceDocuments,
                (delta) => setSmartSummary((prev) => prev + delta),
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
    }
}
