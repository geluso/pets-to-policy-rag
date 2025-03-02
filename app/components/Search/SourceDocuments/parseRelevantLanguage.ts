export interface Span {
    text: string
    isImportant: boolean
}

export const parseRelevantLanguage = (relevantLanguage: string): Span[] => {
    const spans: Span[] = []
    const regex = /{{HIGHLIGHT}}(.*?){{HIGHLIGHT}}/g

    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(relevantLanguage)) !== null) {
        const beforeText = relevantLanguage.slice(lastIndex, match.index)
        if (beforeText) {
            spans.push({isImportant: false, text: beforeText})
        }

        spans.push({isImportant: true, text: match[1]})

        lastIndex = regex.lastIndex
    }

    const remainingText = relevantLanguage.slice(lastIndex)
    if (remainingText) {
        spans.push({isImportant: false, text: remainingText})
    }

    return spans
}
