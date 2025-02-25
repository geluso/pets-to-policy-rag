import { Paragraph } from "@/app/types"

interface Props {
    paragraphs: Paragraph[]
}

export default function Paragraphs({paragraphs}: Props) {
    console.log('paragraphs', paragraphs)
    return (
        <div className="w-full h-full border-1 flex-col gap-1">
            {paragraphs.length > 0 && <h3 className="mt-0">💡 Answer</h3>}
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