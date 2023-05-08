import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Button from "./components/button"
import Input from "./components/input"

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
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
