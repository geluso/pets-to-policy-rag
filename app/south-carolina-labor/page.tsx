import { Suspense } from 'react'
import Search from '../components/Search/Search'
import Toast from '../components/common/Toast'
import { CodeDomain, StateDomain } from '../types'

export default async function SouthCarolinaLaborPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search codeDomain={CodeDomain.LABOR} stateDomain={StateDomain.SOUTH_CAROLINA} />
            <Toast />
        </Suspense>
    )
}
