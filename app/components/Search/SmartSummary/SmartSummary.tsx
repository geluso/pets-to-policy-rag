interface Props {
    smartSummary: string
}

export default function SmartSummary({smartSummary}: Props) {
    return (
        <div className="w-full border-1 flex-col gap-1">
            <h3 className="mt-0">🧠 Smart Summary</h3>
            <div>{smartSummary}</div>
        </div>
    )
}
