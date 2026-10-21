import type { Database } from "@/types/supabase"

export interface BoardLocalstorage {
  id: string
  title: string
  tasks: Task[]
}

export type UpdateBoard = Database["public"]["Tables"]["boards"]["Update"]

export type Board = Database["public"]["Tables"]["boards"]["Row"] & {
  tasks: Database["public"]["Tables"]["tasks"]["Row"][]
}

export type Task = Database["public"]["Tables"]["tasks"]["Row"] & {
  column: "ToDo" | "Progress" | "Done"
}

export type CreateTask = Omit<Task, "id" | "created_at">

/* export interface Task {
  id: string
  title: string
  column: "ToDo" | "Progress" | "Done"
  description?: string
  deadline?: string
  assignee?: string
} */
