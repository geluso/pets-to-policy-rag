const socialLinks = [
    {url: '#', icon: 'x.svg'},
    {url: '#', icon: 'youtube.svg'},
    {url: '#', icon: 'linkdin.svg'},
]

const resourceLinks = [
    {url: '#', text: 'Blog'},
    {url: '#', text: 'Best practices'},
    {url: '#', text: 'Support'},
    {url: '#', text: 'Developers'},
    {url: '#', text: 'Resource library'},
]

export default function Footer() {
    const handleLinkClick = (url: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault()
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="w-full flex justify-between py-8 pl-6 pr-16">
            <div className="flex flex-col gap-1 items-end">
                <img src="mdi_logo.svg" />
                <div className="flex items-center gap-2 pr-8">
                    {socialLinks.map(({url, icon}) => (
                        <a key={icon} href={url} onClick={handleLinkClick(url)}>
                            <img src={icon} />
                        </a>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="font-medium">Resources</div>
                <div className="flex flex-col gap-2">
                    {resourceLinks.map(({url, text}) => (
                        <a
                            className="no-underline text-sm text-[#1E1E1E] font-thin"
                            key={text}
                            href={url}
                            onClick={handleLinkClick(url)}
                        >
                            {text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}
