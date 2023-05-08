import { Link, Outlet } from "react-router-dom"

const Container = () => {
  const links = [
    { name: "Phone Airtime", to: "/" },
    { name: "Internet Data", to: "/" },
    { name: "Tv Subscription", to: "/" },
    { name: "Electricity Bill", to: "/" },
    { name: "Education", to: "" }
  ]
  return (
    <div className="">
      <div className="border-b">
        <div className=" container px-[100px] py-[35px] mx-auto flex items-center justify-between">
          <h2>
            <Link to="/">LOGO</Link>
          </h2>
          <div className="links ">
            {links.map((link, index) => (
              <Link to={link.to} className="px-5 mx-1 " key={index + link.name}>
                {link.name}
              </Link>
            ))}
          </div>
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
    </div>
  )
}
export default Container
