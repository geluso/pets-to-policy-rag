import { ChunkCollection } from '../types'

export const generateSmartSummaryPrompt = (query: string, chunkCollections: ChunkCollection[]): string => {
    const chunkBlocks = JSON.stringify(chunkCollections, null, 2)

    return `\
# SMART SUMMARY GENERATION PROMPT

## INSTRUCTIONS:
Use the provided **legal text and summaries** to generate a **concise, direct response** that answers the user's question.  
Your response must be **derived from the most relevant parts** of the provided data.  
This information comes from multiple **ChunkCollections**, which contain **legal text excerpts and summaries**.  

### CONTEXT:
- **The user query must remain unchanged in the response.**
- **Each ChunkCollection corresponds to a specific legal section**—it contains legal text that matches the query in some way.
- **Chunks within a ChunkCollection are contiguous**—they form a continuous section of legal text.
- **Your goal is to extract the most relevant legal meaning from these ChunkCollections** while maintaining accuracy.
- **Not all parts of a ChunkCollection are relevant**—you must hone in on the specific passage that best answers the query.
- **Some ChunkCollections may be more relevant than others**—prioritize the most useful information across collections.
- **Combine the most relevant details from multiple ChunkCollections into a single, unified response.**  

---

## **MATCHED CHUNK COLLECTIONS**
Below is the JSON object containing multiple **ChunkCollections**, each consisting of **legal text chunks** and their corresponding summary.  
Use this data to:
1. **Determine the most relevant legal information** to answer the user query.
2. **Hone in on the specific passage within each ChunkCollection that is most relevant.**
3. **Synthesize a response using the most critical parts of the provided text.**
4. **Prioritize the most relevant content, ignoring irrelevant or redundant text.**
5. **Combine relevant details across multiple ChunkCollections into a single, concise answer.**

\`\`\`json
${chunkBlocks}
\`\`\`

---

## **REQUIRED OUTPUT**
- **Generate a short, direct answer** (one or two paragraphs at most).
- **Synthesize information from the most relevant parts** of the provided chunks and summaries.
- **Ignore irrelevant text**—only include what is necessary to answer the query.
- **Write in plain text—do not use bullet points, lists, or structured breakdowns.**
- **Do not provide citations or verbatim legal text—just summarize the answer.**
- **Return only the final response. Do not include explanations.**

---

## **USER QUERY**
"${query}"

---
    `
}
