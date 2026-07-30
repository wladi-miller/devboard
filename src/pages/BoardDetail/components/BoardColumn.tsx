import { Button } from "../../../components/ui/button"
import { Plus } from "lucide-react"

export default function BoardColumn({ tittle }: { tittle: string }) {
  return (
    <div className="rounded-lg border border-black bg-gray-50">
      <div className="flex items-center justify-between border-b border-black p-4">
        <h3 className="font-bold">{tittle}</h3>
        <Button variant="ghost" size="icon-lg" className="hover:bg-sky-300/50">
          <Plus />
        </Button>
      </div>
      <div className="p-4">Inhalt</div>
    </div>
  )
}
