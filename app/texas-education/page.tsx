import { Suspense } from 'react'
import Search from '../components/Search/Search'
import Toast from '../components/Toast'
import { CodeDomain, StateDomain } from '../types'

export default async function EducationPage() {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Search codeDomain={CodeDomain.EDUCATION} stateDomain={StateDomain.TEXAS} />
            <Toast />
        </Suspense>
    )
}
