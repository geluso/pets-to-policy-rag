'use server'

import { CodeDomain, SimilarChunk, StateDomain } from '@/app/types'
import { preprocessQuery } from './preprocessQuery'
import { mapDomainsToSearchParams } from './mapDomainsToSearchParams'

// const LOCAL_URL_BASE = 'http://localhost:8080'
const NGROK_URL_BASE = 'https://d29d-2601-602-8b82-92b0-fc10-9a2c-4785-d9d2.ngrok-free.app'

const URL_BASE = NGROK_URL_BASE
const URL_SEARCH = URL_BASE + '/search/'

export async function getChunks(
    stateDomain: StateDomain,
    codeDomain: CodeDomain,
    query: string,
    count = 3,
): Promise<SimilarChunk[]> {
    try {
        const preprocessedQuery = await preprocessQuery(query)

        let url = `${URL_SEARCH}?q=${encodeURIComponent(preprocessedQuery)}&limit=${count}`

        url = url + mapDomainsToSearchParams(stateDomain, codeDomain)

        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`Failed to fetch chunks: ${response.status} ${response.statusText}`)
        }

        const chunksWithScore = await response.json() as {doc: SimilarChunk, score: number}[]

        if (!chunksWithScore.length) {
            return []
        }

        console.log('CHUNKS WITH SCORE', chunksWithScore)

        return chunksWithScore.map(({doc}) => doc)

    } catch (error) {
        console.error(`GET ${URL_SEARCH}`, error)
        return []
    }
}
