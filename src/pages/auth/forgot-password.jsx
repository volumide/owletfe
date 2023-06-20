import Auth from "./common/common"
import Button from "../../components/button"
import Input from "../../components/input"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { baseUrl } from "../../utls/url"
import { toast } from "react-toastify"
const ForgotPassword = () => {
  const { handleSubmit, control } = useForm()
  const navigate = useNavigate()
  const submit = async (data) => {
    try {
      const res = await axios.post(baseUrl + "reset", data, { headers: { "Content-Type": "application/json" } })
      if (res.data.response[0].status === "invalid") {
        toast.warn("Unable to send email! try again latter")
        return
      }
      // console.log(res)
      navigate("/sign-in?reset=true")
    } catch (error) {
      toast.error(error.response.data.message || "can't sent emal to this email")
    }
  }
  return (
    <Auth header="Reset Password" caption="To reset your password, we will email you a temporary password" bg={true}>
      <form onSubmit={handleSubmit(submit)}>
        <Input label="Email Address" type="email" name="email" control={control} />

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
