import { RouterProvider, createBrowserRouter } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <p>Home</p>
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
