import { useEffect, useState } from "react"

export default function useSuggestions(): string[] | null {
    const [suggestions, setSuggestions] = useState<string[] | null>(null)

    useEffect(() => {
        // fetch suggestions from vercel SQL DB
    }, [])

    return suggestions
}