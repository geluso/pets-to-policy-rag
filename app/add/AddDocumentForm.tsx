"use client"

import { Document } from "@prisma/client"
import { createDocument, getAllDocs } from "./actions"
import { useEffect, useState } from "react"

export default function AddDocumentForm() {
  const [allDocs, setAllDocs] = useState<Document[]>([])
  const addDoc = (doc: Document) => setAllDocs([doc, ...allDocs])

  useEffect(() => {
    getAllDocs().then(setAllDocs)
  }, [])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.currentTarget.elements
    const url = form.url.value as string
    const title = form.title.value as string
    const text = form.text.value as string
    createDocument({ url, title, text }).then(addDoc)
  }

  return <div>
    <h2>Create New Document</h2>
    <form onSubmit={handleSubmit}>
      <div>
        URL:
      </div>
      <div>
        <input name="url" type="text" />
      </div>
      <div>
        Title:
      </div>
      <div>
        <input name="title" type="text" />
      </div>
      <div>
        Text:
      </div>
      <div>
        <textarea name="text" />
      </div>
      <div>
        <button>Add Document</button>
      </div>
    </form>

    <div>
      <h2>All Documents</h2>
      <table border={1}>
        <thead>
          <tr>
            <th>URL</th>
            <th>Title</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {allDocs.map(doc => (
            <tr key={doc.id}>
              <td>{doc.url}</td>
              <td>{doc.title}</td>
              <td>{doc.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}