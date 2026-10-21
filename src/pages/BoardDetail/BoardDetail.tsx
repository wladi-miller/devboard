import { Button } from "../../components/ui/button"
import { useReducer, useState, useEffect } from "react"
import type { CreateTask, UpdateTask } from "@/types/bord.types"
import { updateTask, deleteTask } from "@/lib/api"
import { insertTask } from "@/lib/api"
import { useBoardDetailReducer } from "@/hooks/boardsDetailReducer"
import BoardColumn from "./components/BoardColumn"
import { ArrowLeft, Pencil, Check, X } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import { Input } from "../../components/ui/input"
import { getBoardById, updateBoard } from "@/lib/api"
import type { Task } from "@/types/bord.types"
import TaskDialog from "./components/TaskDialog"

export default function BoardDetail() {
  const { id } = useParams<{ id: string }>()
  const [isEditName, setIsEditName] = useState(false)
  const [boardName, setBoardName] = useState("Name des Boards")
  const [board, dispatchBoard] = useReducer(useBoardDetailReducer, undefined)

  async function fetchBoard() {
    const board = await getBoardById(id ?? "")
    dispatchBoard({ type: "SET_BOARD", data: board })
  }

  useEffect(() => {
    fetchBoard()
  }, [])

  const [isEditTaskDialogOpen, setIsEditTaskDialogOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | undefined>()

  if (!board) {
    return <div>Loading...</div>
  }

  async function handleAddTask(task: CreateTask) {
    const insertedTask = await insertTask({ ...task, boardID: board?.id ?? "" })
    if (!insertedTask) {
      console.error("Failed to create task")
      return
    }

    dispatchBoard({ type: "ADD_TASK", data: insertedTask })
  }

  async function handleDeleteTask(task: Task) {
    const wasDeleted = await deleteTask(task.id)
    if (!wasDeleted) {
      console.error("Failed to delete task")
      return
    }

    dispatchBoard({ type: "DELETE_TASK", data: task })
  }

  async function handleUpdateTaskStatus(
    id: string,
    newColumn: "ToDo" | "Progress" | "Done"
  ) {
    const updatedTask = await updateTask(id, { column: newColumn })
    if (!updatedTask) {
      console.error("Failed to update task column")
      return
    }

    dispatchBoard({ type: "UPDATE_TASK_STATUS", data: { id, newColumn } })
  }

  async function handleSubmitTaskUpdate(task: UpdateTask) {
    if (!task?.id) {
      console.error("Task ID is missing")
      return
    }

    const updatedTask = await updateTask(task.id, {
      ...task,
      boardID: board?.id ?? "",
    })
    if (!updatedTask) {
      console.error("Failed to update task")
      return
    }
    dispatchBoard({ type: "UPDATE_TASK", data: updatedTask })
    setIsEditTaskDialogOpen(false)
  }

  function handleEditBoardTitle() {
    setIsEditName(true)
    setBoardName(board?.title ?? "")
  }

  function handleSubmitBoardTitle() {
    if (!board) return

    const updatedBoard = updateBoard(board.id, { title: boardName })
    if (!updatedBoard) {
      console.error("Failed to update board")
      return
    }
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
        <h1 className="text-2xl font-bold">{board?.title ?? ""}</h1>
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
            deadline: null,
            column: "ToDo",
            assignedTo: null,
            boardID: board.id ?? "",
            created_at: new Date().toString(),
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
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
        <BoardColumn
          title="Progress"
          onDeleteTask={handleDeleteTask}
          tasks={board.tasks.filter((task) => task.column === "Progress")}
          onAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
        <BoardColumn
          title="Done"
          onDeleteTask={handleDeleteTask}
          tasks={board.tasks.filter((task) => task.column === "Done")}
          onAddTask={handleAddTask}
          handleEditTask={handleEditTask}
          onUpdateTaskStatus={handleUpdateTaskStatus}
        />
      </div>
    </div>
  )
}
