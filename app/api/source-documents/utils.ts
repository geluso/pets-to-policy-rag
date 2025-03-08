import { z } from 'zod'

export const generateSourceDocumentJsonSchema = () => ({
    type: 'object',
    properties: {
        relevantKeywords: {
            type: 'array',
            items: {type: 'string'},
        },
        relevantSubsections: {
            type: 'array',
            items: {type: 'string'},
        },
        relevantLanguage: {type: 'string'},
        section: {type: 'string'},
    },
    required: ['relevantKeywords', 'relevantSubsections', 'relevantLanguage', 'section'],
    additionalProperties: false,
})

export const generateSourceDocumentZodSchema = () =>
    z.object({
        relevantKeywords: z.array(z.string()),
        relevantSubsections: z.array(z.string()),
        relevantLanguage: z.string(),
        section: z.string(),
    })
