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
