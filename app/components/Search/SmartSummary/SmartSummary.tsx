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
            <div className="border-solid p-2">
                {smartSummary.split(". ").map((sentence, index) => {
                    return <p className="mt-0 last:mb-0" key={index}>{sentence}.</p>
                })}
            </div>
            {/* <p className="mt-0 mb-0 p-2 rounded-md bg-red-300"> */}
            <p className="mt-0 mb-0 p-2 rounded-md bg-disclaimer">
                <b>Disclaimer:</b>This summary may contain errors.
                Further human expert oversight is advised.
            </p>
        </div>
    )
}
