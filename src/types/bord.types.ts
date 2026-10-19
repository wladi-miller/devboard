import type { Database } from "@/types/supabase"

export interface BoardLocalstorage {
  id: string
  title: string
  tasks: Task[]
}

export type Board = Database["public"]["Tables"]["boards"]["Row"] & {
  tasks: Database["public"]["Tables"]["tasks"]["Row"][]
}

export interface Task {
  id: string
  title: string
  column: "ToDo" | "Progress" | "Done"
  description?: string
  deadline?: string
  assignee?: string
}
