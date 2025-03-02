export interface SimilarChunk {
    url: string
    text: string
    chunk_index: number
}

export interface Chunk {
    id: number
    url: string
    chunk_text: string
    chunk_index: number
}

export interface SummaryReadable {
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
