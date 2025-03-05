import { CodeDomain } from '@/app/types'
import { ChangeEvent, KeyboardEvent } from 'react'

interface Props {
    inputValue: string
    setInputValue: (text: string) => void
    onSubmit: (text: string) => void
    isSearching: boolean
    codeDomain: CodeDomain
}

export default function TextArea({inputValue, setInputValue, onSubmit, isSearching, codeDomain}: Props) {
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
        <textarea
            disabled={isSearching}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleEnterPress}
            placeholder={`Ask me a question about ${codeDomain} laws and regulations`}
            className="w-full box-border outline-none resize-none leading-[22px] p-1"
            autoFocus
            rows={3}
        />
    )
}
