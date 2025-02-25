import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import rightArrowIcon from "assets/svg/right-arrow.svg"
import rightArrowBlueIcon from "assets/svg/right-arrow-blue.svg"

interface Props {
    onSubmit: (text: string) => void
}

export default function TextArea({onSubmit}: Props) {
    const [isFocused, setIsFocused] = useState(false)
    const [value, setValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value)
        adjustTextareaHeight()
    }

    const handleSubmit = () => {
        if (value) {
            onSubmit(value)
        }
    }

    const handleEnterPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSubmit()
        }
    }

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = 'auto'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }

    useEffect(() => {
        adjustTextareaHeight()
    }, [value])

    return (
        <div>
            <textarea
                value={value}
                onChange={handleChange}
                onKeyDown={handleEnterPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={`Ask me something about the laws of the land`}
                className="w-full box-border outline-none resize-none leading-[22px] p-1"
                autoFocus
                rows={3}
                ref={textareaRef}
            />
        </div>
    )
}