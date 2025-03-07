import Nav from '../common/Nav/Nav'

export default function Header() {
    return (
        <div className="w-full flex justify-between items-center p-8">
            <img src="mdi_logo.svg" />
            <Nav />
        </div>
    )
}
