import { Link, Outlet } from "react-router-dom"
import { placeholder } from "../utls/links"
import menu from "../assets/menu.png"
import { useContext, useState } from "react"
import AppContext from "../context/app-context"

const Container = () => {
  const [show, setShow] = useState(false)
  const { isLogged, logout } = useContext(AppContext)
  const toggle = () => {
    if (window.innerWidth <= 768) setShow(!show)
  }
  return (
    <>
      <div className="border-b border-b-input overflow-hidden  px-[16px]">
        <div className=" md:container lg:px-[100px] py-[35px] mx-auto flex items-center justify-between">
          <h2>
            <Link to="/">LOGO</Link>
          </h2>
          <button className={`w-[50px] h-[50px] bg-input rounded-full p-3 flex items-center justify-center lg:hidden`} onClick={toggle}>
            <img src={menu} alt="" />
          </button>

          <div className={`${show ? "absolute h-full w-full text-center left-0 p-5 top-[121px] bg-white z-10" : " hidden lg:block"}`} onClick={toggle}>
            <div className="lg:flex block lg:items-center lg:justify-between">
              <div className="links ">
                {isLogged && (
                  <Link to="/" className="px-5 mx-1 block lg:inline my-[16px]">
                    Wallet
                  </Link>
                )}
                {placeholder.map((link, index) => (
                  <Link to={`/owlet/${link.link}`} className="px-5 mx-1 block lg:inline my-[16px]" key={index + link.link}>
                    {link.caption}
                  </Link>
                ))}
              </div>
              {isLogged ? (
                <>
                  <Link onClick={logout} className="p-5  font-black underline lg:inline-block block my-[16px]">
                    Log out
                  </Link>
                  <Link to="/sign-up" className="p-5 rounded-[16px] lg:inline  mx-auto bg-primary block">
                    Profile
                  </Link>
                </>
              ) : (
                <div className="auth">
                  <Link to="/sign-in" className="px-10  font-black underline lg:inline-block block my-[16px]">
                    Log In
                  </Link>
                  <Link to="/sign-up" className="px-10 py-5 rounded-full lg:inline w-2/4 mx-auto bg-primary block">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Container
