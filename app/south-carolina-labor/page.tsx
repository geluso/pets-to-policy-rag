import { Suspense } from 'react'
import Search from '../components/Search/Search'
import Toast from '../components/Toast'
import { CodeDomain } from '../constants/types'

export default async function LaborPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search codeDomain={CodeDomain.SOUTH_CAROLINA_LABOR} />
            <Toast />
        </Suspense>
    )
}
