import { Button } from "../../components/ui/button"
import { DialogClose, DialogFooter } from "../../components/ui/dialog"
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
import { useState } from "react"
import type { Board } from "../../types/bord.types"

export default function BoardOverview() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: "1",
      title: "Test",
      tasks: [
        { id: "1", title: "Abc", column: "ToDo", description: "Beschreibung" },
      ],
    },
  ])

  const [boardNameInput, setBoardNameInput] = useState("Neues Board")

  const handleCreateBoard = () => {
    const trimmedTitle = boardNameInput.trim() || "Neues Board"

    setBoards((currentBoards) => [
      ...currentBoards,
      {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        tasks: [],
      },
    ])
    setBoardNameInput("Neues Board")
  }

  return (
    <>
      <div className="flex flex-row place-content-between">
        <h1 className="text-xl font-bold">Meine Boards</h1>
        <Dialog>
          <DialogTrigger>
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
              onChange={(e) => setBoardNameInput(e.target.value)}
              id="name-1"
              name="name"
              value={boardNameInput}
              defaultValue="Neues Board"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Abbrechen</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="button" onClick={handleCreateBoard}>
                  Speichern
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-3 gap-4 pt-4">
        {boards.map((board) => {
          return <BoardCard key={board.id} board={board} />
        })}
      </div>
    </>
  )
}
