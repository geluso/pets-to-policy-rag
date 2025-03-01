'use server'

import prisma from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const json = await req.json()
  const url: string = json.url
  const summaryReadable: string = json.summaryText

  const newSummaryReadable = await prisma.summary_readable.create({ data: { url, summary_readable: summaryReadable }})
  return newSummaryReadable
}