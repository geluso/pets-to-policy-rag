"use client"

import { useEffect, useState } from "react"
import { setPromptConfiguration } from "../../admin/actions"
import { usePromptConfiguration } from "./usePromptConfiguration"

export default function Admin() {
    const { isLoading: isLoadingPromptConfiguration, config } = usePromptConfiguration()
    const [systemMessage, setSystemMessage] = useState('')
    const [documentMessage, setDocumentMessage] = useState('')
    const [humanMessage, setHumanMessage] = useState('')

    useEffect(() => {
        setSystemMessage(config?.system_message ?? '')
        setDocumentMessage(config?.document_message ?? '')
        setHumanMessage(config?.human_message ?? '')
    }, [config])

    const handleSystemMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSystemMessage(e.target.value)
    }

    const handleDocumentMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDocumentMessage(e.target.value) 
    }

    const handleHumanMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setHumanMessage(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        const promptConfig = {
            id: "-1", // Using a static ID since we only have one config
            system_message: systemMessage,
            document_message: documentMessage,
            human_message: humanMessage
        }
        console.log(promptConfig)
        setPromptConfiguration(promptConfig)
    }

    return <div>
        <h1>Admin</h1>
        {isLoadingPromptConfiguration && <p>Loading...</p>}
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h2>System Message:</h2>
                    <p>Use $query to refer to the user query.</p>
                    <textarea value={systemMessage} onChange={handleSystemMessageChange} rows={8} cols={80} />
                </div>

                <div>
                    <h2>Document Message:</h2>
                    <p>Use $text and $score to refer to the score and text for each document.</p>
                    <textarea value={documentMessage} onChange={handleDocumentMessageChange} rows={8} cols={80} />
                </div>

                <div>
                    <h2>Human Message:</h2>
                    <textarea value={humanMessage} onChange={handleHumanMessageChange} rows={8} cols={80} />
                </div>

                <div>
                    <input type="submit" value="Save" />
                </div>
            </form>
        </div>
    </div>
}