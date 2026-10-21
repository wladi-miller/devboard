import type { Board, UpdateBoard } from "@/types/bord.types"
import supabase from "@/lib/db"
import type { Task, CreateTask, UpdateTask } from "@/types/bord.types"

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
  const { data: board, error } = await supabase
    .from("boards")
    .select("*, tasks(*)")
    .eq("id", boardId)
    .single()

  if (error) {
    console.error(error)
    return undefined
  }

  return board
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

export async function deleteBoard(id: string): Promise<void> {
  const { error } = await supabase.from("boards").delete().eq("id", id)
  if (error) {
    console.error(error)
    throw new Error("Failed to delete board")
  }
}

export async function insertBoard(board: Board): Promise<Board | null> {
  const { data, error } = await supabase
    .from("boards")
    .insert([{ title: board.title, created_at: board.created_at }])
    .select("*, tasks(*)")
    .single()

  if (error) {
    console.error(error)
    throw new Error("Failed to insert board")
    return null
  }

  return data
}

export async function updateBoard(
  id: string,
  board: UpdateBoard
): Promise<Board | null> {
  const { data, error } = await supabase
    .from("boards")
    .update(board)
    .eq("id", id)
    .select("*, tasks(*)")
    .single()

  if (error) {
    console.error(error)
    throw new Error("Failed to update board")
    return null
  }

  return data
}

export async function insertTask(task: CreateTask): Promise<Task | null> {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select("*")
    .single()

  if (error) {
    console.error(error)
    return null
  }

  if (!data) {
    return null
  }

  return data as Task
}

export async function updateTask(
  id: string,
  task: UpdateTask
): Promise<Task | null> {
  const { data, error } = await supabase
    .from("tasks")
    .update(task)
    .eq("id", id)
    .select("*")
    .single()

  if (error) {
    console.error(error)
    return null
  }

  if (!data) {
    return null
  }

  return data as Task
}

export async function deleteTask(id: string): Promise<boolean> {
  const { error } = await supabase.from("tasks").delete().eq("id", id)

  if (error) {
    console.error(error)
    return false
  }

  return true
}
