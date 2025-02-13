import { SourceDocument } from "@/app/types";

interface Props {
    sourceDocuments: SourceDocument[]
    isSearching: boolean
}

export default function SourceDocuments({sourceDocuments, isSearching}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {sourceDocuments.map((sourceDocument, index) => (
        <div key={`source-${index}`}>{sourceDocument.title}</div>
      ))}
    </div>
  )
}