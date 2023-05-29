/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "../../components/button"
import Input from "../../components/input"
import Auth from "./common/common"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/app-context"

const SignIn = () => {
  const { handleSubmit, control } = useForm()
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { setLogged, isLogged } = useContext(AppContext)
  console.log
  const signIn = async (data) => {
    try {
      const req = await axios.post(import.meta.env.VITE_APP_API_URL + "login", data, { headers: { "Content-Type": "application/json" } })
      localStorage.setItem("token", req.data.token)
      localStorage.setItem("user", JSON.stringify(req.data.message))
      setLogged(true)
      navigate("/", { replace: true })
    } catch (error) {
      setError(error.response.statusText)
    }
  }

  useEffect(() => {
    console.log(isLogged)
    if (isLogged) navigate("/")
  }, [])

  return (
    <Auth header="Welcome Back" caption="Sign in into your abc payment account" bg={true}>
      {error ? <p className="text-red-500">{error.toLowerCase()}: invalid username or password</p> : ""}
      <form onSubmit={handleSubmit(signIn)}>
        <Input label="Email Address" type="email" control={control} name="email" />
        <Input label="Password" type="password" control={control} name="password" />
        <small className="font-[600] underline">
          <Link to="/forgot-password">Forgot Password</Link>
        </small>
        <Button otherClass="mt-[32px]" type="submit">
          Sign In
        </Button>
        <small className="text-center my-[16px] block">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="font-[600] underline">
            Sign Up
          </Link>
        </small>
      </form>
    </Auth>
  )
}

export default SignIn
