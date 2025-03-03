import { z } from 'zod'

export const generateRelevantChunksZodSchema = () =>
    z.object({
        chunks: z.array(
            z.object({
                url: z.string(),
                text: z.string(),
                chunk_index: z.number(),
            })
        )
    })

export const generateRelevantChunksJsonSchema = () => ({
    type: 'object',
    properties: {
        chunks: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    url: { type: 'string' },
                    text: { type: 'string' },
                    chunk_index: { type: 'integer' }
                },
                required: ['url', 'text', 'chunk_index'],
                additionalProperties: false
            }
        }
    },
    required: ['chunks'],
    additionalProperties: false,
})
