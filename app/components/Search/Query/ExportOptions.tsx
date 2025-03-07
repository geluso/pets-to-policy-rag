interface Props {
    onPdfClick: () => void
}

export default function ExportOptions({onPdfClick}: Props) {
    return (
        <div className="flex flex-col gap-3 items-center">
            <div className="px-3 pb-1 border-b-[1px] border-b-[#B2B2B2] border-solid border-t-0 border-l-0 border-r-0 text-white text-sm">
                Download the results below
            </div>
            <button
                className="w-fit border-none bg-white text-[#303030] rounded-md py-2 px-5 cursor-pointer hover:bg-[#f0f0f0] hover:text-[#202020] hover:shadow-md transition"
                onClick={onPdfClick}
            >
                PDF
            </button>
        </div>
    )
}
