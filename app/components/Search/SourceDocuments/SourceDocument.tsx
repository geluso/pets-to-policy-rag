import { SourceDocumentProps } from "@/app/types"
import Link from "next/link"

export default function SourceDocument({ sourceDocument }: { sourceDocument: SourceDocumentProps }) {
  return <div className="border-solid border-black p-1 mr-1">
    <h3 className="mt-0">📄 Source Document</h3>
    <div>{sourceDocument.title}</div>
    <div>{sourceDocument.text}</div>
    <div className="mt-2">
      <Link href={sourceDocument.url}>{sourceDocument.url}</Link>
    </div>
  </div>
}