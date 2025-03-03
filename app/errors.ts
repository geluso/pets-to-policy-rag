export const errorUnknown = { code: 'unknown', message: "Something went wrong." }
export const errorFailedFetchingSourceDocs = { code: 'failed_fetching_source_docs', message: 'Failed to fetch source documents' }
export const errorRateLimitExceeded = { code: 'rate_limit_exceeded', message: "OpenAI rate limit reached. Wait one minute and try again." }
export const errorNoToolCalls = { code: 'no_tool_calls', message: "OpenAI failed parsing JSON." }
export const errorSourceDocValidationFailed = { code: 'source_doc_validation_failed', message: 'Source document validation failed.'}

export const errorCodes = [
  errorUnknown,
  errorFailedFetchingSourceDocs,
  errorRateLimitExceeded,
  errorNoToolCalls,
  errorSourceDocValidationFailed
]
export const errorCodeToMessageLookup: Record<string, string> = {}
errorCodes.forEach(code => errorCodeToMessageLookup[code.code] = code.message)

export function errorCodeToMessage(error: any) {
  try {
    return errorCodeToMessageLookup[error.code]
  } catch (e) {
    return errorUnknown.message
  }
}
