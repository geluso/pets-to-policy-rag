import { CodeDomain, SourceDocument, StateDomain } from '@/app/types'
import Card from './Card'
import { reduceSourceDocumentsToUniqueCards } from './utils/reduceSourceDocumentsToUniqueCards'
import { useMemo } from 'react'

interface Props {
    sourceDocuments: SourceDocument[]
    stateDomain: StateDomain
    codeDomain: CodeDomain
}

export default function SourceDocuments({sourceDocuments, stateDomain, codeDomain}: Props) {
    if (!sourceDocuments.length) {
        return null
    }

    const cards = useMemo(() =>
        reduceSourceDocumentsToUniqueCards(stateDomain, codeDomain, sourceDocuments),
        [stateDomain, codeDomain, sourceDocuments],
    )

    return (
        <div className="w-full flex justify-center p-16 border-b-[1px] border-b-[#B2B2B2] border-solid border-t-0 border-l-0 border-r-0">
            <div className="max-w-[1070px] flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <div className="text-xl font-medium text-[#1E1E1E]">Relevant citations</div>
                    <div className="font-thin text-[#757575]">related to your inquiry</div>
                </div>
                <div className="flex flex-col gap-5">
                    {cards.map((card) => (
                        <Card key={card.citation} {...card} />
                    ))}
                </div>
            </div>
        </div>
    )
}
