import { ChunkCollection, CodeDomain, StateDomain } from '../types';
import { LEGAL_ONTOLOGY } from './generateOuterSystemPrompt';

export const generateSourceDocumentPrompt = (stateDomain: StateDomain, codeDomain: CodeDomain, query: string, chunkCollection: ChunkCollection) => {
    const chunkBlock = JSON.stringify(chunkCollection, null, 2);

    // Generate correct section extraction instruction based on state
    const sectionExtractionInstruction = stateDomain === StateDomain.TEXAS
        ? `For Texas law, sections are formatted as "Sec. [chapter].[section]." or "Section [chapter].[section].". To extract the section:
  - Identify "Sec." or "Section" at the beginning of the legal text.
  - Extract **only** the number **after the decimal** and store it as a string **without leading zeros**.
  - Example:
    - "Sec. 51.002." → Section: "2"
    - "Sec. 54.5001." → Section: "5001"`
        : `For South Carolina law, sections are formatted as "SECTION [title]-[chapter]-[section].". To extract the section:
  - Identify "SECTION" at the beginning of the legal text.
  - Extract **only** the last number **after the final dash** and store it as a string.
  - Example:
    - "SECTION 30-2-20." → Section: "20"
    - "SECTION 40-3-310." → Section: "310"`;

    return `
# LEGAL CITATION PROMPT (SOURCE DOCUMENT)

## INSTRUCTIONS:
You are a legal assistant tasked with **extracting and structuring relevant legal information** within the context of **${codeDomain} law** under **${stateDomain.toUpperCase()} jurisdiction**.  
Your response **must be structured JSON** that conforms to the schema below.

### CONTEXT:
- **This document pertains to ${codeDomain} Code and statutes related to ${codeDomain} law in ${stateDomain.toUpperCase()}.**
- **The provided chunks form a continuous legal text** (where one chunk ends, the next begins).  
- **Your goal is to extract the section(s) that most directly answer the user’s question within the framework of ${codeDomain} law.**  
- **If exact matching is poor, select the most applicable legal content available within this legal code.**  
- **Highlight full meaningful phrases and sentences—not just individual words.**
- **Text from chunks must remain completely unchanged, except for adding highlights to the most relevant phrases.**  

---

## **MATCHED CHUNK COLLECTION**
This JSON object contains **retrieved legal text excerpts** and their corresponding summary.  
Use this data to:
1. **Extract the title (a number) from the Summary Readable.**
2. **Extract the chapter as a string**  
   - If a subchapter exists, **combine it with the chapter as one string** (e.g., \`"51B"\`).  
3. **Extract the section number using the following method:**  
${sectionExtractionInstruction}
4. **Identify and extract an array of relevant subsections (only letters, e.g., \`["a", "c"]\`).**  
5. **Extract and highlight entire legal phrases or full sentences** that best explain the legal answer.  
6. **Derive "relevantKeywords" as an array from the extracted legal text** based on its meaning—not just predefined ontology terms.  

### HIGHLIGHTING REQUIREMENTS
- Highlight **full phrases or sentences** that provide **both the subject and the critical legal context** relevant to the query.  
- Avoid highlighting isolated keywords—**the highlighted text should be meaningful on its own** and directly answer the query.  
- If a condition, exemption, or restriction modifies a statement, include it in the highlight.  
- Ensure highlights preserve **who the rule applies to, what action is required or prohibited, and any conditions.**  
- Examples of correct highlighting:  
  - **Query:** "How is confidential employee information handled?"  
    - **Correct:** "The identity of an employee in a report filed under Section 411.032 is {{HIGHLIGHT}}confidential and may not be disclosed as part of the job safety information system.{{HIGHLIGHT}}"  
    - **Incorrect:** "{{HIGHLIGHT}}confidential{{HIGHLIGHT}} and may not be disclosed" (Misses the subject and legal context).  
  - **Query:** "What are the penalties for unauthorized disclosure?"  
    - **Correct:** "A person commits an offense if they knowingly, intentionally, or recklessly {{HIGHLIGHT}}publish, disclose, or distribute confidential information to an unauthorized recipient.{{HIGHLIGHT}}"  
    - **Incorrect:** "{{HIGHLIGHT}}disclose{{HIGHLIGHT}}, or distribute confidential information" (Misses the legal condition and intent requirement).  
  - **Query:** "Who can access investigation files?"  
    - **Correct:** "Information maintained in the investigation files of the division is {{HIGHLIGHT}}confidential and may not be disclosed except: (1) in a criminal proceeding; (2) in a hearing conducted by the division; (3) on a judicial determination of good cause.{{HIGHLIGHT}}"  
    - **Incorrect:** "{{HIGHLIGHT}}confidential and may not be disclosed{{HIGHLIGHT}}" (Misses the conditions under which disclosure is allowed).  

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
- **Store the title as a number** (e.g., \\\`"30"\\\` for **Title 30** of the code).  
- **Store the chapter as a string** (e.g., \\\`"51B"\\\` for **Chapter 51, Subchapter B**).  
- **Store the section as a string**, extracted based on \`${stateDomain}\` format.  
- **Highlight entire meaningful legal phrases or sentences** that best answer the user query using \`{{HIGHLIGHT}}\`.  
- **Ensure "relevantKeywords" is populated as an array**, derived dynamically from the extracted legal text.  
- **Relevant subsections must be stored as an array of letters** (e.g., \`["a", "c"]\`).  
- **Do not modify the capitalization, punctuation, or formatting of the extracted text.**  
- **Responses must be JSON only—no additional explanations.**  

---

### **EXPECTED OUTPUT FORMAT**
Your response **must be in valid JSON** with the following structure:

\`\`\`json
{
  "citation": {
    "title": "30",
    "chapter": "51B",
    "section": "21"
  },
  "relevantSubsections": ["c", "e"],
  "relevantKeywords": ["confidential", "privileged", "compliance program", "disclosure", "investigation"],
  "relevantLanguage": "SECTION 30-2-20. (A) {{HIGHLIGHT}}Agencies must ensure that all personal data is collected and secured properly.{{HIGHLIGHT}} Any unauthorized disclosure shall be subject to penalties."
}
\`\`\`

---

## **USER QUERY**
"${query}"

---
    `
}