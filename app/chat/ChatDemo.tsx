"use client"

import { useState } from "react";
import { useStreamChat } from "./useStreamChat";

export default function ChatDemo() {
  const [topic, setTopic] = useState('')
  const { response, isLoading, isStreaming, startStreaming } = useStreamChat()

  return <div>
    <h1>Chat Demo</h1>
    <h2>Chat</h2>
    <p>
      <input value={topic} onChange={(ev) => setTopic(ev.target.value)} type="text" />
      <button onClick={() => startStreaming(topic)}>chat</button>
    </p>
    
    <h2>Reply</h2>
    <div>Loading?: {'' + isLoading}</div>
    <div>Streaming?: {'' + isStreaming}</div>
    <div>
      {response}
    </div>
  </div>
}