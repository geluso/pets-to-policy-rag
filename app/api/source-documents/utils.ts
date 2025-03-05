import { z } from 'zod'

export const generateSourceDocumentJsonSchema = () => ({
    type: 'object',
    properties: {
        citation: {type: 'string'},
        relevantSubsections: {type: 'string'},
        relevantKeywords: {type: 'string'},
        relevantLanguage: {type: 'string'},
    },
    required: ['citation', 'relevantSubsections', 'relevantKeywords', 'relevantLanguage'],
    additionalProperties: false,
})

export const generateSourceDocumentZodSchema = () =>
    z.object({
        citation: z.string(),
        relevantSubsections: z.string(),
        relevantKeywords: z.string(),
        relevantLanguage: z.string(),
    })
