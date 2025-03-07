export interface Props {
    title: string
    text: string
}

export default function Card({title, text}: Props) {
    return (
        <div className="flex items-start gap-4">
            <img src="info.svg" />
            <div className="flex flex-col gap-2">
                <div className="text-lg font-medium">{title}</div>
                <div className="text-sm font-thin text-[#757575]">{text}</div>
            </div>
        </div>
    )
}
