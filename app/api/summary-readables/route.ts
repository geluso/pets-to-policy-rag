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
        return NextResponse.json({ error: "No summary found for this URL" }, {status: 404})
        }

        return NextResponse.json(summaryReadable, {status: 200})
    } catch (error) {
        console.error('GET /api/summary-readables', error)
        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}