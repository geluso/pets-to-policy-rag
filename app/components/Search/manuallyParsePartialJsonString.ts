import { Paragraph } from "@/app/types"

export function parsePartialJsonString(input: string): Paragraph[] {
    const paragraphs: Paragraph[] = []

    const buffer = ""
    const openingSymbols = '{["'
    const stack = []
    for (let i = 0; i < input.length; i++) {
        const char = input[i]
        if (openingSymbols.includes(char)) {
            stack.push(char)
        }
    }

    return paragraphs
}