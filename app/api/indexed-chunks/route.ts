'use server'

import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const url: string = json.url
    const chunkText: string = json.chunkText
    const chunkIndex: number = json.chunkIndex

    const indexedChunk = await prisma.indexed_chunk.create({ data: { url, chunk_text: chunkText, chunk_index: chunkIndex }})
    return NextResponse.json(indexedChunk, { status: 201 }) // Respond with JSON and HTTP 201 Created
  } catch (error) {
    console.error('POST /api/indexed-chunks', error)
    return NextResponse.json({ error: `${error}` }, { status: 500 })
  }
}