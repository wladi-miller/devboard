import type { Board } from "@/types/bord.types"
import { saveBoards } from "@/lib/api"

type BoardsOverviewState = Board[]

export type BoardsOverviewAction = {
  type: "ADD" | "DELETE"
  data: Board
}

export function userBoardsOverviewReducer(
  prevState: BoardsOverviewState,
  action: BoardsOverviewAction
): BoardsOverviewState {
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

    default: {
      return prevState
    }
  }
  saveBoards(newState)
  return newState
}
