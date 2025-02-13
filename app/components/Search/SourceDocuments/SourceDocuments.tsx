import { SourceDocument } from "@/app/types";

interface Props {
    sourceDocuments: SourceDocument[]
}

export default function SourceDocuments({sourceDocuments}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {sourceDocuments.map((sourceDocument, index) => (
        <div key={`source-${index}`}>{sourceDocument.title}</div>
      ))}
    </div>
  )
}