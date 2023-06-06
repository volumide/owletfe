/* eslint-disable react-hooks/exhaustive-deps */
import Auth from "./common/common"
import { useForm } from "react-hook-form"
import Button from "../../components/button"
import Input from "../../components/input"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import AppContext from "../../context/app-context"
import { baseUrl } from "../../utls/url"
const SignUp = () => {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
  const { isLogged } = useContext(AppContext)

  useEffect(() => {
    if (isLogged) navigate("/")
  }, [])

  const signup = async (data) => {
    try {
      await axios.post(baseUrl + "user", data, { headers: { "Content-Type": "application/json" } })
      //console.log(req.data)
      navigate("/sign-in", { replace: true })
    } catch (error) {
      //console.log(error.response.data.data)
      setErrors(error.response.data.data)
    }
  }
  return (
    <Auth header="Sign Up" caption="Create a new owletpay account">
      {Object.keys(errors).length
        ? Object.keys(errors).map((e) => (
            <p key={e} className="text-red-500">
              {errors?.[e][0]}
            </p>
          ))
        : ""}
      <form onSubmit={handleSubmit(signup)}>
        <Input label="First Name" control={control} name="first_name" />
        <Input label="Last Name" control={control} name="last_name" />
        <Input label="Phone Number" type="number" control={control} name="phone" />
        <Input label="Email Address" type="email" control={control} name="email" />
        <Input label="Password" type="password" control={control} name="password" />
        {/* <Input label="Confirm Password" type="password" control={control} /> */}
        <Button otherClass="mt-[32px]" type="submit">
          Sign Up
        </Button>
        <small className="text-center my-[16px] block">
          Already have an account?{" "}
          <Link className="underline" to="/sign-in" style={{ fontWeight: "bold" }}>
            Log In
          </Link>
        </small>
      </form>
    </Auth>
  )
}

export default SignUp
