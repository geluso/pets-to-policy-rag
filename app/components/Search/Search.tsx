'use client'

import SmartSummary from './SmartSummary'
import useSearch from './useSearch/useSearch'
import SourceDocuments from './SourceDocuments/SourceDocuments'
import Header from './Header'
import { CodeDomain, SearchStatus, StateDomain } from '@/app/types'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Hero from './Hero/Hero'
import Query from './Query/Query'
import Footer from './Footer'

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
    const hasFinishedGenerating = !!(searchStatus === SearchStatus.DEFAULT && smartSummary.length && sourceDocuments.length)

    const handlePdfClick = () => {
        generatePDF()
    }

    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <Hero />
            <Query
                onSubmit={search}
                onPdfClick={handlePdfClick}
                searchStatus={searchStatus}
                codeDomain={codeDomain}
                stateDomain={stateDomain}
                hasFinishedGenerating={hasFinishedGenerating}
            />
            <div className="w-full flex flex-col gap-4" ref={contentRef}>
                <SmartSummary smartSummary={smartSummary} />
                <SourceDocuments
                    stateDomain={stateDomain}
                    codeDomain={codeDomain}
                    sourceDocuments={sourceDocuments}
                />
            </div>
            <Footer />
        </div>
    )
}
