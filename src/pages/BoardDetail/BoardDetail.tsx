import { Button } from "../../components/ui/button"
import { useReducer } from "react"
import { useBoardDetailReducer } from "@/hooks/boardsDetailReducer"
import BoardColumn from "./components/BoardColumn"
import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { getBoardById } from "@/lib/api"
import type { Task } from "@/types/bord.types"

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>()
  const [isEditName, setIsEditName] = useState(false)
  const [boardName, setBoardName] = useState("Name des Boards")
  const boardFromStorage = getBoardById(id ?? "") ?? {
    id: "",
    title: "",
    tasks: [],
  }
  const [board, dispatchBoard] = useReducer(
    useBoardDetailReducer,
    boardFromStorage
  )

  function handleAddTask(task: Task) {
    dispatchBoard({ type: "ADD_TASK", data: task })
  }

  function handleEditBoardTitle() {
    setIsEditName(true)
    setBoardName(board.title)
  }

  function handleSubmitBoardTitle() {
    dispatchBoard({ type: "UPDATE_BOARD_NAME", data: boardName })
    setIsEditName(false)
  }

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
            onClick={handleSubmitBoardTitle}
          >
            <Check />
          </Button>
          <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => {
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
          <h1 className="text-2xl font-bold">{board.title}</h1>
          <Button variant="ghost" size="icon-lg" onClick={handleEditBoardTitle}>
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
          onAddTask={handleAddTask}
        />
        <BoardColumn
          title="Progress"
          tasks={board.tasks.filter((task) => task.column === "Progress")}
          onAddTask={handleAddTask}
        />
        <BoardColumn
          title="Done"
          tasks={board.tasks.filter((task) => task.column === "Done")}
          onAddTask={handleAddTask}
        />
      </div>
    </div>
  )
}
