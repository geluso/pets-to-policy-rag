import { SourceDocument } from '@/app/types'
import { parseRelevantLanguage } from './parseRelevantLanguage'

interface Props {
    sourceDocuments: SourceDocument[]
}

export default function SourceDocuments({sourceDocuments}: Props) {
    return (
        <div className="flex flex-col gap-1">
            <h3>📎 Relevant Info</h3>
            <div>
                {sourceDocuments.map(({question, citation, relevantSubsections, relevantLanguage, url}, index) => (
                    <div key={`source-document-${index}`} className="border-solid border-black p-1 mr-1">
                        <h3 className="mt-0">📄 Source Document</h3>
                        <div>
                            <div>{citation}</div>
                            <div>{question}</div>
                            <div>{relevantSubsections}</div>
                            <div className="flex flex-col gap-1">
                                {parseRelevantLanguage(relevantLanguage).map((paragraph) => (
                                    <div>
                                        {paragraph.map(({text, isImportant}, index) => (
                                            <span key={`span-${index}`} className={isImportant ? 'text-red' : 'text-black'}>{text}</span>
                                        ))}
                                    </div>
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