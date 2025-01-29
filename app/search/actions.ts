"use server"

import prisma from "@/lib/prisma"

export async function getResults(text: string) {
  return await prisma.document.findMany({
    where: {
      OR: [
        { title: { contains: text } },
        { text: { contains: text } }
      ]
    }
  })
}