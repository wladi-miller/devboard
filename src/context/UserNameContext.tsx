import { createContext } from "react"
//
type UserNameContextType = {
  username: string
  setUsername: (username: string) => void
}
//
const UserNameContext = createContext<UserNameContextType | undefined>(
  undefined
)

export default UserNameContext
