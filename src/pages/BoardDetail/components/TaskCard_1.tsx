import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ReactNode } from "react"

type TaskCardProps = {
  children: ReactNode
}

export default function TaskCard_1({ children }: TaskCardProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Neue Task erstellen</DialogTitle>
            <DialogDescription>
              Erstelle eine neue Aufgabe für diese Spalte.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="Titel">
                <span>Titel</span>
              </Label>
              <Input id="Titel" name="Titel" placeholder="Titel der Aufgabe" />
            </Field>
            <Field>
              <Label htmlFor="Beschreibung">Beschreibung</Label>
              <Input
                id="Beschreibung"
                name="Beschreibung"
                placeholder="Beschreibung der Aufgabe"
                className="h-30"
              />
            </Field>
            <Field>
              <Label htmlFor="Beschreibung">Zugewiesen an</Label>
              <Input
                id="Beschreibung"
                name="Beschreibung"
                placeholder="Beschreibung der Aufgabe"
                className="h-30"
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Abbrechen</Button>
            </DialogClose>
            <Button type="submit">Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
