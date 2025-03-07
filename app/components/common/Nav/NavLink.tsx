import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface Props {
    url: string
    text: string
}

export default function NavLink({url, text}: Props) {
    const pathname = usePathname()
    const isActive = pathname === `/${url}`

    return (
        <Link href={url} className={`
            text-black text-base no-underline py-2 px-3 rounded-lg
            ${isActive ? 'bg-[#9BFFFF]' : 'bg-[#F5F5F5]'}
        `}>
            {text}
        </Link>
    )
}
