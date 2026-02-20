import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useQueryState } from "nuqs"
import { Results } from "./components/results"

function App() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" })
  return (
    <main className="h-screen flex flex-col">
      <Results search={search} className="flex-1" />
      <Separator />
      <div className="p-4">
        <Input
          placeholder="Pesquisar na Bíblia (ex: sl 119, jo 3 16, jo 3 16-18)"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>
    </main>
  )
}

export default App
