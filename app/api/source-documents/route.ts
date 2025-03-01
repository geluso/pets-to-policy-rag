'use server'

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ChunkCollection, SourceDocument } from '@/app/types'
import { generateSourceDocumentPrompt } from '@/app/prompts'
import { z } from 'zod'

const openai = new OpenAI()

const SourceDocumentSchema = z.object({
    url: z.string(),
    question: z.string(),
    citation: z.string(),
    relevantSubsections: z.string(),
    relevantLanguage: z.string()
})

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const query: string = json.query
        const chunkCollection: ChunkCollection = json.chunkCollection

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {role: 'system', content: 'You are an AI trained to generate structured JSON responses.'},
                {role: 'user', content: generateSourceDocumentPrompt(query, chunkCollection)}
            ],
            response_format: {type: 'json_object'},
        })

        const textResponse = response.choices[0]?.message?.content
        if (!textResponse) {
            throw new Error('Invalid response from OpenAI')
        }

        // Validate the response with Zod
        const parsedResponse: SourceDocument = SourceDocumentSchema.parse(JSON.parse(textResponse))

        return NextResponse.json(parsedResponse)
    } catch (error) {
        console.error('POST /api/source-documents Error:', error)
        return NextResponse.json({error: 'Failed to generate source documents'}, {status: 500})
    }
}
