import { Button } from "../../components/ui/button"
import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"

export default function BoardDetail() {
  const [isEditName, setIsEditName] = useState(false)
  const [boardName, setBoardName] = useState("Name des Boards")

  function RenderBoardDetail() {
    if (isEditName) {
      return (
        <div className="flex flex-row items-center gap-2">
          <Input
            value={boardName}
            className="w-96"
            onChange={(e) => setBoardName(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setIsEditName(false)}
          >
            <Check />
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setIsEditName(false)}
          >
            <X />
          </Button>
        </div>
      )
    } else {
      return (
        <div className="flex flex-row items-center gap-2">
          <h1 className="text-2xl font-bold">{boardName}</h1>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => setIsEditName(true)}
          >
            <Pencil className="h-5 w-5" />
          </Button>
        </div>
      )
    }
  }
  return (
    <div className="container">
      <div className="flex flex-row items-center gap-2">
        <Link to="/boards">
          <Button variant="ghost" size="icon-lg">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        {RenderBoardDetail()}
      </div>
    </div>
  )
}
