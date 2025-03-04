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
            <p className="mt-0 mb-0 p-2 rounded-md bg-red-300"><b>Disclaimer:</b>This summary may contain errors.</p>
            <div>{smartSummary}</div>
        </div>
    )
}
