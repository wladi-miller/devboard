// import { Button } from "@/components/ui/button"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { UserNameProvider } from "./context/UserNameProvider"
import Profile from "./pages/Profile/profile"
import BoardDetail from "./pages/BoardDetail/BoardDetail"
import BoardOverview from "./pages/BoardOverview/BoardOverview"
import Layout from "./components/layout/Layout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/boards",
        children: [
          {
            index: true,
            element: <BoardOverview />,
          },
          {
            path: ":id",
            element: <BoardDetail />,
          },
        ],
      },
    ],
  },
])

export function App() {
  return (
    <UserNameProvider>
      <RouterProvider router={router}></RouterProvider>
    </UserNameProvider>
  )
}

export default App
