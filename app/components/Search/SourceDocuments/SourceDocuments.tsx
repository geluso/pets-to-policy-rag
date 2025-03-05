import { SourceDocument } from '@/app/constants/types'
import { parseRelevantLanguage } from './parseRelevantLanguage'

interface Props {
    sourceDocuments: SourceDocument[]
}

export default function SourceDocuments({sourceDocuments}: Props) {
    if (!sourceDocuments.length) {
        return null
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="m-0">📎 Relevant Citations</h3>
            <div className="flex flex-col gap-2">
                {sourceDocuments.map(({question, citation, relevantSubsections, relevantKeywords, relevantLanguage, url}, sourceIndex) => (
                    <div key={`source-document-${sourceIndex}`} className="border-solid border-black p-1 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div>
                                <div><b>Citation:</b> {citation}</div>
                                <div><b>Question:</b> {question}</div>
                                <div><b>Relevant Keywords:</b> {relevantKeywords}</div>
                                <div><b>Relevant Subsections:</b> {relevantSubsections}</div>
                                <div><b>Date Ingested:</b> 2025-03-03</div>
                            </div>
                            <div>
                                {parseRelevantLanguage(relevantLanguage).map(({text, isImportant}, spanIndex) => (
                                    <span key={`span-${spanIndex}`} className={isImportant ? 'text-red-600' : 'text-black'}>
                                        {text}
                                    </span>
                                ))}
                            </div>
                            <a href={url}>{url}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
