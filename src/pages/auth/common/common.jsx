/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import background from "../../../assets/backgrounds/auth.png"
import background2 from "../../../assets/backgrounds/auth2.png"
const Auth = ({ children, header, caption, bg = false }) => {
  return (
    <div className=" p-[16px] md:flex h-screen">
      <div className=" md:w-2/4 h-full">
        <div className="md:w-2/4 mx-auto">
          <h2 className="mt-[46px]">
            <Link to="/">LOGO</Link>
          </h2>
          <div className="form mt-[110px] ">
            <h1>{header}</h1>
            <p className="text-ddgray mb-[24px]">{caption}</p>
            {children}
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-2/4 h-full ">
        <img src={bg ? background2 : background} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}

export default Auth
