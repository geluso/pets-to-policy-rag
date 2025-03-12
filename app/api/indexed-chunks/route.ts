'use server'

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const url: string = json.url
        const chunkText: string = json.chunkText
        const chunkIndex: number = json.chunkIndex
        const indexedChunk = await prisma.indexed_chunk.create({data: {url, chunk_text: chunkText, chunk_index: chunkIndex}})
        
        return NextResponse.json(indexedChunk, {status: 201})
    } catch (error) {
        console.error('POST /api/indexed-chunks', error)

        return NextResponse.json({error: `${error}`}, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = req.nextUrl.searchParams.get('url')
        const chunkIndexStr = req.nextUrl.searchParams.get('chunkIndex')

        if (!url || !chunkIndexStr) {
            return NextResponse.json({error: 'Missing "url" or "chunkIndex" query parameter'}, {status: 400})
        }

        const chunkIndex = parseInt(chunkIndexStr, 10)
        if (isNaN(chunkIndex)) {
            return NextResponse.json({error: 'Invalid "chunkIndex" parameter'}, {status: 400})
        }

        // Fetch the two previous and two next chunks, including the given chunk
        const adjacentChunks = await prisma.indexed_chunk.findMany({
            where: {
                url: url,
                chunk_index: {
                    gte: Math.max(chunkIndex - 2, 0), // Prevent negative indexes
                    lte: chunkIndex + 2
                }
            },
            orderBy: {chunk_index: 'asc'}
        })

        return NextResponse.json(adjacentChunks, {status: 200})
    } catch (error) {
        console.error('GET /api/indexed-chunks', error)

        return NextResponse.json({ error: `${error}` }, {status: 500})
    }
}
