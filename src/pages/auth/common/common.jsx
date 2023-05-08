/* eslint-disable react/prop-types */
import background from "../../../assets/backgrounds/auth.png"

const Auth = ({ children, bg }) => {
  return (
    <div className="flex h-screen">
      <div className=" w-2/4 h-full">
        <div className="w-2/4 mx-auto">
          <p className="mt-[46px]">LOGO</p>
          <div className="form mt-[110px]">
            <h1>Sign Up</h1>
            <p className="text-ddgray">Create a new abc payment account</p>
            {children}
          </div>
        </div>
      </div>
      <div className=" w-2/4 h-full ">
        <img src={bg ? bg : background} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default Auth
