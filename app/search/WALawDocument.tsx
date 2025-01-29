import { Document } from "@prisma/client";

export default function WALawDocument({ doc }: { doc: Document }) {
  return <div className="border border-solid border-black mb-2 p-2">
    <h3>{doc.title}</h3>
    <p>{doc.text}</p>
    <p>
      <a href={doc.url}>{doc.url}</a>
    </p>
  </div>
}