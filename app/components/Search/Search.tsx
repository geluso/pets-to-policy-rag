'use client'

import SmartSummary from './SmartSummary/SmartSummary'
import useSearch from './useSearch/useSearch'
import SourceDocuments from './SourceDocuments/SourceDocuments'
import SearchInput from './SearchInput/SearchInput'
import Header from './Header/Header'
import SearchStatusLoader from './SearchStatusLoader/SearchStatusLoader'
import { CodeDomain, SearchStatus, StateDomain } from '@/app/types'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Link from 'next/link'

interface Props {
    codeDomain: CodeDomain
    stateDomain: StateDomain
}

export default function Search({codeDomain, stateDomain}: Props) {
    const contentRef = useRef<HTMLDivElement>(null)
    const {
        search,
        searchStatus,
        smartSummary,
        sourceDocuments,
    } = useSearch(codeDomain, stateDomain)
    const generatePDF = useReactToPrint({contentRef})
    const hasFinishedGenerating = searchStatus === SearchStatus.DEFAULT && smartSummary.length && sourceDocuments.length

    return (
        <div className="bg-gray-300 flex flex-col w-full h-full items-center">
            <Header codeDomain={codeDomain} stateDomain={stateDomain} />
            <div className="flex h-full w-4/5 max-w-[1000px] bg-white border-t-0 border-b-0 border-x-1 border-solid border-black overflow-auto">
                <div className="w-full flex flex-col justify-between">
                    <div className="p-2 flex flex-col gap-5">
                        <div>
                            <Link href="/texas-labor">Texas Labor Code</Link>
                            {' '}| {' '}
                            <Link href="/texas-education">Texas Education Code</Link>
                            {' '}| {' '}
                            <Link href="/south-carolina-labor">South Carolina Labor Code</Link>
                        </div>
                        <SearchInput
                            handleSubmit={search}
                            searchStatus={searchStatus}
                            codeDomain={codeDomain}
                            stateDomain={stateDomain}
                        />
                        {hasFinishedGenerating ? (
                            <button onClick={() => generatePDF()} className="bg-blue-500 text-white">Download PDF</button>
                        ) : null}
                        <div className="flex flex-col w-full h-full gap-4" ref={contentRef}>
                            <SmartSummary smartSummary={smartSummary} />
                            <SourceDocuments
                                stateDomain={stateDomain}
                                codeDomain={codeDomain}
                                sourceDocuments={sourceDocuments}
                            />
                        </div>
                    </div>
                    <SearchStatusLoader searchStatus={searchStatus} />
                </div>
            </div>
        </div>
    )
}
