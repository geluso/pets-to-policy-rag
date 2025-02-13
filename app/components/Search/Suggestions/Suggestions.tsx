import useSuggestions from "./useSuggestions"

export default function Suggestions() {
    const suggestions = useSuggestions()

    if (!suggestions) {
        return null
    }

    return (
        <div className="flex-col gap-1">
            {suggestions.map((suggestion) => (
                <div key={suggestion}>{suggestion}</div>
            ))}
        </div>
    )
}