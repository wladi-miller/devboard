import type { Board, Task } from "@/types/bord.types"
import { saveBoard } from "@/lib/api"

type BoardsDetailAction =
  | {
      type: "UPDATE_BOARD_NAME"
      data: string
    }
  | {
      type: "ADD_TASK" | "DELETE_TASK"
      data: Task
    }

export function useBoardDetailReducer(
  prevState: Board,
  action: BoardsDetailAction
) {
  let newState = prevState
  switch (action.type) {
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
  }
  saveBoard(newState)
  return newState
}
