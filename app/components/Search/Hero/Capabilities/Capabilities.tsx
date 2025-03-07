import Card, { Props as CardProps } from './Card'

const cards: CardProps[] = [
    {title: 'Aggregate relevant citations', text: 'increase efficiency in searching for specific statutes.'},
    {title: 'Extract, interpret, and summarize', text: 'legal and regulatory guidance on data privacy and sharing.'},
    {title: 'Provide targeted recommendations', text: 'on how agencies can navigate privacy barriers using PETs.'},
]

export default function Capabilities() {
    return (
        <div className="w-full flex justify-center p-16 bg-white">
            <div className="w-full max-w-[997px] flex flex-col gap-6">
                <div className="flex flex-col">
                    <div className="text-lg font-medium">P2P capabilities</div>
                    <div className="font-thin text-[#757575]">for policy research and recommendations</div>
                </div>
                <div className="flex gap-16">
                    {cards.map((card) => (
                        <Card key={card.text} {...card} />
                    ))}
                </div>
            </div>
        </div>
    )
}
