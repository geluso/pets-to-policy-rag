import { CodeDomain, SourceDocument, StateDomain } from '@/app/types'
import { Props as CardProps } from '../Card'
import { mapUrlToChapterAndTitle } from './mapUrlToTitleAndChapter'
import { capitalizeWords } from '@/app/utils'
import { stateAbbreviationDictionary } from '../../utils/stateAbbreviationDictionary'

export const reduceSourceDocumentsToUniqueCards = (
    stateDomain: StateDomain,
    codeDomain: CodeDomain,
    sourceDocuments: SourceDocument[],
) => sourceDocuments.reduce((acc: CardProps[], {
    section,
    url,
    ...rest
}: SourceDocument): CardProps[] => {
    const {title, chapter} = mapUrlToChapterAndTitle(stateDomain, url)
    const citation = `${stateAbbreviationDictionary[stateDomain]} ${capitalizeWords(codeDomain)} Code §${title}.${chapter}.${section}`

    if (acc.find(({citation: storedCitation}) => citation === storedCitation)) {
        return acc
    }

    return acc.concat({citation, url, ...rest})
}, [])
