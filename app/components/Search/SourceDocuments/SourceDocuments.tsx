import { SourceDocument } from "@/app/types";
import Link from "next/link";

interface Props {
    sourceDocuments: SourceDocument[]
}

export default function SourceDocuments({sourceDocuments}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {sourceDocuments.map((sourceDocument, index) => (
        <div key={`source-${index}`} className="p-1 mr-1">
          <h3 className="mt-0">📄 Source Document</h3>
          <div>{sourceDocument.title}</div>
          <div>{sourceDocument.text}</div>
          <div className="mt-2">
            <Link href={sourceDocument.url}>{sourceDocument.url}</Link>
          </div>
          <hr />
        </div>
      ))}
    </div>
  )
}