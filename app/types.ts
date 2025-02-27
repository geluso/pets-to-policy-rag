export interface Message {
    role: string
    content: string
}

export interface Span {
    isImportant: boolean
    text: string
}

export type Paragraph = Span[]

export type SearchResult = {
    score: number,
    doc: SourceDocumentProps
}

export interface SourceDocumentProps {
    title: string
    url: string
    text: string
}

export interface RenderedSourceDocumentProps {
    citation: string
    relevantLanguage: Paragraph[]
}
