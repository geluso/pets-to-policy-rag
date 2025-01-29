export default function Search({ searchParams }: { searchParams: { q: string  } }) {
  return <div>
    <h1>Search</h1>
    <form>
      <input type="text" name="q" />
      <button type="submit">Search</button>
    </form>

    <h2>Results for {searchParams.q}</h2>
  </div>
}