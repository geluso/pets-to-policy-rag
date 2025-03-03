import { useState } from 'react'
import TextArea from './TextArea'
import { SearchStatus } from '@/app/types'

interface Props {
    handleSubmit: (inputValue: string) => void
    searchStatus: SearchStatus
}

export default function SearchInput({handleSubmit, searchStatus}: Props) {
    const [inputValue, setInputValue] = useState('')
    const isSearching = [
        SearchStatus.FINDING_CHUNKS,
        SearchStatus.FILTERING_CHUNKS,
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
