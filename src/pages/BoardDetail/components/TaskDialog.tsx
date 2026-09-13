import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
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

function parseDeadline(deadline?: string): Date | undefined {
  if (!deadline) return undefined
  const parsed = new Date(deadline)
  return isValid(parsed) ? parsed : undefined
}

export default function TaskDialog({
  open,
  handleOpenChange,
  handleSubmitUpdate,
  task,
}: {
  open: boolean
  handleOpenChange: (open: boolean) => void
  handleSubmitUpdate: (task: Task) => void
  task: Task
}) {
  const [taskTitle, setTaskTitle] = useState<string>(task.title)
  const [taskDiscription, setTaskDiscription] = useState<string>(
    task.description ?? ""
  )
  const [selectedPerson, setSelectedPerson] = useState<string>(
    task.assignee ?? ""
  )
  const [date, setDate] = useState<Date | undefined>(
    parseDeadline(task.deadline)
  )
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  function handleSave() {
    handleSubmitUpdate({
      ...task,
      title: taskTitle,
      description: taskDiscription,
      deadline: date?.toISOString(),
      assignee: selectedPerson || undefined,
      column: task.column,
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task bearbeiten</DialogTitle>
          <DialogDescription>
            Bearbeite die Details dieser Aufgabe.
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
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!date}
                className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
              >
                {date && isValid(date) ? (
                  format(date, "PPP")
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
          <DialogClose asChild>
            <Button variant="outline">Abbrechen</Button>
          </DialogClose>
          <Button onClick={handleSave}>Speichern</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
