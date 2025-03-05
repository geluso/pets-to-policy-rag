'use server'

import { generateOuterSystemPrompt } from '@/app/constants/prompts/generateOuterSystemPrompt'
import { generateQueryPrompt } from '@/app/constants/prompts/generateQueryPrompt'
import OpenAI from 'openai'

const openai = new OpenAI()

export async function preprocessQuery(query: string): Promise<string> {
    const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
            {role: 'system', content: generateOuterSystemPrompt()},
            {role: 'user', content: generateQueryPrompt(query)},
        ],
    })

    return completion.choices[0].message.content ?? ''
}
