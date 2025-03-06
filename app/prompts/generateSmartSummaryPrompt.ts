import { CodeDomain, SourceDocument } from "../types";

export const generateSmartSummaryPrompt = (codeDomain: CodeDomain, query: string, sourceDocuments: SourceDocument[]): string => {
    const sourceDocumentBlocks = JSON.stringify(sourceDocuments, null, 2);

    return `\
# LEGAL SUMMARY GENERATION PROMPT

## INSTRUCTIONS:
Use the provided **legal text, key terms, and relevant legal context** to generate a **concise, direct response** that answers the user's question within the domain of **${codeDomain} law**.  
Your response must be **derived from the most relevant parts** of the provided legal information.

### CONTEXT:
- **This summary must be framed within the context of ${codeDomain} law.**
- **Each document contains legal text with key phrases emphasized.**
- **Important legal terms have been extracted and should be incorporated into the response.**
- **Your goal is to synthesize the most relevant information into a clear, understandable answer within this legal domain.**
- **If there is insufficient context, answer the query as accurately as possible using available legal text from ${codeDomain} law.**
- **Do not provide citations or verbatim legal text—just summarize the meaning in plain language.**

---

## **LEGAL REFERENCES**
Below is a JSON object containing multiple **legal references**, each consisting of **excerpts from legal texts, key legal phrases, and important terminology**.  
Use this data to:
1. **Extract the most relevant information from key phrases and legal terms** to answer the user query.
2. **Ensure the response is specific to ${codeDomain} law** and does not include references outside this legal framework.
3. **Combine critical details from multiple references into a single, unified response.**
4. **If necessary, infer the best possible answer using available legal text.**

\`\`\`json
${sourceDocumentBlocks}
\`\`\`

---

## **REQUIRED OUTPUT**
- **Generate a short, direct answer** (one or two paragraphs at most).
- **Ensure the response is framed within the context of ${codeDomain} law.**
- **Use the most relevant legal text and terminology to synthesize the response.**
- **If there is insufficient context, provide the best possible answer based on the available legal text.**
- **Ignore irrelevant text—only include what is necessary to answer the query.**
- **Write in plain text—do not use bullet points, lists, or structured breakdowns.**
- **Return only the final response. Do not include explanations.**

---

## **USER QUERY**
"${query}"

---
    `
}
