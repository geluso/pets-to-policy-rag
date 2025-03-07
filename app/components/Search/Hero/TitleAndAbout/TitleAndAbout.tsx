import SegmentedButton from './SegmentedButton'

export default function TitleAndAbout() {
    return (
        <div className="w-full flex justify-center px-16 pt-16 pb-10 bg-[#091334]">
            <div className="max-w-[1000px] flex flex-col items-center gap-8">
                <div className="text-7xl font-bold text-[#F3F3F3]">PETs-to-Policy</div>
                <div className="text-xl text-[#F3F3F3] text-center">
                    The Privacy-to-Policy (P2P) is an AI-powered legal lookup and policy interpretation tool that ingests, processes, and analyzes statutory codes to assist government agencies in navigating data privacy regulations.
                </div>
                <SegmentedButton />
            </div>
        </div>
    )
}
