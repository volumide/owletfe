import { RouterProvider, createBrowserRouter } from "react-router-dom"
import SignIn from "./pages/auth/signin"
import SignUp from "./pages/auth/signup"
import ForgotPassword from "./pages/auth/forgot-password"
import Home from "./pages/home"
import Container from "./pages/container"
import Placeholder from "./pages/placeholder"
import Transaction from "./pages/transaction"
import TvForm from "./pages/forms/tv-sub.form"
import Electricity from "./pages/forms/electricity.form"
import Education from "./pages/forms/education.form"
import Airtime from "./pages/forms/airtime.form"
import InterneData from "./pages/forms/data.form"

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
        },
        {
          path: "/tv-subscription",
          element: <TvForm />
        },
        {
          path: "/elect-subscription",
          element: <Electricity />
        },
        {
          path: "/edu-subscription",
          element: <Education />
        },
        {
          path: "/internet-subscription",
          element: <InterneData />
        },
        {
          path: "/airtime-subscription",
          element: <Airtime />
        },
        {
          path: "/transaction",
          element: <Transaction />
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
