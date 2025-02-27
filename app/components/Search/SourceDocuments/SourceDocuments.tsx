import SourceDocument from "./SourceDocument";
import { SourceDocumentProps } from "@/app/types";

interface Props {
    sourceDocuments: SourceDocumentProps[]
}

export default function SourceDocuments({sourceDocuments}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h3>📎 Relevant Info</h3>
      {sourceDocuments.map((sourceDocument, index) => <SourceDocument key={index} sourceDocument={sourceDocument} />)}
    </div>
  )
}