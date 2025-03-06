import { ChunkCollection, CodeDomain } from '../types';
import { LEGAL_ONTOLOGY } from './generateOuterSystemPrompt';

export const generateSourceDocumentPrompt = (codeDomain: CodeDomain, query: string, chunkCollection: ChunkCollection) => {
    const chunkBlock = JSON.stringify(chunkCollection, null, 2);

    return `
# LEGAL CITATION PROMPT (SOURCE DOCUMENT)

## INSTRUCTIONS:
You are a legal assistant tasked with **extracting and structuring relevant legal information** within the context of **${codeDomain} law**.  
Your response **must be structured JSON** that conforms to the schema below.

### CONTEXT:
- **This document pertains to ${codeDomain} Code and statutes related to ${codeDomain} law.**
- **The provided chunks form a continuous legal text** (where one chunk ends, the next begins).  
- **Your goal is to extract the section(s) that most directly answer the user’s question within the framework of ${codeDomain} law.**  
- **If exact matching is poor, select the most applicable legal content available within this legal code.**  
- **Highlight entire sentences or phrases that best capture the relevant legal meaning—not just isolated keywords.**

---

## **MATCHED CHUNK COLLECTION**
This JSON object contains **retrieved legal text excerpts** and their corresponding summary.  
Use this data to:
1. **Identify the most relevant legal section(s) within ${codeDomain} law** that provide a direct answer to the user query.
2. **Determine the correct legal citation** using:
   - The **specific section/subsection** from the chunk.
   - The **full citation context** from the Summary Readable.
3. **Extract and highlight entire legal phrases or full sentences** that best explain the legal answer.
4. **Derive "relevantKeywords" from the extracted legal text** based on its meaning—not just predefined ontology terms.

### LEGAL ONTOLOGY REFERENCE:
Use the following legal terminology **as a reference** when selecting relevant keywords.  
However, keywords must be **directly derived from the extracted legal text**, not arbitrarily taken from this list.

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
- **Highlight entire legal phrases or sentences** that best answer the user query using \`{{HIGHLIGHT}}\`.  
- **Ensure "relevantKeywords" is populated dynamically** from the extracted legal text, not blindly copied from the ontology.  
- **Responses must be JSON only—no additional explanations.**  
- **Relevant subsections must only include those containing the most critical legal text.**  

---

### **EXPECTED OUTPUT FORMAT**
Your response **must be in valid JSON** with the following structure:

\`\`\`json
{
  "citation": "Ga. Code Ann. § 50-18-71",
  "relevantSubsections": "(b)",
  "relevantKeywords": "confidential, privileged, compliance program, disclosure, investigation",
  "relevantLanguage": "${codeDomain} Code, Chapter 51, Section 51.971. CONFIDENTIALITY OF COMPLIANCE PROGRAM INFORMATION. (c) The following are {{HIGHLIGHT}}confidential{{HIGHLIGHT}}: (1) {{HIGHLIGHT}}information that directly or indirectly reveals the identity of an individual who made a report to the compliance program office of an institution of higher education, sought guidance from the office, or participated in an investigation conducted under the compliance program{{HIGHLIGHT}}; and (2) {{HIGHLIGHT}}information that directly or indirectly reveals the identity of an individual as a person who is alleged to have or may have planned, initiated, or participated in activities that are the subject of a report made to the compliance program office of an institution of higher education if, after completing an investigation, the office determines the report to be unsubstantiated or without merit.{{HIGHLIGHT}}"
}
\`\`\`

---

## **USER QUERY**
"${query}"

---
    `
}