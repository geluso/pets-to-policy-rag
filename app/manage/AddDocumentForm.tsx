"use client"

import { useEffect, useState } from "react"

export default function AddDocumentForm() {
  const [allDocs, setAllDocs] = useState<Document[]>([])
  const addDoc = (doc: Document) => setAllDocs([doc, ...allDocs])
  console.log(addDoc)

  useEffect(() => {
    // getAllDocs().then(setAllDocs)
  }, [])

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.currentTarget.elements as HTMLFormControlsCollection & {
      url: HTMLInputElement
      title: HTMLInputElement 
      text: HTMLTextAreaElement
    }
    const url = form.url.value
    const title = form.title.value
    const text = form.text.value
    console.log(url, title, text)
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
            <th>ID</th>
            <th>URL</th>
            <th>Title</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {/* {allDocs.map(doc => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.url}</td>
              <td>{doc.title}</td>
              <td>{doc.text}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  </div>
}