import Auth from "./common/common"
import Button from "../../components/button"
import Input from "../../components/input"
const ForgotPassword = () => {
  return (
    <Auth header="Reset Password" caption="To reset your password, we will email you instructions">
      <form>
        <Input label="Email Address" type="email" />
        <div className="flex items-center  p-0">
          <input type="checkbox" width={false} id="phone" />
          <label className="px-2 text-[12px]" htmlFor="phone">
            Send password to phone
          </label>
        </div>

        <Button otherClass="mt-[32px]">Send Reset Link</Button>
        <small className="text-center my-[16px] block">
          Already have an account? <span style={{ fontWeight: "bold" }}>Log In</span>
        </small>
      </form>
    </Auth>
  )
}

export default ForgotPassword
