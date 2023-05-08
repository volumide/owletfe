import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Button from "./components/button"
import Input from "./components/input"
import SignIn from "./pages/auth/signin"
import SignUp from "./pages/auth/signup"
import ForgotPassword from "./pages/auth/forgot-password"

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
      path: "/sign-in",
      element: <SignIn />
    },
    {
      path: "/sign-up",
      element: <SignUp />
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword />
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
