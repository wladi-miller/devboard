import { useCallback, useContext, useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../../../components/ui/popover"
import { Calendar } from "../../../components/ui/calendar"
import { ChevronDownIcon } from "lucide-react"
import { format, isValid } from "date-fns"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"
import type { CreateTask, Task } from "@/types/bord.types"
import UserNameContext from "@/context/UserNameContext"

function parseDeadline(deadline?: string | null): Date | undefined {
  if (!deadline) return undefined
  const parsed = new Date(deadline)
  return isValid(parsed) ? parsed : undefined
}

export default function TaskDialog({
  open,
  handleOpenChange,
  onSubmitCreate,
  onSubmitUpdate,
  title,
  description,
  task,
}: {
  open: boolean
  handleOpenChange: (open: boolean) => void
  onSubmitCreate?: (task: CreateTask) => void
  onSubmitUpdate?: (task: Task) => void
  title: string
  description: string
  task: Partial<Task>
}) {
  const context = useContext(UserNameContext)

  const getInitialAssignedPerson = useCallback(() => {
    if (task.assignedTo) return task.assignedTo
    return ""
  }, [task.assignedTo])

  const [taskTitle, setTaskTitle] = useState(task.title ?? "")
  const [taskDescription, setTaskDescription] = useState(task.description ?? "")
  const [selectedPerson, setSelectedPerson] = useState(getInitialAssignedPerson())
  const [date, setDate] = useState<Date | undefined>(parseDeadline(task.deadline))
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const resetForm = useCallback(() => {
    setTaskTitle(task.title ?? "")
    setTaskDescription(task.description ?? "")
    setSelectedPerson(getInitialAssignedPerson())
    setDate(parseDeadline(task.deadline))
    setIsCalendarOpen(false)
  }, [getInitialAssignedPerson, task.title, task.description, task.deadline])

  useEffect(() => {
    if (open) {
      resetForm()
    }
  }, [open, resetForm])

  const handleCancel = () => {
    resetForm()
    handleOpenChange(false)
  }

  const handleSubmit = () => {
    if (!taskTitle.trim()) return

    const nextDeadline = date?.toISOString() ?? task.deadline ?? null
    const nextAssignedTo = selectedPerson === "" ? null : selectedPerson

    if (task.id) {
      const nextTask: Task = {
        ...task,
        id: task.id,
        title: taskTitle.trim(),
        description: taskDescription.trim(),
        deadline: nextDeadline,
        assignedTo: nextAssignedTo,
        column: task.column ?? "ToDo",
        boardID: task.boardID ?? "",
        created_at: task.created_at ?? new Date().toISOString(),
      } as Task

      onSubmitUpdate?.(nextTask)
      handleOpenChange(false)
      return
    }

    onSubmitCreate?.({
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      deadline: nextDeadline,
      assignedTo: nextAssignedTo,
      column: task.column ?? "ToDo",
      boardID: task.boardID ?? "",
    })
    handleOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          resetForm()
        }
        handleOpenChange(nextOpen)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>
          <span>Titel</span>
          <Input
            value={taskTitle}
            placeholder="Titel eingeben"
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </div>

        <div>
          <span>Beschreibung</span>
          <Textarea
            value={taskDescription}
            placeholder="Beschreibung eingeben"
            onChange={(e) => setTaskDescription(e.target.value)}
          />
        </div>

        <div>
          <span>Zugewiesen an</span>
          <Select
            value={selectedPerson || ""}
            onValueChange={(value) => setSelectedPerson(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Person auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="">keine Zuweisung</SelectItem>
                <SelectItem value={context?.username ?? "undefined"}>
                  {context?.username ?? "undefined"}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span>Deadline</span>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date && isValid(date) ? (
                  format(date, "dd.MM.yyyy")
                ) : (
                  <span>Pick a date</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  setDate(selectedDate)
                  if (selectedDate) setIsCalendarOpen(false)
                }}
                defaultMonth={date ?? new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} disabled={!taskTitle.trim()}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
