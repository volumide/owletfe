import Auth from "./common/common"
import Button from "../../components/button"
import Input from "../../components/input"
const SignUp = () => {
  return (
    <Auth header="Sign Up" caption="Create a new abc payment account">
      <form>
        <Input label="Phone Number" type="number" />
        <Input label="Email Address" type="email" />
        <Input label="Password" type="password" />
        <Input label="Confirm Password" type="password" />
        <Button otherClass="mt-[32px]">Sign Up</Button>
        <small className="text-center my-[16px] block">
          Already have an account? <span style={{ fontWeight: "bold" }}>Log In</span>
        </small>
      </form>
    </Auth>
  )
}

export default SignUp
