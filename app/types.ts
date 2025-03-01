export type Chunk = {
    url: string
    chunkText: string
    chunkIndex: number
}

export type SummaryReadable = {
    url: string
    summaryText: string
}

export interface ChunkCollection {
    chunks: Chunk[]
    summaryReadable: SummaryReadable
}

export type SmartSummary = string

export interface SourceDocument {
    url: string
    question: string
    citation: string
    relevantSubsections: string
    relevantLanguage: string
}
