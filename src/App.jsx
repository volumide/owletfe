import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Button from "./components/button"
import Input from "./components/input"
import Auth from "./pages/auth/common/common"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Button>Hello</Button>
          <Input label="Amount" />
        </div>
      )
    },
    {
      path: "/auth",
      element: <Auth />
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
