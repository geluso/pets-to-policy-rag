import { SourceDocument } from '@/app/types'
import { parseRelevantLanguage } from './utils/parseRelevantLanguage'

export interface Props extends Omit<SourceDocument, 'section'> {
    citation: string
}

export default function Card({
    relevantSubsections,
    relevantKeywords,
    relevantLanguage,
    url,
    citation,
}: Props) {
    const handleUrlClick = (url: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="w-full p-4 flex flex-col gap-2 border-solid border-[1px] border-[#D9D9D9] rounded-md">
            <div className="text-xl font-medium">{citation}</div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <div className="flex gap-1">
                        <div className="font-semibold text-sm">Relevant keywords:</div>
                        <div className="text-sm">{relevantKeywords.join(', ')}</div>
                    </div>
                    <div className="flex gap-1">
                        <div className="font-semibold text-sm">Relevant subsections:</div>
                        <div className="text-sm">{relevantSubsections.map((subsection) => `(${subsection})`).join(', ')}</div>
                    </div>
                    <div className="flex gap-1">
                        <div className="font-semibold text-sm">Date ingested:</div>
                        <div className="text-sm">2025-03-03</div>
                    </div>
                </div>
                <div>
                    {parseRelevantLanguage(relevantLanguage).map(({text, isImportant}, spanIndex) => (
                        <span key={`span-${spanIndex}`} className={`text-sm font-thin ${isImportant ? 'text-red-600' : 'text-[#757575]'}`}>
                            {text}
                        </span>
                    ))}
                </div>
            </div>
            <a
                className="self-end w-fit bg-[#E3E3E3] text-[#1E1E1E] text-xs rounded-md border-solid border-[#767676] border-[1px] px-3 py-2 cursor-pointer no-underline"
                onClick={handleUrlClick(url)}
                href={url}
            >
                Link
            </a>
        </div>
    )
}
