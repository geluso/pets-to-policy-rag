"use client"

import { useState } from "react";
import { chat } from "./actions";

export default function ChatDemo() {
  const [topic, setTopic] = useState('')
  const [response, setResponse] = useState('')

  const handleClick = async () => {
    const reply = await chat(topic)
    setResponse(reply)
    console.log({ reply })
  }

  return <div>
    <h1>Chat Demo</h1>
    <h2>Chat</h2>
    <p>
      <input value={topic} onChange={(ev) => setTopic(ev.target.value)} type="text" />
      <button onClick={handleClick}>chat</button>
    </p>
    
    <h2>Reply</h2>
    <div>
      {response}
    </div>
  </div>
}