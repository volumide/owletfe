import { Link, Outlet } from "react-router-dom"
import { placeholder } from "../utls/links"

const Container = () => {
  return (
    <>
      <div className="border-b overflow-hidden  px-[16px]">
        <div className=" md:container lg:px-[100px] py-[35px] mx-auto flex items-center justify-between">
          <h2>
            <Link to="/">LOGO</Link>
          </h2>
          {/* <div className="links ">
            {placeholder.map((link, index) => (
              <Link to={`/owlet/${link.link}`} className="px-5 mx-1 " key={index + link.link}>
                {link.caption}
              </Link>
            ))}
          </div> */}
          <div className="auth">
            <Link to="/sign-in" className="px-10  font-black underline">
              Log In
            </Link>
            <Link to="/sign-up" className="px-10 py-5 rounded-full bg-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  )
}
export default Container
