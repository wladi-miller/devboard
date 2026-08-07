import { Button } from "../../../components/ui/button"
import { Plus } from "lucide-react"
import TaskCard from "./TaskCard"
import type { Task } from "../../../types/bord.types"
import { useState } from "react"

export default function BoardColumn({
  title,
  tasks,
}: {
  title: string
  tasks: Task[]
}) {
  const [isDragHover, setIsDragHover] = useState(false)

  function isTaskInTasks(column: string): boolean {
    return column === title
  }

  function handleDragHover(event: React.DragEvent<HTMLDivElement>) {
    const column = event.dataTransfer.getData("column")
    if (isTaskInTasks(column)) {
      setIsDragHover(false)
    } else {
      setIsDragHover(true)
    }
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    const column = event.dataTransfer.getData("column")
    if (isTaskInTasks(column)) {
      setIsDragHover(false)
    } else {
      //Call Function to move the task to this column
      setIsDragHover(false)
    }
  }

  return (
    <div
      className={`rounded-lg border border-black bg-gray-50 ${isDragHover ? "border-1 border-primary" : ""}`}
      onDragEnter={handleDragHover}
      onDragOver={handleDragHover}
      onDragLeave={() => setIsDragHover(false)}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between border-b border-black p-4">
        <h3 className="font-bold">{title}</h3>

        <Button variant="ghost" size="icon-lg" className="hover:bg-sky-300/50">
          <Plus />
        </Button>
      </div>
      <div className="p-4">
        <div
          className={`rounded-xl border-2 border-dashed border-primary bg-primary/10 p-2 text-center text-primary ${!isDragHover && "hidden"}`}
        >
          Hier ablegen
        </div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
