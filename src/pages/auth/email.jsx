/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Button from "../../components/button"
import Input from "../../components/input"
import Auth from "./common/common"
import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../../utls/url"
import { toast } from "react-toastify"

const Email = () => {
  const { handleSubmit, control } = useForm()
  const [loading, setLoading] = useState(false)
  const [error] = useState()
  const [resend, setResend] = useState(false)

  const navigate = useNavigate()
  const verify = async (data) => {
    setLoading(true)
    setResend(true)
    try {
      const req = await axios.post(baseUrl + "verify/email", data, { headers: { "Content-Type": "application/json" } })
      //   console.log(req)
      toast.success(req.data.message)
      localStorage.removeItem("verify")
      navigate("/sign-in", { replace: true })
      setLoading(false)
      setResend(false)
    } catch (error) {
      toast.warning(error.response.data.message)
      setLoading(false)
      setResend(false)
    }
  }

  const sendCode = async () => {
    setLoading(true)
    const dt = document.getElementById("email").value
    if (!dt) {
      toast.info("email is empty")
      return
    }
    try {
      await axios.post(baseUrl + "send/verification", { "email": dt }, { headers: { "Content-Type": "application/json" } })
      toast.success("check your email")
      //   console.log(req)
      setLoading(false)
    } catch (error) {
      toast.warning(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <Auth header="Verify Email" caption="verify your owlet pay email" bg={true}>
      {error ? <p className="text-red-500">{error.toLowerCase()}: invalid username or password</p> : ""}
      <form onSubmit={handleSubmit(verify)}>
        <Input label="Email Address" type="email" control={control} name="email" id="email" />
        <Input label="Verification code" type="number" control={control} name="code" />
        {!resend ? (
          <small className="font-[600] underline">
            <button to="/forgot-password" type="button" onClick={sendCode}>
              resend verification code
            </button>
          </small>
        ) : (
          <small>wait while we try to send you a verification code</small>
        )}

        <Button otherClass="mt-[32px]" type="submit" disabled={loading}>
          Verify
        </Button>
      </form>
    </Auth>
  )
}

export default Email
