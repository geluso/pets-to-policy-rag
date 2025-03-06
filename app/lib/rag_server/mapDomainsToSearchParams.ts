import { CodeDomain, StateDomain } from "../../types"

export const mapDomainsToSearchParams = (stateDomain: StateDomain, codeDomain: CodeDomain): string => ({
    [StateDomain.SOUTH_CAROLINA]: {
        [CodeDomain.EDUCATION]: '',
        [CodeDomain.LABOR]: '&dataset=sc-labor',
    },
    [StateDomain.TEXAS]: {
        [CodeDomain.EDUCATION]: '&dataset=tx-education',
        [CodeDomain.LABOR]: '',
    },
})[stateDomain][codeDomain]
