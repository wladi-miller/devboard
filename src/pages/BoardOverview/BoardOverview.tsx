import { Button } from "../../components/ui/button"
import BoardCard from "./components/BoardCard"

export default function BoardOverview() {
  return (
    <div className="container">
      <div className="flex flex-row place-content-between bg-red-50 py-4">
        <h1 className="text-xl font-bold">Meine Boards</h1>
        <Button>Neues Board</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 bg-red-300 pt-4">
        <BoardCard />
      </div>
    </div>
  )
}
