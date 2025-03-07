import { Routes } from './types'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
    redirect(Routes.TX_LABOR)
}
