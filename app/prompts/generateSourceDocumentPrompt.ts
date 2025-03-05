import { ChunkCollection } from '../types'
import { LEGAL_ONTOLOGY } from './generateOuterSystemPrompt';

export const generateSourceDocumentPrompt = (query: string, chunkCollection: ChunkCollection) => {
    const chunkBlock = JSON.stringify(chunkCollection, null, 2);

    return `
# LEGAL CITATION PROMPT (SOURCE DOCUMENT)

## INSTRUCTIONS:
You are a legal assistant tasked with **extracting and structuring relevant legal information** to answer the user's query.  
Your response **must be structured JSON** that conforms to the schema below.

### CONTEXT:
- **The provided chunks are in order and form a continuous legal text** (where one chunk ends, the next begins).  
- **Your goal is to hone in on a single section** within the provided chunks that best answers the query.  
- **The most relevant section should be extracted as a whole,** along with the correct legal citation and relevant keywords.
- **If exact matching is poor, make an informed selection of the most applicable legal content available.**  

---

## **MATCHED CHUNK COLLECTION**
This JSON object contains **retrieved legal text excerpts** and their corresponding summary.  
Use this data to:
1. **Identify the most legally relevant section** that directly answers the user query.
2. **Determine the correct legal citation** using:
   - The **specific section/subsection** from the chunk.
   - The **full citation context** from the Summary Readable.
3. **Extract and highlight entire sentences or phrases** that capture the most relevant legal context—not just isolated keywords.
4. **Populate the "relevantKeywords" field** using legal terminology extracted from the retrieved text that aligns with the predefined ontology.

### LEGAL ONTOLOGY REFERENCE:
Use the following legal terminology when populating the \`relevantKeywords\` field **if they appear in the extracted legal text**:
- **Confidentiality Terms:** {${LEGAL_ONTOLOGY.confidentialityTerms.join(', ')}}
- **Entities:** {${LEGAL_ONTOLOGY.entities.join(', ')}}
- **Authority Descriptors:** {${LEGAL_ONTOLOGY.authorityDescriptors.join(', ')}}
- **Process Terms:** {${LEGAL_ONTOLOGY.processTerms.join(', ')}}
- **Data Types:** {${LEGAL_ONTOLOGY.dataTypes.join(', ')}}
- **Parties:** {${LEGAL_ONTOLOGY.parties.join(', ')}}
- **Purpose Descriptors:** {${LEGAL_ONTOLOGY.purposeDescriptors.join(', ')}}

\`\`\`json
${chunkBlock}
\`\`\`

---

## **STANDARDIZATION REQUIREMENTS**
- **Citations must follow the proper format** (e.g., **Code, Chapter, Section, Subsection**).  
- **Highlight full sentences or key legal phrases** that best provide context to the user query using \`{{HIGHLIGHT}}\`.  
- **Ensure "relevantKeywords" is populated** using terms extracted from the retrieved text that align with the legal ontology.  
- **Responses must be JSON only—no additional explanations.**  
- **Relevant subsections must only include subsections containing highlighted critical legal text relevant to the user query.**  

---

### **EXPECTED OUTPUT FORMAT**
Your response **must be in valid JSON** with the following structure:

\`\`\`json
{
  "citation": "Ga. Code Ann. § 50-18-71",
  "relevantSubsections": "(b)",
  "relevantKeywords": "confidential, privileged, disclosure, regulatory body, legal authority",
  "relevantLanguage": "Labor Code, Chapter 21, Section 21.403. CONFIDENTIALITY OF GENETIC INFORMATION. (a) Except as provided by Section 21.4031, genetic information is {{HIGHLIGHT}}confidential and privileged{{HIGHLIGHT}} regardless of the source of the information. (b) A person who holds genetic information about an individual {{HIGHLIGHT}}may not disclose{{HIGHLIGHT}} or be compelled to disclose, by subpoena or otherwise, that information unless the disclosure is specifically authorized as provided by Section 21.4032."
}
\`\`\`

---

## **USER QUERY**
"${query}"

---
    `
}