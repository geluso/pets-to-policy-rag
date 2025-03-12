import { CodeDomain, StateDomain } from "@/app/types";
import { stateAbbreviationDictionary } from "./stateAbbreviationDictionary";

export default function pdfFilename(stateDomain: StateDomain, codeDomain: CodeDomain) {
  const stateAbbreviation = stateAbbreviationDictionary[stateDomain]
  const stateCodeAbbreviation = stateAbbreviation + codeDomain.charAt(0).toUpperCase()
  const now = new Date()
  const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}-${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}`
  const filename = `P2P_${stateCodeAbbreviation}_${timestamp}`
  return filename
}