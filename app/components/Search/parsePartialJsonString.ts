import { Paragraph } from "@/app/types";

export function parsePartialJsonString(streamedJson: string): Paragraph[] {
    const stack: string[] = [];

    let buffer = "";
    let insideString = false;
    let escape = false;
    let lastCompletedIndex = 0;

    console.log('stream', streamedJson)

    for (let i = 0; i < streamedJson.length; i++) {
        const char = streamedJson[i];
        buffer += char;

        if (char === '"' && !escape) {
            insideString = !insideString;
        }

        if (!insideString) {
            if (char === '{' || char === '[') {
                stack.push(char);
            } else if (char === '}' || char === ']') {
                if (stack.length) {
                    const last = stack[stack.length - 1];
                    if ((char === '}' && last === '{') || (char === ']' && last === '[')) {
                        stack.pop();
                    }
                }
            }
        }

        escape = char === '\\' ? !escape : false;

        // Try parsing as soon as we have a new word (space or punctuation)
        if (!insideString && (char === ' ' || char === '.' || char === ',' || char === '!' || char === '?')) {
            try {
                const parsed = JSON.parse(buffer);
                if (parsed && typeof parsed === 'object' && Array.isArray(parsed.a)) {
                    lastCompletedIndex = i + 1; // Mark progress
                }
            } catch {
                continue; // JSON still incomplete
            }
        }
    }

    // Trim buffer to last successfully parsed point
    buffer = buffer.substring(0, lastCompletedIndex);

    // Ensure it's a valid JSON object, applying fixes if necessary
    if (!buffer.startsWith('{')) {
        buffer = '{"a":[]}';
    }

    if (!buffer.includes('"a":')) {
        buffer = buffer.replace('{', '{"a":[],');
    }

    if (!buffer.includes('"a":[')) {
        buffer = buffer.replace('"a":', '"a":["') + '"]';
    }

    const parsedJson: { a: { i: boolean; t: string }[][] } = JSON.parse(buffer || '{"a":[]}');
    console.log({parsedJson})

    return parsedJson.a.map((paragraph) => {
        const spans: { isImportant: boolean; text: string }[] = [];
        let currentSpan: { isImportant: boolean; text: string } | null = null;

        for (const span of paragraph) {
            if (!currentSpan) {
                currentSpan = { isImportant: span.i, text: span.t };
            } else {
                currentSpan.text += " " + span.t;
                if (span.i) {
                    currentSpan.isImportant = true; // Apply importance only when span is fully built
                }
            }

            // If span ends in a punctuation or space, consider it complete
            if (span.t.endsWith('.') || span.t.endsWith(',') || span.t.endsWith('!') || span.t.endsWith('?') || span.t.endsWith(' ')) {
                spans.push(currentSpan);
                currentSpan = null;
            }
        }

        if (currentSpan) {
            spans.push(currentSpan);
        }

        return spans;
    });
}