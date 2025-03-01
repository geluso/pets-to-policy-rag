'use server'

import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const json = await req.json()
  const url: string = json.url
  const chunkText: string = json.chunkText
  const chunkIndex: number = json.chunkIndex

  const indexedChunk = await prisma.indexed_chunk.create({ data: { url, chunk_text: chunkText, chunk_index: chunkIndex }})
  return indexedChunk
}