import { z } from 'zod'

export const generateSourceDocumentJsonSchema = () => ({
    type: 'object',
    properties: {
        citation: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                chapter: { type: 'string' },
                section: { type: 'string' },
            },
            required: ['title', 'chapter', 'section']
        },
        relevantKeywords: {
            type: 'array',
            items: { type: 'string' }
        },
        relevantSubsections: {
            type: 'array',
            items: { type: 'string' }
        },
        relevantLanguage: { type: 'string' }
    },
    required: ['citation', 'relevantKeywords', 'relevantSubsections', 'relevantLanguage'],
    additionalProperties: false,
})

export const generateSourceDocumentZodSchema = () =>
    z.object({
        citation: z.object({
            title: z.string(),
            chapter: z.string(),
            section: z.string(),
        }),
        relevantKeywords: z.array(z.string()),
        relevantSubsections: z.array(z.string()),
        relevantLanguage: z.string(),
    })
