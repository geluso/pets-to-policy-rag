'use server'

import prisma from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const url: string = json.url
    const summaryReadable: string = json.summaryText

    const newSummaryReadable = await prisma.summary_readable.create({ data: { url, summary_readable: summaryReadable }})
    return NextResponse.json(newSummaryReadable, { status: 201 }) // Respond with JSON and HTTP 201 Created
  } catch (error) {
    console.error('POST /api/summary-readables', error)
    return NextResponse.json({ error: `${error}` }, { status: 500 })
  }
}