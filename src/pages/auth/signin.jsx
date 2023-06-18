/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "../../components/button"
import Input from "../../components/input"
import Auth from "./common/common"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/app-context"
import { baseUrl } from "../../utls/url"
import { toast } from "react-toastify"

const SignIn = () => {
  const { handleSubmit, control } = useForm()
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const navigate = useNavigate()
  const { setLogged, isLogged } = useContext(AppContext)
  const signIn = async (data) => {
    setLoading(true)
    try {
      const req = await axios.post(baseUrl + "login", data, { headers: { "Content-Type": "application/json" } })
      if (req.data.message.suspend === "1") {
        toast.warn("account suspended")
        return
      }
      localStorage.setItem("token", req.data.token)
      localStorage.setItem("user", JSON.stringify(req.data.message))
      setLogged(true)
      toast.success("login successfull")
      navigate("/", { replace: true })
    } catch (error) {
      toast.error("invalid username or password")
      setError(error.response.statusText || "unauthtorize")
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLogged) navigate("/")
  }, [])

  return (
    <Auth header="Welcome Back" caption="Sign in into your owletpay account" bg={true}>
      {queries?.reset ? <span className="text-valid"> A temporal password as been sent to your email </span> : ""}
      {error ? <p className="text-red-500">{error.toLowerCase()}: invalid username or password</p> : ""}
      <form onSubmit={handleSubmit(signIn)}>
        <Input label="Email Address" type="email" control={control} name="email" />
        <Input label="Password" type="password" control={control} name="password" />
        <small className="font-[600] underline">
          <Link to="/forgot-password">Forgot Password</Link>
        </small>
        <Button otherClass="mt-[32px]" type="submit" disabled={loading}>
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
