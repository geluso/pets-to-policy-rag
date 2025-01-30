import { OpenAIEmbeddings } from '@langchain/openai'
import { NeonPostgres } from "@langchain/community/vectorstores/neon";

const embeddings = new OpenAIEmbeddings({
  apiKey: process.env.OPENAI_API_KEY,
  // modelName: 'gpt-4-1106-preview'
})

const vectorStore = await NeonPostgres.initialize(embeddings, {
  connectionString: process.env.DATABASE_URL as string,
});

export default async function Vectors() {
  // const documents = [
  //   { pageContent: "Hello world", metadata: { topic: "greeting" } },
  //   { pageContent: "Bye bye", metadata: { topic: "greeting" } },
  //   {
  //     pageContent: "Mitochondria is the powerhouse of the cell",
  //     metadata: { topic: "science" },
  //   },
  // ];
  // const idsInserted = await vectorStore.addDocuments(documents);
  // console.log('ids inserted', idsInserted)
  
  // You can now query the store for similar documents to the input query
  const resultOne = await vectorStore.similaritySearch("hola", 1);
  console.log(resultOne);  

  //const query = 'hotdog'
  //const embeddingData = await embeddings.embedQuery(query)
  //console.log('create embeddings for', query)
  //console.log(embeddingData)
  return <div>
    <h1>Embeddings</h1>
    <p>{resultOne[0].pageContent}</p>
  </div>
}