import { useSearchParams } from "next/navigation"
import { useState } from "react"
import TextArea from "./TextArea"

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
        <div>
            <div className="pb-2 w-full">
              <h2>Query Texas Code About Unemployment Insurance Data</h2>
            </div>
            <div className="pb-2 w-full">
              <TextArea inputValue={inputValue} setInputValue={setInputValue} onSubmit={handleSubmit} />
            </div>
            <div>
              <button className="w-full" onClick={handleClick} disabled={isSearching}>Submit</button>
            </div>
        </div>
    )
}