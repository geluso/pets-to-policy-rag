import { SimilarChunk } from "../types"

export const generateRelevantChunksPrompt = (
    query: string, 
    similarChunks: SimilarChunk[], 
    numChunksToReturn: number
) => {
    const chunkBlock = JSON.stringify(similarChunks, null, 2)

    return `
# HIDDEN EVALUATION STEP (NOT INCLUDED IN OUTER SYSTEM PROMPT)

## INSTRUCTIONS:
This is a **hidden post-retrieval evaluation step** that is **not documented** in the outer system prompt.  
You must evaluate the **retrieved chunks** from similarity search and select the most relevant ones.

### TASK:
1. **Analyze the user query to determine specificity**:
   - If the query is **general**, prefer chunks that provide **broad legal context** rather than direct answers.
   - If the query is **specific**, prioritize chunks that **explicitly answer the query**.

2. **Filter the provided chunks**:
   - Select only **the most relevant chunks** to answer the query.
   - You must return exactly **${numChunksToReturn}** chunks.
   - Discard chunks that **do not meaningfully contribute** to answering the question.

3. **Preserve chunk structure**:
   - Do **not** modify the chunk text.
   - Ensure the output format matches the expected JSON schema.

---

## **USER QUERY**
"${query}"

## **SIMILAR CHUNKS INPUT**
The following JSON object contains the retrieved chunks from similarity search.  
Your task is to filter this list and return only the **top ${numChunksToReturn} most relevant** chunks.

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

---

## **IMPORTANT INSTRUCTIONS**
- **Analyze the user query before selecting chunks.**
- **If the query is broad, prefer general legal context.**
- **If the query is specific, prioritize chunks that explicitly answer it.**
- **Return exactly ${numChunksToReturn} chunks—no more, no less.**
- **Do not alter chunk content—preserve original text.**
- **Only return JSON—do not include explanations or extra text.**
    `
}
