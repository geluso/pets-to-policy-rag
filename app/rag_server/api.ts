"use server"

const URL_BASE = "https://4cb3-2601-602-8b82-92b0-64d0-4b7b-a51a-85fb.ngrok-free.app"
const URL_ADD_DOCUMENT = URL_BASE + "/add_document/"
const URL_SEARCH = URL_BASE + "/search/"

export async function addDocumenmt(title: string, url: string, text: string) {
    console.log(title, url, text)
    return fetch(URL_ADD_DOCUMENT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, url, text})
    }).then(res => res.json())
}

export type DocumentPayload = {
    title: string
    url: string
    text: string
}

export type SearchResult = {
    score: number,
    doc: DocumentPayload
}

export async function search(query: string): Promise<SearchResult[]> {
    console.log(query)
    return fetch(URL_SEARCH + "?q=" + query).then(res => res.json())
}