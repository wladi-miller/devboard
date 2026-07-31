import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Profile() {
  const [username, setUsername] = React.useState("Liam2")

  function handleSave() {
    localStorage.setItem("username", username)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-xl px-6 py-8">
        <h1 className="mb-6 text-2xl font-bold">Profil</h1>

        <Card className="border-2 border-gray-500 shadow-sm">
          <CardHeader className="space-y-2 pb-5">
            <CardTitle className="text-xl">Benutzername ändern</CardTitle>

            <CardDescription className="text-base">
              Ändere deinen Anzeigenamen für das Kanban-Board.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-3">
              <Label htmlFor="username" className="font-semibold">
                Name
              </Label>

              <Input
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="h-11"
              />

              <Button
                className="mt-2 w-fit bg-cyan-400 text-black hover:bg-cyan-500"
                onClick={handleSave}
              >
                Speichern
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
