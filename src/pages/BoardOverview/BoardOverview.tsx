import { Button } from "../../components/ui/button"
import { DialogClose, DialogFooter } from "../../components/ui/dialog"
import { insertBoard, deleteBoard } from "../../lib/api"
import { Input } from "../../components/ui/input"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog"
import BoardCard from "./components/BoardCard"
import { useState, useEffect } from "react"
import { useReducer } from "react"
import { userBoardsOverviewReducer } from "../../hooks/boardsOverwievReducer"
import type { Board } from "../../types/bord.types"
import { getBoards } from "../../lib/api"

export default function BoardOverview() {
  const [boards, boardsDispatch] = useReducer(userBoardsOverviewReducer, [])

  const [boardNameInput, setBoardNameInput] = useState("Neues Board")

  const resetBoardNameInput = () => {
    setBoardNameInput("Neues Board")
  }
  async function fetchBoards() {
    const boards = await getBoards()
    boardsDispatch({ type: "SET", data: boards })
  }

  useEffect(() => {
    fetchBoards()
  }, [])

  async function handleAddNewBoard() {
    const newBoard: Board = {
      id: "",
      title: boardNameInput.trim() || "Neues Board",
      created_at: new Date().toISOString(),
      tasks: [],
    }
    const insertedBoard = await insertBoard(newBoard)
    if (insertedBoard) {
      boardsDispatch({ type: "ADD", data: insertedBoard })
      resetBoardNameInput()
    }
  }

  function handleDeleteBoard(id: string) {
    try {
      deleteBoard(id)
      boardsDispatch({
        type: "DELETE",
        data: { id: id, title: "", tasks: [], created_at: "" },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="flex flex-row place-content-between">
        <h1 className="text-xl font-bold">Meine Boards</h1>

        <Dialog
          onOpenChange={(open) => {
            if (open) {
              resetBoardNameInput()
            }
          }}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4" />
              Neues Board
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Board erstellen</DialogTitle>
              <DialogDescription>
                Gib dem Board einen Namen. Es werden automatisch drei Spalten
                angelegt (ToDo, In Progress, Done).
              </DialogDescription>
            </DialogHeader>

            <Input
              value={boardNameInput}
              onChange={(e) => setBoardNameInput(e.target.value)}
              placeholder="Neues Board"
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Abbrechen</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button onClick={handleAddNewBoard}>Speichern</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4">
        {boards.map((board) => (
          <BoardCard
            key={board.id}
            board={board}
            onDelete={handleDeleteBoard}
          />
        ))}
      </div>
    </>
  )
}
