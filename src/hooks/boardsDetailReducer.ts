import type { Board, Task } from "@/types/bord.types"

type BoardsDetailAction =
  | {
      type: "UPDATE_BOARD_NAME"
      data: string
    }
  | {
      type: "ADD_TASK" | "DELETE_TASK" | "UPDATE_TASK"
      data: Task
    }
  | {
      type: "UPDATE_TASK_STATUS"
      data: { id: string; newColumn: "ToDo" | "Progress" | "Done" }
    }
  | {
      type: "SET_BOARD"
      data: Board | undefined
    }

export function useBoardDetailReducer(
  prevState: Board | undefined,
  action: BoardsDetailAction
): Board | undefined {
  if (!prevState && action.type !== "SET_BOARD") {
    return prevState
  }

  switch (action.type) {
    case "SET_BOARD": {
      return action.data
    }

    case "UPDATE_BOARD_NAME": {
      if (!prevState) return prevState
      return {
        ...prevState,
        title: action.data,
      }
    }

    case "ADD_TASK": {
      if (!prevState) return prevState
      return {
        ...prevState,
        tasks: [...prevState.tasks, action.data],
      }
    }

    case "DELETE_TASK": {
      if (!prevState) return prevState
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== action.data.id),
      }
    }

    case "UPDATE_TASK": {
      if (!prevState) return prevState
      return {
        ...prevState,
        tasks: prevState.tasks.map((task) =>
          task.id === action.data.id ? action.data : task
        ),
      }
    }

    case "UPDATE_TASK_STATUS": {
      if (!prevState) return prevState
      const updatedTasks = prevState.tasks.map((task) =>
        task.id === action.data.id
          ? { ...task, column: action.data.newColumn }
          : task
      )
      return {
        ...prevState,
        tasks: updatedTasks,
      }
    }

    default:
      return prevState
  }
}
