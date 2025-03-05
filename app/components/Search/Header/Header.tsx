"use client"

import { CodeDomain } from "@/app/types"

export default function Header({ codeDomain }: { codeDomain: CodeDomain }) {
    let codeDomainDescription = "Texas Labor Code"
    if (codeDomain == CodeDomain.EDUCATION) {
        codeDomainDescription = "Texas Education Code"
    }
    return (
        <div className="flex w-full bg-blue-500 border-solid border-t-0 border-l-0 border-r-0 border-gray-500">
            <h1 className="m-0 p-4 text-white">
                PETs to Policy: {codeDomainDescription}
            </h1>
        </div>
    )
}