import { Paragraph, Span } from "@/app/types"

export function parsePartialJsonString(input: string): Paragraph[] {
  // 1) Quick check for `"a":[[`
  if (!input.includes('"a":[[')) {
    return []
  }

  // We'll parse a single paragraph for demonstration,
  // though you can extend it to multiple paragraphs if you want.
  const paragraph: Span[] = []

  // 2) Search repeatedly for spans in the form `{"i":<bool>,"t":"<text>`
  let pos = 0
  while (true) {
    // Look for the start of an object: `{"i":`
    const iPos = input.indexOf('{"i":', pos)
    if (iPos === -1) {
      break
    }

    // Attempt to parse a single span
    const { span, newPos } = parseSpan(input, iPos)

    // If we fail to parse a span, stop altogether
    if (!span) {
      break
    }

    paragraph.push(span)
    pos = newPos
  }

  // 3) If we found at least one span, return it in a Paragraph array
  if (paragraph.length > 0) {
    return [paragraph]
  } else {
    // We did see `"a":[[`, but no complete spans => return [ [] ]
    return [[]]
  }
}

function parseSpan(input: string, startPos: number): { span: Span | null; newPos: number } {
  // `{"i":` is 5 characters, so next char is the start of "true" or "false"
  const boolPos = startPos + 5 // <-- FIXED: was +6, which caused the bug

  // Make sure we have enough string left
  if (boolPos >= input.length) {
    return { span: null, newPos: input.length }
  }

  // Read up to 5 characters to match 'false' or 'true'
  const boolSnippet = input.substring(boolPos, boolPos + 5).toLowerCase()
  let isImportant: boolean
  let boolLen = 0

  if (boolSnippet.startsWith("true")) {
    isImportant = true
    boolLen = 4
  } else if (boolSnippet.startsWith("false")) {
    isImportant = false
    boolLen = 5
  } else {
    // incomplete => no parse
    return { span: null, newPos: boolPos }
  }

  // Now look for `,"t":"`
  const tMarker = ',"t":"'
  const tMarkerPos = input.indexOf(tMarker, boolPos + boolLen)
  if (tMarkerPos === -1) {
    return { span: null, newPos: boolPos + boolLen }
  }

  // Extract text until the next quote or end-of-string
  const textStart = tMarkerPos + tMarker.length
  let textEnd = input.indexOf('"', textStart)
  if (textEnd === -1) {
    textEnd = input.length
  }

  const text = input.substring(textStart, textEnd)
  if (!text) {
    // empty text => skip
    return { span: null, newPos: textEnd }
  }

  // Return the recognized span
  return {
    span: { isImportant, text },
    newPos: textEnd + 1, // move past closing quote if it exists
  }
}