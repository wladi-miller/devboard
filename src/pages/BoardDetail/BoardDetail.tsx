import { Button } from "../../components/ui/button"
import { useReducer, useState } from "react"
import { useBoardDetailReducer } from "@/hooks/boardsDetailReducer"
import BoardColumn from "./components/BoardColumn"
import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { getBoardById } from "@/lib/api"
import type { Task } from "@/types/bord.types"
import TaskDialog from "./components/TaskDialog"

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>()
  const [isEditName, setIsEditName] = useState(false)
  const [boardName, setBoardName] = useState("Name des Boards")

  const boardFromStorage = getBoardById(id ?? "") ?? {
    id: "",
    title: "",
    tasks: [],
  }

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>()

  const [board, dispatchBoard] = useReducer(
    useBoardDetailReducer,
    boardFromStorage
  )

  function handleAddTask(task: Task) {
    dispatchBoard({ type: "ADD_TASK", data: task })
  }

  function handleDeleteTask(task: Task) {
    dispatchBoard({ type: "DELETE_TASK", data: task })
  }

  function handleSubmitTaskUpdate(task: Task) {
    dispatchBoard({ type: "UPDATE_TASK", data: task })
    setIsEditTaskDialogOpen(false)
  }

  function handleEditBoardTitle() {
    setIsEditName(true)
    setBoardName(board.title)
  }

  function handleSubmitBoardTitle() {
    dispatchBoard({ type: "UPDATE_BOARD_NAME", data: boardName })
    setIsEditName(false)
  }

  function handleEditTask(task: Task) {
    setEditTask(task)
    setIsEditTaskDialogOpen(true)
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
            onClick={() => setIsEditName(false)}
          >
            <X />
          </Button>
        </div>
      )
    }

    return (
      <div className="flex flex-row items-center gap-2">
        <h1 className="text-2xl font-bold">{board.title}</h1>
        <Button variant="ghost" size="icon-lg" onClick={handleEditBoardTitle}>
          <Pencil className="size-4" />
        </Button>
      </div>
    )
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

      <TaskDialog
        key={editTask?.id ?? "empty-0"}
        open={isEditTaskDialogOpen}
        handleOpenChange={setIsEditTaskDialogOpen}
        onSubmitUpdate={handleSubmitTaskUpdate}
        title="Task bearbeiten"
        description="Bearbeite die Details dieser Aufgabe."
        task={
          editTask ?? {
            id: "",
            title: "",
            description: "",
            deadline: undefined,

            column: "ToDo",
          }
        }
      />

      <div className="mt-6 grid grid-cols-3 gap-4">
        <BoardColumn
          title="ToDo"
          onDeleteTask={handleDeleteTask}
          tasks={board.tasks.filter((task) => task.column === "ToDo")}
          onAddTask={handleAddTask}
          handleEditTask={handleEditTask}
        />
        <BoardColumn
          title="Progress"
          onDeleteTask={handleDeleteTask}
          tasks={board.tasks.filter((task) => task.column === "Progress")}
          onAddTask={handleAddTask}
          handleEditTask={handleEditTask}
        />
        <BoardColumn
          title="Done"
          onDeleteTask={handleDeleteTask}
          tasks={board.tasks.filter((task) => task.column === "Done")}
          onAddTask={handleAddTask}
          handleEditTask={handleEditTask}
        />
      </div>
    </div>
  )
}
