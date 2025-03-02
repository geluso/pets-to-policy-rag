import { Suspense } from 'react'
import Search from './components/Search/Search'

export default async function SearchPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search />
        </Suspense>
    )
}
