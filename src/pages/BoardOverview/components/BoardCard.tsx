import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardDescription,
} from "../../../components/ui/card"
import { Link } from "react-router-dom"
import { Button } from "../../../components/ui/button"
import { Trash2 } from "lucide-react"

import type { Board } from "../../../types/bord.types"

export default function BoardCard({ board }: { board: Board }) {
  return (
    <Link to={`/boards/${board.id}`}>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="hover:underline">{board.title}</CardTitle>
          <CardDescription>
            3 Spalten - {board.tasks.length} Tasks
          </CardDescription>
          <CardAction>
            <Button
              className="text-muted-foreground hover:text-destructive"
              variant="ghost"
              size="icon"
            >
              <Trash2></Trash2>
            </Button>
          </CardAction>
        </CardHeader>
      </Card>
    </Link>
  )
}
