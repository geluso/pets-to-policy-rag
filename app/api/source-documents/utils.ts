import { z } from 'zod'

export const generateSourceDocumentJsonSchema = () => ({
    type: 'object',
    properties: {
        url: {type: 'string'},
        question: {type: 'string'},
        citation: {type: 'string'},
        relevantSubsections: {type: 'string'},
        relevantLanguage: {type: 'string'}
    },
    required: ['url', 'question', 'citation', 'relevantSubsections', 'relevantLanguage'],
    additionalProperties: false,
})

export const generateSourceDocumentZodSchema = () =>
    z.object({
        url: z.string(),
        question: z.string(),
        citation: z.string(),
        relevantSubsections: z.string(),
        relevantLanguage: z.string()
    })
