export interface Message {
    role: string
    content: string
}

export interface Span {
    isImportant: boolean
    text: string
}

export type Paragraph = Span[]

export interface SourceDocument {
    title: string
    url: string
    text: string
}

export type SearchResult = {
    score: number,
    doc: SourceDocument
}
