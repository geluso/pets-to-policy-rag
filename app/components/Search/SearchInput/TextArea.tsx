import { ChangeEvent, KeyboardEvent } from "react"

interface Props {
    inputValue: string
    setInputValue: (text: string) => void
    onSubmit: (text: string) => void
}

export default function TextArea({ inputValue, setInputValue, onSubmit }: Props) {
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
        <div>
            <textarea
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleEnterPress}
                placeholder={`Ask me something about the laws of the land`}
                className="w-full box-border outline-none resize-none leading-[22px] p-1"
                autoFocus
                rows={3}
            />
        </div>
    )
}