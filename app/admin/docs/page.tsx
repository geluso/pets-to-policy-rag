import prisma from "@/lib/prisma"
import AdminDocs from "./AdminDocs"

export default async function AdminDocsPage() {
  const indexedChunks = await prisma.indexed_chunk.findMany()
  const summaryReadables = await prisma.summary_readable.findMany()
  return <div className="p-2">
    <h1>Admin Docs</h1>
    <AdminDocs indexedChunks={indexedChunks} summaryReadables={summaryReadables} />
  </div>
}