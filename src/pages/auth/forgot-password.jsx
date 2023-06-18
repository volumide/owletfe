import Auth from "./common/common"
import Button from "../../components/button"
import Input from "../../components/input"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { baseUrl } from "../../utls/url"
const ForgotPassword = () => {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const submit = async (data) => {
    try {
      await axios.post(baseUrl + "reset", data, { headers: { "Content-Type": "application/json" } })
      // console.log(res)
      navigate("/sign-in?reset=true")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Auth header="Reset Password" caption="To reset your password, we will email you a temporary password" bg={true}>
      <form onSubmit={handleSubmit(submit)}>
        <Input label="Email Address" type="email" name="email" control={control} />
        {/* <div className="flex items-center  p-0">
          <input type="checkbox" width={false} id="phone" />
          <label className="px-2 text-[12px]" htmlFor="phone">
            Send password to phone
          </label>
        </div> */}

        <Button otherClass="mt-[32px]" type="submit">
          Send temporary password
        </Button>
        <small className="text-center my-[16px] block">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline" style={{ fontWeight: "bold" }}>
            Log In
          </Link>
        </small>
      </form>
    </Auth>
  )
}

export default ForgotPassword
