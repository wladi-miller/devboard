// import { Button } from "@/components/ui/button"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Profile from "./pages/Profile/Profile"
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
  return <RouterProvider router={router}></RouterProvider>
}

export default App
