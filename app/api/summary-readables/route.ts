'use server'

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const url: string = json.url
        const summaryReadable: string = json.summaryText
        const newSummaryReadable = await prisma.summary_readable.create({data: {url, summary_readable: summaryReadable}})

        return NextResponse.json(newSummaryReadable, {status: 201})
    } catch (error) {
        console.error('POST /api/summary-readables', error)

        return NextResponse.json({ error: `${error}`}, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl.searchParams.get('url')

        if (!url) {
            return NextResponse.json({error: "Missing 'url' query parameter"}, {status: 400})
        }

        const summaryReadable = await prisma.summary_readable.findFirst({where: {url}})

        if (!summaryReadable) {
            // Return a blank string if there's no summary readable at all.
            // This makes the system more robust? It is OK if the summary readable doesn't exist.
            // Summary readables are meant to provide extra additional information.
            console.warn({error: 'No summary found for this URL'})
            return NextResponse.json({
                url,
                summary_readable: '',
                id: Math.random()
            })
        }

        return NextResponse.json(summaryReadable, {status: 200})
    } catch (error) {
        console.error('GET /api/summary-readables', error)

        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}
