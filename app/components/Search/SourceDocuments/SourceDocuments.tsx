import { CodeDomain, SourceDocument, StateDomain } from '@/app/types'
import { parseRelevantLanguage } from './parseRelevantLanguage'
import { stateAbbreviationDictionary } from './stateAbbreviationDictionary'
import { capitalizeWords } from '@/app/utils'

interface Props {
    sourceDocuments: SourceDocument[]
    stateDomain: StateDomain
    codeDomain: CodeDomain
}

export default function SourceDocuments({sourceDocuments, stateDomain, codeDomain}: Props) {
    if (!sourceDocuments.length) {
        return null
    }

    const handleUrlClick = (url: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="flex flex-col gap-3">
            <h3 className="m-0">📎 Relevant Citations</h3>
            <div className="flex flex-col gap-2">
                {sourceDocuments.map(({
                    question,
                    relevantSubsections,
                    relevantKeywords,
                    relevantLanguage,
                    url,
                    citation: {
                        title,
                        chapter,
                        section,
                    }
                }, sourceIndex) => (
                    <div key={`source-document-${sourceIndex}`} className="border-solid border-black p-1 flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <div>
                                <div><b>Citation:</b> {stateAbbreviationDictionary[stateDomain]} {capitalizeWords(codeDomain)} Code §{title}.{chapter}.{section}</div>
                                <div><b>Question:</b> {question}</div>
                                <div><b>Relevant Keywords:</b> {relevantKeywords.join(', ')}</div>
                                <div><b>Relevant Subsections:</b> {relevantSubsections.map((subsection) => `(${subsection})`).join(', ')}</div>
                                <div><b>Date Ingested:</b> 2025-03-03</div>
                            </div>
                            <div>
                                {parseRelevantLanguage(relevantLanguage).map(({text, isImportant}, spanIndex) => (
                                    <span key={`span-${spanIndex}`} className={isImportant ? 'text-red-600' : 'text-black'}>
                                        {text}
                                    </span>
                                ))}
                            </div>
                            <a onClick={handleUrlClick(url)} href={url}>{url}</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
