import Capabilities from './Capabilities/Capabilities'
import TitleAndAbout from './TitleAndAbout/TitleAndAbout'

export default function Hero() {
    return (
        <div className="w-full flex flex-col">
            <TitleAndAbout />
            <Capabilities />
        </div>
    )
}
