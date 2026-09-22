import { useContext, useState } from "react"
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
import type { Task } from "@/types/bord.types"
import UserNameContext from "@/context/UserNameContext"

function parseDeadline(deadline?: string): Date | undefined {
  if (!deadline) return undefined
  const parsed = new Date(deadline)
  return isValid(parsed) ? parsed : undefined
}

export default function TaskDialog({
  open,
  handleOpenChange,
  onSubmitUpdate,
  title,
  description,
  task,
}: {
  open: boolean
  handleOpenChange: (open: boolean) => void
  onSubmitUpdate: (task: Task) => void
  title: string
  description: string
  task: Task
}) {
  const contex = useContext(UserNameContext)

  const [taskTitle, setTaskTitle] = useState<string>(task.title)
  const [taskDiscription, setTaskDiscription] = useState<string>(
    task.description ?? " "
  )
  const [selectedPerson, setSelectedPerson] = useState<string>(
    task.assignee ?? " "
  )
  const [date, setDate] = useState<Date | undefined>(
    parseDeadline(task.deadline)
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const resetForm = () => {
    setTaskTitle(task.title)
    setTaskDiscription(task.description ?? " ")
    setSelectedPerson(task.assignee ?? " ")
    setDate(parseDeadline(task.deadline))
    setIsCalendarOpen(false)
  }

  /*   useEffect(() => {
    if (open) {
      resetForm()
    }
  }, [open, task]) */

  function handleCancel() {
    resetForm()
    handleOpenChange(false)
  }

  function handleSubmitUpdate() {
    const updatedTask: Task = {
      ...task,
      id: task.id || `task-${Date.now()}-${Math.random()}`,
      title: taskTitle,
      description: taskDiscription,
      deadline: date?.toISOString(),
      assignee: selectedPerson || undefined,
      column: task.column,
    }

    onSubmitUpdate(updatedTask)
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
                <SelectItem value=" ">keine Zuweisung</SelectItem>
                <SelectItem value={contex?.username ?? "undefined"}>
                  {contex?.username ?? "undefined"}
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
          <Button onClick={handleSubmitUpdate} disabled={taskTitle === ""}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
