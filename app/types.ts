export interface Span {
    isImportant: boolean
    text: string
}

export type Paragraph = Span[]

export interface Source {
    title: string
    url: string
    text: string
}