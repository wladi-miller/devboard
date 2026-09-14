import { Button } from "../../../components/ui/button"
import { Plus } from "lucide-react"
import TaskCard from "./TaskCard"
import type { Task } from "../../../types/bord.types"
import { useState } from "react"
import React from "react"

import TaskDialog from "./TaskDialog"

export default function BoardColumn({
  title,
  tasks,
  onAddTask,
  onDeleteTask,
  handleEditTask,
}: {
  title: "ToDo" | "Progress" | "Done"
  tasks: Task[]
  onAddTask: (task: Task) => void
  onDeleteTask: (task: Task) => void
  handleEditTask: (task: Task) => void
}) {
  const [isDragHover, setIsDragHover] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)

  function isTaskInTasks(column: string): boolean {
    return column === title
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    const column = event.dataTransfer.getData("column")

    if (isTaskInTasks(column)) {
      setIsDragHover(false)
      return
    }

    setIsDragHover(true)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()

    const column = event.dataTransfer.getData("column")
    if (isTaskInTasks(column)) {
      setIsDragHover(false)
    } else {
      setIsDragHover(false)
    }
  }

  const showDropHint = isDragHover && tasks.length === 0

  function getRandomId(): string {
    return String(Math.random())
  }

  return (
    <div
      className={
        "rounded-lg border border-black bg-gray-50 " +
        (isDragHover ? "border border-primary" : "")
      }
      onDragEnter={handleDragHover}
      onDragOver={handleDragHover}
      onDragLeave={() => setIsDragHover(false)}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between border-b border-black p-4">
        <h3 className="font-bold">{title}</h3>

        <Button
          variant="ghost"
          size="icon-lg"
          className="hover:bg-sky-300/50"
          onClick={() => setIsTaskDialogOpen(true)}
        >
          <Plus />
        </Button>

        <TaskDialog
          open={isTaskDialogOpen}
          handleOpenChange={setIsTaskDialogOpen}
          onSubmitUpdate={onAddTask}
          title="Neues Task erstellen"
          description="Erstelle eine neue Aufgabe für diese Spalte."
          task={{
            id: getRandomId(),
            title: "",
            description: "",
            column: title,
            deadline: undefined,
            assignee: undefined,
          }}
        />
      </div>

      <div className="p-4">
        {showDropHint && (
          <div className="rounded-xl border-2 border-dashed border-primary bg-primary/10 p-2 text-center text-primary">
            Hier ablegen
          </div>
        )}
        <div className="flex flex-col gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDeleteTask={onDeleteTask}
              handleEditTask={handleEditTask}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
