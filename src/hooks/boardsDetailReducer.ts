import type { Board } from "@/types/bord.types"
import { saveBoard } from "@/lib/api"

type BoardsDetailAction = {
  type: "UPDATE_BOARD_NAME"
  data: string
}

export function useBoardDetailReducer(
  prevState: Board,
  action: BoardsDetailAction
) {
  let newState = prevState
  switch (action.type) {
    case "UPDATE_BOARD_NAME":
      newState = {
        ...prevState,
        title: action.data,
      }
  }
  saveBoard(newState)
  return newState
}
