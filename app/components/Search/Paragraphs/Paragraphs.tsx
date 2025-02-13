import { Paragraph } from "@/app/types"

interface Props {
    paragraphs: Paragraph[]
    isSearching: boolean
}

export default function Paragraphs({paragraphs, isSearching}: Props) {
    return (
        <div className="w-full h-full border-1 flex-col gap-1">
            {paragraphs.map((paragraph, index) => (
                <span key={`paragraph-${index}`}>
                    {paragraph.map(({isImportant, text}, index) => (
                        <span key={`text-${index}`} className={`${isImportant ? 'text-red-500' : 'text-black'}`}>
                            {text}
                        </span>
                    ))}
                </span>
            ))}
        </div>
    )
}