/* eslint-disable @typescript-eslint/no-explicit-any */

'use server'

import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { ChunkCollection, CodeDomain, StateDomain } from '@/app/types'
import { generateSourceDocumentJsonSchema, generateSourceDocumentZodSchema } from './utils'
import { generateSourceDocumentPrompt } from '@/app/prompts/generateSourceDocumentPrompt'
import { generateOuterSystemPrompt } from '@/app/prompts/generateOuterSystemPrompt'

const openai = new OpenAI()


export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const query: string = json.query
        const stateDomain: StateDomain = json.stateDomain
        const codeDomain: CodeDomain = json.codeDomain
        const chunkCollection: ChunkCollection = json.chunkCollection
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {role: 'system', content: generateOuterSystemPrompt(codeDomain)},
                {role: 'user', content: generateSourceDocumentPrompt(stateDomain, codeDomain, query, chunkCollection)}
            ],
            response_format: {type: 'json_object'},
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'generate_source_document',
                        description: 'Returns a source document',
                        parameters: generateSourceDocumentJsonSchema(),
                    },
                },
            ],
            tool_choice: {type: 'function', function: {name: 'generate_source_document'}},
        })

        const toolCalls = response.choices[0]?.message?.tool_calls
        if (!toolCalls || toolCalls.length === 0) {
            throw {code: 'no_tool_calls', error: 'OpenAI did not return any tool calls'}
        }

        const parsedResponse = JSON.parse(toolCalls[0].function.arguments)
        const validatedResponse = generateSourceDocumentZodSchema().parse(parsedResponse)
        const hydratedResponse = {...validatedResponse, url: chunkCollection.chunks[0].url}

        return NextResponse.json(hydratedResponse)
    } catch (error) {
        console.error('POST /api/source-documents Error:', error)
        let code = "error"
        if (error instanceof Error && 'code' in error) {
            code = (error as any).code
        }
        return NextResponse.json({error: 'Failed to generate source document', code}, {status: 500})
    }
}
