'use client'

import SmartSummary from './SmartSummary/SmartSummary'
import useSearch from './useSearch/useSearch'
import SourceDocuments from './SourceDocuments/SourceDocuments'
import SearchInput from './SearchInput/SearchInput'
import Header from './Header/Header'
import SearchStatusLoader from './SearchStatusLoader/SearchStatusLoader'

export default function Search() {
    const {
        search,
        searchStatus,
        smartSummary,
        sourceDocuments,
    } = useSearch()

    return (
        <div className="bg-gray-300 flex flex-col w-full h-full items-center">
            <Header />
            <div className="h-full w-4/5 bg-white border-t-0 border-b-0 border-x-1 border-solid border-black overflow-auto">
                <div className="p-2 flex flex-col gap-5">
                    <SearchInput handleSubmit={search} searchStatus={searchStatus} />
                    <div className="flex flex-col w-full h-full gap-4">
                        <SmartSummary smartSummary={smartSummary} />
                        <SearchStatusLoader searchStatus={searchStatus} />
                        <SourceDocuments sourceDocuments={sourceDocuments} />
                    </div>
                </div>
            </div>
        </div>
    )
}
