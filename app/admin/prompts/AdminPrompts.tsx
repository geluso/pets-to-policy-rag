import UneditablePrompt from "@/app/components/UneditablePrompt";
import { generateOuterSystemPrompt } from "@/app/prompts/generateOuterSystemPrompt";
import { generateQueryPrompt } from "@/app/prompts/generateQueryPrompt";
import { generateRelevantChunksPrompt } from "@/app/prompts/generateRelevantChunksPrompt";
import { generateSmartSummaryPrompt } from "@/app/prompts/generateSmartSummaryPrompt";
import { generateSourceDocumentPrompt } from "@/app/prompts/generateSourceDocumentPrompt";

export interface Chunk {
  id: number
  url: string
  chunk_text: string
  chunk_index: number
}

export interface SummaryReadable {
  url: string
  summaryText: string
}

export interface ChunkCollection {
  chunks: Chunk[]
  summaryReadable: SummaryReadable
}

export interface SimilarChunk {
  url: string
  text: string
  chunk_index: number
}


export default function AdminPrompts() {
  const exampleQuery = "EXAMPLE USER QUERY"

  const exampleSummaryReadable: SummaryReadable = {
    url: "http://example.com",
    summaryText: "EXAMPLE TEXT",
  }

  const exampleChunkCollection: ChunkCollection[] = [{
    summaryReadable: exampleSummaryReadable,
    chunks: [
      { id: 1, url: "EXAMPLE", chunk_text: "EXAMPLE", chunk_index: 1},
      { id: 99, url: "EXAMPLE", chunk_text: "EXAMPLE", chunk_index: 1},
      { id: 444, url: "EXAMPLE", chunk_text: "EXAMPLE", chunk_index: 1},
    ]
  }]

  const exampleSimilarChunks: SimilarChunk[] = [
    {url: "EXAMPLE", text: "EXAMPLE", chunk_index: 4},
    {url: "EXAMPLE", text: "EXAMPLE", chunk_index: 4},
    {url: "EXAMPLE", text: "EXAMPLE", chunk_index: 4},
    {url: "EXAMPLE", text: "EXAMPLE", chunk_index: 4}
  ]

  return <div>
    <h1>Admin Prompts</h1>

    <h2>Outer System Prompt</h2>
    <p>This prompt defines concepts available to all other prompts. It establishes a common ontology and context.</p>
    <UneditablePrompt text={generateOuterSystemPrompt()} />

    <h2>Query Restructuring Prompt</h2>
    <p>
      This prompt defines how user queries are rewritten. When someone enters,
      'how is confidential data defined?' the system may expand and rewrite the
      query to include expanded legal definitions for better search results,
      among other modifications.
    </p>
    <UneditablePrompt text={generateQueryPrompt(exampleQuery)} />

    <h2>Relevant Chunks Prompt</h2>
    <UneditablePrompt text={generateRelevantChunksPrompt(exampleQuery, exampleSimilarChunks, 2)} />

    <h2>Smart Summary Prompt</h2>
    <p>
      Smart Summaries are a way for us to collect and store information for
      large legal texts. Whereas a chunk contains only ~350 words a state chapter
      may contain 15,000 words, or more. We can feed large portions of text to an
      LLM and ask the LLM to summarize the text for us. Later we can refer to this
      summary in order to provide additional information in the Smart Summary to
      answer a user's query.
    </p>
    <UneditablePrompt text={generateSmartSummaryPrompt(exampleQuery, exampleChunkCollection)} />

    <h2>Source Document Prompt</h2>
    <p>
      This prompt takes in chunk matches and a summary readable and extracts
      and highlights important information relevant to the user's query.
    </p>
    <UneditablePrompt text={generateSourceDocumentPrompt(exampleQuery, exampleChunkCollection[0])} />
  </div>
}