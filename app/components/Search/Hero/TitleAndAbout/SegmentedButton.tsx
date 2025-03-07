export default function SegmentedButton() {
    return (
        <div className="flex">
            <div className="flex items-center gap-1 pl-8 pr-6 py-4 border-solid border-2 border-r-[1px] border-[#79747E] rounded-l-full bg-[#E8DEF8]">
                <img src="checkmark.svg" />
                <div className="text-[#4A4459]">About</div>
            </div>
            <div className="flex items-center gap-1 pl-6 pr-8 py-4 border-solid border-2 border-l-[1px] border-[#79747E] rounded-r-full bg-transparent">
                <img src="checkmark.svg" className="opacity-0" />
                <div className="text-[#E8DEF8]">Team</div>
            </div>
        </div>
    )
}
