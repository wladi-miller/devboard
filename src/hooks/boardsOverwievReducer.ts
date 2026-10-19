import type { Board } from "@/types/bord.types"
import { saveBoards } from "@/lib/api"

type BoardsOverviewState = Board[]

export type BoardsOverviewAction =
  | {
      type: "ADD" | "DELETE"
      data: Board
    }
  | { type: "SET"; data: Board[] }

export function userBoardsOverviewReducer(
  prevState: BoardsOverviewState,
  action: BoardsOverviewAction
): BoardsOverviewState {
  let newState: BoardsOverviewState = prevState

  switch (action.type) {
    case "ADD": {
      newState = [...prevState, action.data]
      saveBoards(newState)
      break
    }

    case "DELETE": {
      newState = prevState.filter((board) => board.id !== action.data.id)
      saveBoards(newState)

      break
    }

    case "SET": {
      newState = action.data
      saveBoards(newState)
      break
    }

    default:
      return prevState
  }
  return newState
}
