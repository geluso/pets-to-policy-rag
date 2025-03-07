import { SearchStatus } from '@/app/types'
import useEllipsis from './useEllipses'

interface Props {
    searchStatus: SearchStatus
}

export default function SearchStatusLoader({searchStatus}: Props) {
    const ellipsis = useEllipsis(500)

    if (searchStatus === SearchStatus.DEFAULT) {
        return null
    }

    return (
        <div className="p-2 text-white text-sm font-medium">
            {searchStatus}{ellipsis}
        </div>
    )
}
