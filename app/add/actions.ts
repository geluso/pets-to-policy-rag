"use server"

import prisma from "@/lib/prisma";

export async function createDocument({url, title, text}: { url: string, title: string, text: string }) {
  return await prisma.document.create({ data: { url, title, text }})
}

export async function getAllDocs() {
  return await prisma.document.findMany()
}