import type { Board, Task } from "@/types/bord.types"
import { saveBoard } from "@/lib/api"

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
) {
  let newState = prevState

  switch (action.type) {
    case "SET_BOARD": {
      newState = action.data
      break
    }

    case "UPDATE_BOARD_NAME": {
      newState = {
        ...prevState,
        title: action.data,
      }
      break
    }

    case "ADD_TASK": {
      newState = {
        ...prevState,
        tasks: [...prevState.tasks, action.data],
      }
      break
    }

    case "DELETE_TASK": {
      newState = {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.id !== action.data.id),
      }
      break
    }

    case "UPDATE_TASK": {
      newState = {
        ...prevState,
        tasks: prevState.tasks.map((task) =>
          task.id === action.data.id ? action.data : task
        ),
      }
      break
    }
    case "UPDATE_TASK_STATUS": {
      newState = {
        ...prevState,
        tasks: prevState.tasks.map((task) =>
          task.id === action.data.id
            ? { ...task, column: action.data.newColumn }
            : task
        ),
      }
      newState.tasks = [...newState.tasks]
      break
    }
  }

  //saveBoard(newState)
  return newState
}
