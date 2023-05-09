import { RouterProvider, createBrowserRouter } from "react-router-dom"
import SignIn from "./pages/auth/signin"
import SignUp from "./pages/auth/signup"
import ForgotPassword from "./pages/auth/forgot-password"
import Home from "./pages/home"
import Container from "./pages/container"
import Placeholder from "./pages/placeholder"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      children: [
        {
          index: true,
          element: <Home />
        },
        {
          path: "/owlet/:name",
          element: <Placeholder />
        },
        {
          path: "/owlet/:name/:type",
          element: <Placeholder />
        }
      ]
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
