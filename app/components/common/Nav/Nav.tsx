import { Routes } from '@/app/types'
import NavLink, { Props as NavLinkProps } from './NavLink'

const navLinks: NavLinkProps[] = [
    {url: Routes.TX_LABOR, text: 'Texas Labor'},
    {url: Routes.TX_EDUCATION, text: 'Texas Education'},
    {url: Routes.SC_LABOR, text: 'South Carolina Labor'},
]

export default function Nav() {
    return (
        <div className="flex gap-2">
            {navLinks.map((navLink) => (
                <NavLink key={navLink.url} {...navLink} />
            ))}
        </div>
    )
}
