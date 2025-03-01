'use server'

import { Chunk } from '@/app/types'
import { preprocessQuery } from './preprocessQuery'

// const LOCAL_URL_BASE = 'http://localhost:8080'
const NGROK_URL_BASE = 'https://4cb3-2601-602-8b82-92b0-64d0-4b7b-a51a-85fb.ngrok-free.app'

const URL_BASE = NGROK_URL_BASE
const URL_SEARCH = URL_BASE + '/search/'

export async function getChunks(query: string): Promise<Chunk[]> {
    try {
        const preprocessedQuery = await preprocessQuery(query)
        
        return await fetch(URL_SEARCH + '?q=' + preprocessedQuery).then(({json}) => json())
    } catch(error) {
        console.error(`GET ${URL_SEARCH}`, error)

        return []
    }
}
