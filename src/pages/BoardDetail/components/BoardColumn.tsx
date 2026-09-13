import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../../components/ui/dialog"
import TaskCard from "./TaskCard"
import type { Task } from "../../../types/bord.types"
import { useState } from "react"
import React from "react"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover"
import { Calendar } from "../../../components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { format } from "date-fns"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../../../components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BoardColumn({
  title,
  tasks,
  onAddTask,
}: {
  title: "ToDo" | "Progress" | "Done"
  tasks: Task[]
  onAddTask: (task: Task) => void
}) {
  const [isDragHover, setIsDragHover] = useState(false)
  const [taskTitle, setTaskTitle] = useState<string>("")
  const [taskDiscription, setTaskDiscription] = useState<string>("")
  const [selectedPerson, setSelectedPerson] = useState<string>()

  const [date, setDate] = useState<Date>()

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
      // CALL MOVE
    }
  }

  const showDropHint = isDragHover && tasks.length === 0

  function handleAddNewTask() {
    const newTask: Task = {
      id: String(Math.random()),
      title: taskTitle,
      description: taskDiscription ?? "",
      column: title,
      deadline: date?.toISOString() ?? "",
    }
    onAddTask(newTask)
    setTaskTitle("")
    setTaskDiscription("")
    setSelectedPerson("")
    setDate(undefined)
  }

  return (
    <div
      className={`rounded-lg border border-black bg-gray-50 ${isDragHover ? "border border-primary" : ""}`}
      onDragEnter={handleDragHover}
      onDragOver={handleDragHover}
      onDragLeave={() => setIsDragHover(false)}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between border-b border-black p-4">
        <h3 className="font-bold">{title}</h3>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon-lg"
              className="hover:bg-sky-300/50"
            >
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neues Task erstellen</DialogTitle>
              <DialogDescription>
                Erstelle eine neue Aufgabe für diese Spalte.
              </DialogDescription>
            </DialogHeader>
            <div>
              <span>Titel</span>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
            </div>
            <div>
              <span>Beschreibung</span>
              <Textarea
                value={taskDiscription}
                onChange={(e) => setTaskDiscription(e.target.value)}
              />
            </div>
            <div>
              <span>Zugewiesen an</span>
              <Select value={selectedPerson} onValueChange={setSelectedPerson}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Person auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="light">Light</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <span>Deadline</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    defaultMonth={date}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Abbrechen</Button>
              </DialogClose>

              <DialogClose asChild>
                <Button onClick={handleAddNewTask}>Speichern</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-4">
        {showDropHint && (
          <div className="rounded-xl border-2 border-dashed border-primary bg-primary/10 p-2 text-center text-primary">
            Hier ablegen
          </div>
        )}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}
