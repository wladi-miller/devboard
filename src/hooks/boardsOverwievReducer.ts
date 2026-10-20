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
) {
  let newState: BoardsOverviewState

  switch (action.type) {
    case "ADD": {
      newState = [...prevState, action.data]
      break
    }

    case "DELETE": {
      newState = prevState.filter((board) => board.id !== action.data.id)
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
