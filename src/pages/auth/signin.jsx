import { Link } from "react-router-dom"
import Button from "../../components/button"
import Input from "../../components/input"
import Auth from "./common/common"

const SignIn = () => {
  return (
    <Auth header="Welcome Back" caption="Sign in into your abc payment account" bg={true}>
      <form>
        <Input label="Email Address" type="email" />
        <Input label="Password" type="password" />
        <small className="font-[600] underline">
          <Link to="/forgot-password">Forgot Password</Link>
        </small>
        <Button otherClass="mt-[32px]">Sign In</Button>
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
