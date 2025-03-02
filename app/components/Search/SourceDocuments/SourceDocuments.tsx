import { SourceDocument } from '@/app/types'
import { parseRelevantLanguage } from './parseRelevantLanguage'

interface Props {
    sourceDocuments: SourceDocument[]
    isGenerating: boolean
}

export default function SourceDocuments({sourceDocuments, isGenerating}: Props) {
    if (!sourceDocuments.length && isGenerating) {
        return null
    }

    if (!sourceDocuments.length) {
        <div>No Documents Found</div>
    }

    return (
        <div className="flex flex-col gap-1">
            <h3>📎 Relevant Info</h3>
            <div className="flex flex-col gap-2">
                {sourceDocuments.map(({question, citation, relevantSubsections, relevantLanguage, url}, sourceIndex) => (
                    <div key={`source-document-${sourceIndex}`} className="border-solid border-black p-1 mr-1">
                        <h3 className="mt-0">📄 Source Document</h3>
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
