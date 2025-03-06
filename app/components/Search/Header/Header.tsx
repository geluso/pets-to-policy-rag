"use client"

import { CodeDomain, StateDomain } from "@/app/types"
import { capitalizeWords } from "@/app/utils"

interface Props {
    stateDomain: StateDomain
    codeDomain: CodeDomain
}

export default function Header({codeDomain, stateDomain}: Props) {
    return (
        <div className="flex w-full bg-blue-500 border-solid border-t-0 border-l-0 border-r-0 border-gray-500">
            <h1 className="m-0 p-4 text-white">
                PETs to Policy: {capitalizeWords(stateDomain)} {capitalizeWords(codeDomain)} Code
            </h1>
        </div>
    )
}
