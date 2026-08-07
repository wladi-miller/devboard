import { Button } from "../../components/ui/button"
import type { Board } from "../../types/bord.types"
import BoardColumn from "./components/BoardColumn"
import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Input } from "../../components/ui/input"

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>()
  const [isEditName, setIsEditName] = useState(false)
  const [boardName, setBoardName] = useState(() => {
    return localStorage.getItem("boardName") || "Name des Boards"
  })
  const [tempBoardName, setTempBoardName] = useState(boardName)

  const [board, setBoard] = useState<Board>({
    id: "1",
    title: "Test",
    tasks: [
      {
        id: "1",
        title: "Abc",
        column: "Progress",
        description: "Beschreibung",
      },
    ],
  })

  function RenderBoardDetail() {
    if (isEditName) {
      return (
        <div className="flex flex-row items-center gap-2">
          <Input
            value={tempBoardName}
            className="w-96"
            onChange={(e) => setTempBoardName(e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => {
              setBoardName(tempBoardName)
              localStorage.setItem("boardName", tempBoardName)
              setIsEditName(false)
            }}
          >
            <Check />
          </Button>
          <Button
            variant="ghost"
            size="icon-xl"
            onClick={() => {
              setTempBoardName(boardName)
              setIsEditName(false)
            }}
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
            <Pencil className="size-4" />
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
            <ArrowLeft className="size-5" />
          </Button>
        </Link>
        {RenderBoardDetail()}
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        <BoardColumn
          title="ToDo"
          tasks={board.tasks.filter((task) => task.column === "ToDo")}
        />
        <BoardColumn
          title="Progress"
          tasks={board.tasks.filter((task) => task.column === "Progress")}
        />
        <BoardColumn
          title="Done"
          tasks={board.tasks.filter((task) => task.column === "Done")}
        />
      </div>
    </div>
  )
}
