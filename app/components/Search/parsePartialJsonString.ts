import { Paragraph } from "@/app/types"

export function parsePartialJsonString(input: string): Paragraph[] {
  const paragraphs: Paragraph[] = []
  let currentParagraph: Paragraph = []
  let buffer = ''
  let isInsideString = false

  for (let i = 0; i < input.length; i++) {
      const char = input[i]

      if (char === '"') {
          isInsideString = !isInsideString
      }

      if (!isInsideString && (char === '{' || char === '}' || char === ',' || char === ':')) {
          if (buffer.trim()) {
              currentParagraph.push({ isImportant: false, text: buffer.trim() })
          }
          currentParagraph.push({ isImportant: true, text: char })
          buffer = ''
      } else if (char === '\n') {
          if (buffer.trim()) {
              currentParagraph.push({ isImportant: false, text: buffer.trim() })
          }
          paragraphs.push(currentParagraph)
          currentParagraph = []
          buffer = ''
      } else {
          buffer += char
      }
  }

  if (buffer.trim()) {
      currentParagraph.push({ isImportant: false, text: buffer.trim() })
  }

  if (currentParagraph.length > 0) {
      paragraphs.push(currentParagraph)
  }

  return paragraphs
}