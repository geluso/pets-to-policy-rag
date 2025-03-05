import { Suspense } from 'react'
import Search from '../components/Search/Search'
import Toast from '../components/Toast'
import { CodeDomain } from '../types'

export default async function LaborPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search codeDomain={CodeDomain.LABOR} />
            <Toast />
        </Suspense>
    )
}
