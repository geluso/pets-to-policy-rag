interface Props {
    smartSummary: string
}

export default function SmartSummary({smartSummary}: Props) {
    if (!smartSummary.length) {
        return null
    }

    return (
        <div className="w-full flex justify-center bg-[#C6FFFF] p-16">
            <div className="w-full max-w-[1200px] flex gap-8 items-start justify-center">
                <img src="framer.svg" />
                <div className="w-full max-w-[1000px] flex flex-col jsutify-center gap-6">
                    <div className="flex flex-col">
                        <div className="text-xl font-medium text-[#1E1E1E]">Smart AI Insights</div>
                        <div className="text-sm font-thin text-[#757575]">
                            Note: This AI-generated summary may not be 100% accurate. Human oversight is encouraged.
                        </div>
                    </div>
                    <div className="flex flex-col gap-6">
                        {smartSummary.split(". ").map((sentence, index) => (
                            <div className="text-[#1E1E1E] font-extralight" key={index}>
                                {sentence}.
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
