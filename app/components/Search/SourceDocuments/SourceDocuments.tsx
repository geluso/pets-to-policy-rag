import { SourceDocument } from '@/app/types'
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
            <h3 className="m-0">📎 Relevant Info</h3>
            <div className="flex flex-col gap-2">
                {sourceDocuments.map(({question, citation, relevantSubsections, relevantLanguage, url}, sourceIndex) => (
                    <div key={`source-document-${sourceIndex}`} className="border-solid border-black p-1 flex flex-col gap-2">
                        <h4 className="m-0">📄 Source Document</h4>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div>Citation: {citation}</div>
                                <div>Question: {question}</div>
                                <div>Relevant Subsections: {relevantSubsections}</div>
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
