import { useState } from 'react'
import TextArea from './TextArea'
import { CodeDomain, SearchStatus, StateDomain } from '@/app/types'
import Nav from '../../common/Nav/Nav'
import ExportOptions from './ExportOptions'
import SearchStatusLoader from './SearchStatusLoader/SearchStatusLoader'

interface Props {
    onSubmit: (inputValue: string) => void
    onPdfClick: () => void
    searchStatus: SearchStatus
    stateDomain: StateDomain
    codeDomain: CodeDomain
    hasFinishedGenerating: boolean
}

export default function Query({onSubmit, onPdfClick, searchStatus, codeDomain, stateDomain, hasFinishedGenerating}: Props) {
    const [inputValue, setInputValue] = useState('')
    const isSearching = [
        SearchStatus.FINDING_CHUNKS,
        SearchStatus.GENERATING_SUMMARY,
        SearchStatus.GENERATING_DOCUMENTS,
    ].includes(searchStatus)

    return (
        <div className="w-full flex flex-col items-center p-10 bg-[#091334]">
            <div className="w-full flex flex-col gap-8 items-center">
                <div className="text-4xl text-white">Select a state and a category of your interest</div>
                <Nav />
                <div className="w-full flex flex-col gap-4 items-center">
                    <TextArea
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        onSubmit={onSubmit}
                        isSearching={isSearching}
                        stateDomain={stateDomain}
                        codeDomain={codeDomain}
                    />
                    {hasFinishedGenerating ? (
                        <ExportOptions onPdfClick={onPdfClick} />
                    ) : (
                        <div className="py-6">
                            <SearchStatusLoader searchStatus={searchStatus} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
