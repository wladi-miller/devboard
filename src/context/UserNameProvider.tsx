import React, { useState } from "react"
import UserNameContext from "./UserNameContext"

export function UserNameProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState(getUserNameFromLocalStorage())

  function getUserNameFromLocalStorage() {
    const storedUsername = localStorage.getItem("username")
    return storedUsername ? storedUsername : ""
  }

  return (
    <UserNameContext.Provider value={{ username, setUsername }}>
      {children}
    </UserNameContext.Provider>
  )
}
