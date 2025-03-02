import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import TextArea from './TextArea'

interface Props {
    handleSubmit: (inputValue: string) => void
    isSearching: boolean
}

export default function SearchInput({handleSubmit, isSearching}: Props) {
    const searchParams = useSearchParams()
    const initialValue = searchParams.get('q') ?? ''
    const [inputValue, setInputValue] = useState(initialValue)

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