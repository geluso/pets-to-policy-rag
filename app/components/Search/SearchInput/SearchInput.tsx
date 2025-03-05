import { useState } from 'react'
import TextArea from './TextArea'
import { CodeDomain, SearchStatus } from '@/app/types'

interface Props {
    handleSubmit: (inputValue: string) => void
    searchStatus: SearchStatus
    codeDomain: CodeDomain
}

export default function SearchInput({handleSubmit, searchStatus, codeDomain}: Props) {
    const [inputValue, setInputValue] = useState('')
    const isSearching = [
        SearchStatus.FINDING_CHUNKS,
        SearchStatus.GENERATING_SUMMARY,
        SearchStatus.GENERATING_DOCUMENTS,
    ].includes(searchStatus)

    const handleClick = () => {
        handleSubmit(inputValue)
    }

    return (
        <div className="flex flex-col gap-2">
            <TextArea
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSubmit={handleSubmit}
                isSearching={isSearching}
                codeDomain={codeDomain}
            />
            <button
                className="w-full"
                onClick={handleClick}
                disabled={isSearching || !inputValue.length}
            >
                Submit
            </button>
        </div>
    )
}
