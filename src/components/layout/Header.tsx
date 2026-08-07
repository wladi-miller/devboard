import { LayoutDashboard, CircleUser } from "lucide-react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="bg-black py-5">
      <div className="container mx-auto flex justify-between">
        <Link
          to="/boards"
          className="flex flex-row items-center gap-2 text-lg text-primary"
        >
          <LayoutDashboard className="h-5 w-5" />
          DevBoard
        </Link>
        <Link
          to="/profile"
          className="flex flex-row items-center gap-2 text-lg text-secondary hover:text-primary"
        >
          <CircleUser className="h-5 w-5" />
          <span className="text-secondary">Profil</span>
        </Link>
      </div>
    </header>
  )
}
