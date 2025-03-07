import { Suspense } from 'react'
import Search from '../components/Search/Search'
import Toast from '../components/common/Toast'
import { CodeDomain, StateDomain } from '../types'

export default async function TexasLaborPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search codeDomain={CodeDomain.LABOR} stateDomain={StateDomain.TEXAS} />
            <Toast />
        </Suspense>
    )
}
