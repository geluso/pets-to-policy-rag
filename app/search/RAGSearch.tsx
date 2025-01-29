"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function RagSearch() {
  const searchParams = useSearchParams()
  const [q, setQ ] = useState(searchParams.get('q') ?? '')
  return <div>
    <h1>PETs to Policy RAG</h1>

    <h2>Question</h2>
    <form>
      <input value={q} onChange={(e) => setQ(e.target.value)} size={80} type="text" name="q" />
      <button type="submit">Submit</button>
    </form>

    <p>Searching for {q}</p>

    <h2>Answer</h2>
    <p>LLM gibberish</p>

    <h2>Sources</h2>
    <ul>
      <li>Public schools means the common schools as referred to in Article IX of the state Constitution, charter schools established under chapter 28A.710 RCW, and those schools and institutions of learning having a curriculum below the college or university level as now or may be established by law and maintained at public expense.</li>
      <li>"Common schools" means schools maintained at public expense in each school district and carrying on a program from kindergarten through the twelfth grade or any part thereof including vocational educational courses otherwise permitted by law.</li>
      <li>
        (1) All of the state legal holidays set forth in RCW 1.16.050(1) are also school holidays and school may not be taught on these days.
        (2) No reduction from a teacher's time or salary may be made by reason of the fact that a school day happens to be one of the days referred to in this section as a day on which school is not taught.
      </li>
    </ul>
  </div>
}