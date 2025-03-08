import { CodeDomain, StateDomain } from '@/app/types'
import { capitalizeWords } from '@/app/utils'
import { ChangeEvent, KeyboardEvent } from 'react'

interface Props {
    inputValue: string
    setInputValue: (text: string) => void
    onSubmit: (text: string) => void
    isSearching: boolean
    stateDomain: StateDomain
    codeDomain: CodeDomain
}

export default function TextArea({
    inputValue,
    setInputValue,
    onSubmit,
    isSearching,
    stateDomain,
    codeDomain,
}: Props) {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value)
    }

    const handleSubmit = () => {
        if (inputValue) {
            onSubmit(inputValue)
        }
    }

    const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
        }
    }

    return (
        <div className="w-full max-w-[680px] p-4 flex gap-4 bg-white rounded-lg">
            <textarea
                disabled={isSearching}
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleEnterPress}
                placeholder={`Ask me a question about ${capitalizeWords(stateDomain)} ${codeDomain} laws and regulations`}
                className="w-full outline-none border-none resize-none leading-[22px]"
                autoFocus
                rows={5}
            />
            <button
                className="self-end border-none rounded-md px-3 py-2 cursor-pointer transition bg-[#2C2C2C] text-white hover:bg-[#3C3C3C] disabled:bg-[#555] disabled:text-gray-400 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={isSearching || !inputValue.length}
            >
                Submit
            </button>
        </div>
    )
}
