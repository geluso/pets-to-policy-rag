import Admin from "./components/admin/Admin";
import Search from "./components/Search/Search";
import ClientWrapper from "./HOC/ClientWrapper";


export default async function SearchPage() {
  return (
     <ClientWrapper>
      <Search />
    </ClientWrapper>
  )
}
