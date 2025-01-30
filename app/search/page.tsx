import ClientWrapper from "./ClientWrapper";
import RagSearch from "./RAGSearch";

export default async function Search() {
  return <ClientWrapper>
    <RagSearch />
  </ClientWrapper>
}