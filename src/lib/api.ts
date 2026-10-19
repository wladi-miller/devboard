import type { Board } from "@/types/bord.types"
import supabase from "@/lib/db"

const local_Storage_Boards_Key = "boards"

export async function getBoards(): Promise<Board[]> {
  const { data: boards, error } = await supabase
    .from("boards")
    .select("*, tasks(*)")

  if (error) {
    console.error(error)
    return []
  }
  console.log("Fetched boards:", boards)
  return boards
}

export function getBoardsFromLocalstorage(): Board[] {
  const boards = localStorage.getItem(local_Storage_Boards_Key)
  if (boards) {
    return JSON.parse(boards)
  }
  return []
}

export async function getBoardById(
  boardId: string
): Promise<Board | undefined> {
  const boards = await getBoards()
  return boards.find((board) => board.id === boardId)
}

export async function saveBoards(boards: Board[]): Promise<void> {
  localStorage.setItem(local_Storage_Boards_Key, JSON.stringify(boards))
}

export async function saveBoard(board: Board): Promise<void> {
  const boards = await getBoards()

  const updatedBoards = boards.map((b) => {
    if (b.id === board.id) {
      return board
    } else {
      return b
    }
  })
  await saveBoards(updatedBoards)
}

export async function deleteBoards(boardId: string): Promise<void> {
  const boards = await getBoards()
  const updatedBoards = boards.filter((board) => board.id !== boardId)
  await saveBoards(updatedBoards)
}
