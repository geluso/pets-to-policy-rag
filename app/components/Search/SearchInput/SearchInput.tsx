import { useSearchParams } from "next/navigation"
import { useState } from "react"

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleSubmit(inputValue)
        }
      }
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
      }

    return (
        <div>
            <input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} disabled={isSearching}/>
            <button onClick={handleClick} disabled={isSearching}>Submit</button>
        </div>
    )
}