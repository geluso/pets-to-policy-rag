export interface Span {
    text: string
    isImportant: boolean
}

export type Paragraph = Span[]

export const parseRelevantLanguage = (relevantLanguage: string): Paragraph[] => {
    return relevantLanguage.split('\n\n').map(paragraph => {
        const spans: Span[] = []
        let buffer = ''
        let isImportant = false

        for (let i = 0; i < paragraph.length; i++) {
            if (paragraph.slice(i, i + 11) === '{{HIGHLIGHT}}') {
                if (buffer) {
                    spans.push({ text: buffer, isImportant })
                    buffer = ''
                }
                isImportant = !isImportant
                i += 10 // Skip the entire '{{HIGHLIGHT}}'
            } else {
                buffer += paragraph[i]
            }
        }

        if (buffer) {
            spans.push({text: buffer, isImportant})
        }

        return spans
    })
}
