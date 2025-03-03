import { SimilarChunk } from "../types"

export const generateRelevantChunksPrompt = (
    query: string, 
    similarChunks: SimilarChunk[], 
    numChunksToReturn: number
) => {
    const chunkBlock = JSON.stringify(similarChunks, null, 2)

    return `
You are selecting the ${numChunksToReturn} most relevant chunks for answering the following query:

QUERY: "${query}"

**Selection Rules**:
- Prefer chunks that directly answer the query.
- If no direct answers exist, select chunks providing general legal context.
- Do not modify text, only filter the most useful chunks.

## **USER QUERY**
"${query}"

\`\`\`json
${chunkBlock}
\`\`\`

---

## **EXPECTED OUTPUT FORMAT**
Your response **must be valid JSON** with the same structure as the input, containing exactly **${numChunksToReturn}** chunks:

\`\`\`json
[
  {
    "url": "https://example.com/legal-code",
    "text": "Relevant chunk text...",
    "chunk_index": 5
  },
  {
    "url": "https://example.com/legal-code",
    "text": "Another relevant chunk text...",
    "chunk_index": 12
  }
]
\`\`\`

    `
}
