'use client'

import SmartSummary from './SmartSummary'
import useSearch from './useSearch/useSearch'
import SourceDocuments from './SourceDocuments/SourceDocuments'
import Header from './Header'
import { CodeDomain, SearchStatus, StateDomain } from '@/app/types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import Hero from './Hero/Hero'
import Query from './Query/Query'
import Footer from './Footer'
import { stateAbbreviationDictionary } from './utils/stateAbbreviationDictionary'
import pdfFilename from './utils/pdfFilename'

interface Props {
    codeDomain: CodeDomain
    stateDomain: StateDomain
}

export default function Search({codeDomain, stateDomain}: Props) {
    const [isPrinting, setIsPrinting] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const promiseResolveRef: any = useRef(null)
    const {
        search,
        searchStatus,
        smartSummary,
        sourceDocuments,
    } = useSearch(codeDomain, stateDomain)

    // We watch for the state to change here, and for the Promise resolve to be available
    useEffect(() => {
        if (isPrinting && promiseResolveRef.current) {
        // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
        promiseResolveRef.current();
        }
    }, [isPrinting]);

    const generatePDF = useReactToPrint({
        contentRef,
        documentTitle: pdfFilename(stateDomain, codeDomain),
        onBeforePrint: () => {
            return new Promise((resolve) => {
                promiseResolveRef.current = resolve;
                setIsPrinting(true);
            });
        },
        onAfterPrint: () => {
            promiseResolveRef.current = null;
            setIsPrinting(false);
        }
    })
    const hasFinishedGenerating = !!(searchStatus === SearchStatus.DEFAULT && smartSummary.length && sourceDocuments.length)

    const handlePdfClick = () => {
        generatePDF()
    }

    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <Hero />
            <div className="w-full flex flex-col" ref={contentRef}>
                <Query
                    onSubmit={search}
                    onPdfClick={handlePdfClick}
                    searchStatus={searchStatus}
                    codeDomain={codeDomain}
                    stateDomain={stateDomain}
                    hasFinishedGenerating={hasFinishedGenerating}
                />
                <div className="w-full flex flex-col gap-4">
                    <SmartSummary smartSummary={smartSummary} />
                    <SourceDocuments
                        stateDomain={stateDomain}
                        codeDomain={codeDomain}
                        sourceDocuments={sourceDocuments}
                    />
                </div>
            </div>
            <Footer />
        </div>
    )
}
