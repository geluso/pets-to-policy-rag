"use server"

import prisma from "@/lib/prisma";

export async function createDocument({url, title, text}: { url: string, title: string, text: string }) {
  const vector = await fetch('https://4cb3-2601-602-8b82-92b0-64d0-4b7b-a51a-85fb.ngrok-free.app/embed/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text })
  }).then(res => res.json())

  console.log('vector:', vector)

  const doc = await prisma.document.create({ data: { url, title, text, embedding: vector.embedding }})
  return doc
}

export async function getAllDocs() {
  return await prisma.document.findMany()
}