import type { Board } from "@/types/bord.types"

const local_Storage_Boards_Key = "boards"

export function getBoards(): Board[] {
  const boards = localStorage.getItem(local_Storage_Boards_Key)
  if (boards) {
    return JSON.parse(boards)
  }
  return []
}

export function saveBoards(boards: Board[]): void {
  localStorage.setItem("boards", JSON.stringify(boards))
}

export function deleteBoards(boardId: string): void {
  const boards = getBoards()
  const updatedBoards = boards.filter((board) => board.id !== boardId)
  localStorage.setItem(local_Storage_Boards_Key, JSON.stringify(updatedBoards))
}
