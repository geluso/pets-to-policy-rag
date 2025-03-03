interface Props {
    smartSummary: string
}

export default function SmartSummary({smartSummary}: Props) {
    if (!smartSummary.length) {
        return null
    }

    return (
        <div className="w-full border-1 flex flex-col gap-3">
            <h3 className="m-0">🧠 Smart Summary</h3>
            <div>{smartSummary}</div>
        </div>
    )
}
