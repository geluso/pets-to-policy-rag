'use server'

import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { SourceDocument } from '@/app/types'
import { generateOuterSystemPrompt } from '@/app/prompts/generateOuterSystemPrompt'
import { generateSmartSummaryPrompt } from '@/app/prompts/generateSmartSummaryPrompt'

const openai = new OpenAI()

export async function POST(req: NextRequest) {
    try {
        const json = await req.json()
        const query: string = json.query
        const sourceDocuments: SourceDocument[] = json.sourceDocuments
        const encoder = new TextEncoder()
        const readableStream = new ReadableStream({
            async start(controller) {
                try {
                    const stream = openai.beta.chat.completions.stream({
                        model: 'gpt-4o',
                        messages: [
                            {role: 'system', content: generateOuterSystemPrompt()},
                            {role: 'user', content: generateSmartSummaryPrompt(query, sourceDocuments)},
                        ]
                    })
                    .on('refusal.done', () => console.log('request refused'))
                    .on('content.delta', ({delta}) => {
                        if (delta) {
                            controller.enqueue(encoder.encode(delta))
                        }
                    })
                    .on('content.done', () => {
                        console.log('Stream done')
                        controller.close()
                    })

                    await stream.done()
                } catch (error) {
                    console.error('OpenAI Streaming Error:', error)
                    controller.close()
                }
            }
        })

        return new Response(readableStream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        })
    } catch (error) {
        console.error('POST /api/smart-summaries Error:', error)

        return new Response('Internal Server Error', {status: 500})
    }
}
