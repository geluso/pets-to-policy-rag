'use server'

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { SimilarChunk } from '@/app/types'
import { generateRelevantChunksJsonSchema, generateRelevantChunksZodSchema } from './utils'
import { generateOuterSystemPrompt } from '@/app/prompts/generateOuterSystemPrompt'
import { generateRelevantChunksPrompt } from '@/app/prompts/generateRelevantChunksPrompt'

const openai = new OpenAI()

const RELEVANT_CHUNK_COUNT = 2

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const query: string = json.query
        const chunks: SimilarChunk[] = json.chunks

        return NextResponse.json(chunks)

        // if (chunks.length <= RELEVANT_CHUNK_COUNT) {
        //     return NextResponse.json(chunks)
        // }

        // const response = await openai.chat.completions.create({
        //     model: 'gpt-4o',
        //     messages: [
        //         {role: 'system', content: generateOuterSystemPrompt()},
        //         {role: 'user', content: generateRelevantChunksPrompt(query, chunks, RELEVANT_CHUNK_COUNT)},
        //     ],
        //     response_format: {type: 'json_object'},
        //     tools: [
        //         {
        //             type: 'function',
        //             function: {
        //                 name: 'select_relevant_chunks',
        //                 description: 'Returns the most relevant chunks based on the query.',
        //                 parameters: generateRelevantChunksJsonSchema(),
        //             },
        //         },
        //     ],
        //     tool_choice: {type: 'function', function: {name: 'select_relevant_chunks'}},
        // })

        // const toolCalls = response.choices[0]?.message?.tool_calls
        // if (!toolCalls || toolCalls.length === 0) {
        //     throw new Error('OpenAI did not return any tool calls')
        // }

        // const parsedResponse = JSON.parse(toolCalls[0].function.arguments)
        // const validatedResponse = generateRelevantChunksZodSchema().parse(parsedResponse).chunks

        // return NextResponse.json(validatedResponse)
    } catch (error) {
        console.error('POST /api/relevant-chunks Error:', error)

        return NextResponse.json({error: 'Failed to generate relevant chunks'}, {status: 500})
    }
}
