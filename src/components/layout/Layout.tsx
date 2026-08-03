import { Outlet } from "react-router-dom"
import Header from "./Header"

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="container mx-auto py-4">
        {/* Your main content goes here */}
        <Outlet />
      </main>
    </div>
  )
}
