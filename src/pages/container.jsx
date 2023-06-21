import { Link, Outlet } from "react-router-dom"
import { placeholder } from "../utls/links"
import menu from "../assets/menu.png"
import { useContext, useState } from "react"
import AppContext from "../context/app-context"
import avartar from "../assets/avartar.png"
import logo from "../assets/logo.png"

const Container = () => {
  const [show, setShow] = useState(false)
  const { isLogged, logout, user } = useContext(AppContext)
  const toggle = () => {
    if (window.innerWidth <= 1029) setShow(!show)
  }
  return (
    <>
      <div className="border-b border-b-input overflow-hidden  px-[16px]">
        <div className=" lg:px-[100px] py-[35px] mx-auto flex items-center justify-between">
          <h2>
            <Link to="/">
              <img src={logo} alt="owletpay logo" className=" w-[150px]" />
            </Link>
          </h2>
          <button className={`w-[50px] h-[50px] bg-input rounded-full p-3 flex items-center justify-center lg:hidden`} onClick={toggle}>
            <img src={menu} alt="" />
          </button>

          <div className={`${show ? "absolute h-full w-full text-center left-0 p-5 top-[121px] bg-white z-10" : " hidden md:hidden lg:block"}`} onClick={toggle}>
            <div className="lg:flex block lg:items-center lg:justify-between">
              <div className="links ">
                {user?.type === "admin" ? (
                  <Link to="/owlet/dashboard" className="px-5 mx-1 block lg:inline my-[16px] ">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    {isLogged && (
                      <Link to="/owlet/wallet" className="px-5 mx-1 block lg:inline my-[16px] ">
                        Wallet
                      </Link>
                    )}
                    {placeholder.map(
                      (link, index) =>
                        link.caption !== "Wallet" &&
                        link.caption !== "Profile" &&
                        link.caption !== "Dashboard" && (
                          <Link to={`/owlet/${link.link}`} className="px-5 mx-1 block lg:inline-block my-[16px] " key={index + link.link}>
                            {link.caption}
                          </Link>
                        )
                    )}
                  </>
                )}
              </div>
              {isLogged ? (
                <>
                  <Link onClick={logout} className="p-2 rounded-[8px] bg-black text-white  lg:inline-block block my-[16px] mr-3 ">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  </Link>
                  <Link to="/owlet/profile" className=" items-center gap-3  mx-auto flex ">
                    <img src={avartar} width="30px" />
                    <span>
                      {user?.first_name} {user?.last_name}
                    </span>
                  </Link>
                </>
              ) : (
                <div className="auth">
                  <Link to="/sign-in" className="px-10  font-black underline lg:inline-block block my-[16px] ">
                    Log In
                  </Link>
                  <Link to="/sign-up" className="px-10  py-5 rounded-full lg:inline w-2/4 mx-auto bg-primary block ">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
      <div className="bg-signify p-[16px] text-center gap-10 flex justify-center">
        <Link to="/terms">Terms & Condition</Link>
        <Link to="/about-us">About Us</Link>
        <Link to="/faq">FAQs</Link>
      </div>
    </>
  )
}
export default Container
