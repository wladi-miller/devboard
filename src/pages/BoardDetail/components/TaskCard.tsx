import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, CalendarIcon, CircleUser } from "lucide-react"

import type { Task } from "../../../types/bord.types"

export default function TaskCard({
  task,
  onDeleteTask,
  handleEditTask,
}: {
  task: Task
  onDeleteTask: (task: Task) => void
  handleEditTask: (task: Task) => void
}) {
  return (
    <Card
      className="hover:cursor-pointer"
      size="sm"
      draggable={true}
      onDragStart={(e) => {
        e.dataTransfer.setData(`column-${task.column}`, "")
        e.dataTransfer.setData(`id-${task.id}`, "")
      }}
      onClick={() => handleEditTask(task)}
    >
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className="flex flex-col">
          {task.description && <span className="mb-2">{task.description}</span>}
          {task.assignee && (
            <span className="flex items-center gap-1">
              {<CircleUser className="size-3" />}
              {task.assignee}
            </span>
          )}
          {task.deadline && (
            <span className="flex items-center gap-1">
              {<CalendarIcon className="size-3" />}
              {new Date(task.deadline ?? new Date()).toLocaleDateString(
                "de-DE"
              )}
            </span>
          )}
        </CardDescription>

        <CardAction>
          <Button
            className="text-muted-foreground hover:text-destructive"
            variant="ghost"
            size="icon-lg"
            onClick={(e) => {
              e.stopPropagation()
              onDeleteTask(task)
            }}
          >
            <Trash2 />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  )
}
