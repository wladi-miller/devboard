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

export default function BoardCard() {
  return (
    <Link to="/boards/1">
      <Card className="border-2 border-black transition-shadow hover:shadow-md">
        <CardHeader>
          <CardTitle className="hover:underline">Name von Board</CardTitle>
          <CardDescription>3 Spalten - 0 Tasks</CardDescription>
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
