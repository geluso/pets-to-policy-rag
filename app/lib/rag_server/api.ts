"use server"

import { SearchResult } from "../../types"
import { preprocessQuery } from "./preprocessQuery"

const LOCAL_URL_BASE = "http://localhost:8080"
const NGROK_URL_BASE = "https://4cb3-2601-602-8b82-92b0-64d0-4b7b-a51a-85fb.ngrok-free.app"
const URL_BASE = NGROK_URL_BASE
const URL_ADD_DOCUMENT = URL_BASE + "/add_document/"
const URL_SEARCH = URL_BASE + "/search/"

export async function addDocument(title: string, url: string, text: string) {
    return fetch(URL_ADD_DOCUMENT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({title, url, text})
    }).then(res => res.json())
}

export async function getSearchResults(query: string): Promise<SearchResult[]> {
    const embeddedQuery = await preprocessQuery(query)
    console.log('getSearchResults', {query, embeddedQuery})
    const response = await fetch(URL_SEARCH + "?q=" + embeddedQuery).then(res => res.text())
    console.log({ response })
    const searchResults = await fetch(URL_SEARCH + "?q=" + embeddedQuery).then(res => res.json())
    console.log({ searchResults })
    console.log("first result", searchResults[0].doc)
    return searchResults
}