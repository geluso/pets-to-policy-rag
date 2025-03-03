import { ChunkCollection } from '../types'

export const generateSourceDocumentPrompt = (query: string, chunkCollection: ChunkCollection) => {
    const chunkBlock = JSON.stringify(chunkCollection, null, 2);

    return `
# LEGAL CITATION PROMPT (SOURCE DOCUMENT)

## INSTRUCTIONS:
You are a legal assistant tasked with **extracting and structuring relevant legal information** to answer the user's query.  
Your response **must be structured JSON** that conforms to the schema below.

### CONTEXT:
- **The user query must remain unchanged in the response.**
- **The provided chunks are in order and form a continuous legal text** (where one chunk ends, the next begins).  
- **Your goal is to hone in on a single section** within the provided chunks that best answers the query.  
- **The most relevant section should be extracted as a whole,** along with the correct legal citation.
- **The \`url\` from the \`ChunkCollection\` must be included in the response. Do not modify it.**

---

## **MATCHED CHUNK COLLECTION**
This JSON object contains **retrieved legal text excerpts** and their corresponding summary.  
Use this data to:
1. **Identify the most legally relevant section** that directly answers the user query.
2. **Determine the correct legal citation** using:
   - The **specific section/subsection** from the chunk.
   - The **full citation context** from the Summary Readable.
3. **Extract and highlight** only the **most critical legal phrases** relevant to the user query using \`{{HIGHLIGHT}}\`.
4. **Preserve the original \`url\` associated with the chunk collection.** 

\`\`\`json
${chunkBlock}
\`\`\`

---

## **STANDARDIZATION REQUIREMENTS**
- **All extracted text must use legally precise terminology** (see legal ontology).  
- **Citations must follow the proper format** (e.g., **Code, Chapter, Section, Subsection**).  
- **Only highlight phrases that are directly relevant to answering the user query.**  
- **Responses must be JSON only—no additional explanations.**  
- **The original \`url\` from the \`ChunkCollection\` must be preserved exactly as provided.**  

---

### **EXPECTED OUTPUT FORMAT**
Your response **must be in valid JSON** with the following structure:

\`\`\`json
{
  "url": "${chunkCollection.summaryReadable.url}",
  "question": "${query}",
  "citation": "Ga. Code Ann. § 50-18-71",
  "relevantSubsections": "(a), (b)",
  "relevantLanguage": "TITLE 50 - STATE GOVERNMENT, CHAPTER 18 - STATE PRINTING AND DOCUMENTS, ARTICLE 4 - INSPECTION OF PUBLIC RECORDS, § 50-18-71. RIGHT OF ACCESS; TIMING; FEES; DENIAL OF REQUESTS; IMPACT OF ELECTRONIC RECORDS.\\n(a) All public records shall be open for personal inspection and copying, except {{HIGHLIGHT}}those which by order of a court of this state or by law are specifically exempted from disclosure.{{HIGHLIGHT}} Records shall be maintained by agencies to the extent and in the manner required by Article 5 of this chapter."
}
\`\`\`

---

### **IMPORTANT INSTRUCTIONS**
- **The user query must remain unchanged in the response.**
- **The chunks are continuous and contain ordered legal text.**
- **You must select and extract only one section that best answers the query.**
- **Do not return multiple sections—identify the most relevant one.**
- **Use legal terminology consistent with the ontology defined in the system prompt.**
- **Only return JSON—do not include any additional text.**
- **Ensure proper legal citation structure.**
- **Use \`{{HIGHLIGHT}}\` only for critical legal phrases that are directly relevant to the user query.**
- **Preserve the \`url\` exactly as provided in the input JSON.**

---
    `
}