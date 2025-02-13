import { Source } from "@/app/types";

interface Props {
    sources: Source[]
    isSearching: boolean
}

export default function Sources({sources, isSearching}: Props) {
  return (
    <div className="flex flex-col gap-1">
      {sources.map((source, index) => (
        <div key={`source-${index}`}>{source.title}</div>
      ))}
    </div>
  )
}