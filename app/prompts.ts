import { ChunkCollection } from './types'

export const generateOuterPrompt = () => `
# OUTER SYSTEM PROMPT

## INSTRUCTIONS:
You are a legal assistant specializing in legal information retrieval.  
Your task is to **maintain consistency** across all pipeline components by ensuring that legal terminology, structure, and formatting are followed.

### LEGAL ONTOLOGY:
- **Confidentiality Terms:** {private, classified, restricted, secure, sensitive, non-public, confidential, protected, privileged, controlled, for staff use only, official use only, personally identifiable}
- **Entities:** {employer, government agency, third party, authorized recipient, director, commission, leadership, contractor, authority, bureau, department, office, administration, affiliate, intermediary, service provider, personnel, officer, regulatory body, regulator, official, policymaker, decision-maker}
- **Authority Descriptors:** {may disclose, is authorized to share, has the legal right to disclose, is permitted, disclose, shall make available}
- **Process Terms:** {disclose, release, transmit, share, provide access}
- **Data Types:** {records, forms, hearings, written documents, reports, information}
- **Parties:** {employee, contractor, agency, public entity}
- **Purpose Descriptors:** {required by law, permitted under rule, regulated by statute}

### STANDARDIZATION REQUIREMENTS:
- **All responses must use legally precise terminology.**
- **Queries should be reformatted into legal phrasing.**
- **Legal citations must be properly formatted (Code, Chapter, Section, Subsection).**
- **Extracted legal text should be structured and flagged for importance.**
- **No additional explanations should be provided—only the required output.**
`

export const generateQueryPrompt = (query: string) => `
# QUERY RESTRUCTURING PROMPT

## INSTRUCTIONS:
You are a legal assistant specializing in legal information retrieval.  
Your task is to **rewrite the user's query into a structured legal query** to improve similarity search accuracy.

### REQUIRED OUTPUT:
- **Reformat the query** using legally precise terminology.
- **Expand vague terms** to align with legal text while keeping the original intent.
- **Replace ambiguous phrasing** with standardized legal terminology.
- **Do not assume facts** not present in the original query.
- **Return only the reformulated query. Do not include explanations.**

---

## USER QUERY:
"${query}"
`

export const generateSmartSummaryPrompt = (query: string, chunkCollections: ChunkCollection[]): string => {
    const chunkBlocks = JSON.stringify(chunkCollections, null, 2); // Format JSON for readability

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
    `;
};

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
1. **Identify the most legally relevant section** that answers the query.
2. **Determine the correct legal citation** using:
   - The **specific section/subsection** from the chunk.
   - The **full citation context** from the Summary Readable.
3. **Extract and highlight** critical legal phrases using \`{{HIGHLIGHT}}\`.
4. **Preserve the original \`url\` associated with the chunk collection.** 

\`\`\`json
${chunkBlock}
\`\`\`

---

## **STANDARDIZATION REQUIREMENTS**
- **All extracted text must use legally precise terminology** (see legal ontology).  
- **Citations must follow the proper format** (e.g., **Code, Chapter, Section, Subsection**).  
- **Responses must be JSON only—no additional explanations.**  
- **The original \`url\` from the \`ChunkCollection\` must be preserved exactly as provided.**  

---

### **EXPECTED OUTPUT FORMAT**
Your response **must be in valid JSON** with the following structure:

\`\`\`json
{
  "url": "${chunkCollection.summaryReadable.url}",
  "question": "${query}",
  "citation": "[Legal Code Reference, e.g., 'Ga. Code Ann. § 50-18-71']",
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
- **Use \`{{HIGHLIGHT}}\` to flag critical legal phrases.**
- **Preserve the \`url\` exactly as provided in the input JSON.**

---
    `
}
