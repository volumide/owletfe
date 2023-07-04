import { RouterProvider, createBrowserRouter } from "react-router-dom"
import SignIn from "./pages/auth/signin"
import SignUp from "./pages/auth/signup"
import ForgotPassword from "./pages/auth/forgot-password"
import Home from "./pages/home"
import Container from "./pages/container"
import Placeholder from "./pages/placeholder"
import Transaction from "./pages/transaction"
import DashBoard from "./pages/forms/dashboard/commision.form"
import About from "./pages/about"
import Terms from "./pages/terms"
import Faq from "./pages/faq"
import Email from "./pages/auth/email"

function App() {
  // const apiUrl = import.meta.env
  // //console.log(apiUrl, apiUrl.VITE_APP_API_URL)
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
        },

        {
          path: "/transaction",
          element: <Transaction />
        },
        {
          path: "/dashboard",
          element: <DashBoard />
        },
        {
          path: "/about-us",
          element: <About />
        },
        {
          path: "/terms",
          element: <Terms />
        },
        {
          path: "/faq",
          element: <Faq />
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
    },
    {
      path: "/verify-email",
      element: <Email />
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
