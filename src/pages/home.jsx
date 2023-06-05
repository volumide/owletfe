import { Link } from "react-router-dom"
import { placeholder } from "../utls/links"
const Home = () => {
  return (
    <div className="  md:mx-auto w-screen p-[16px] md:px-[100px] md:py-[54px]">
      <div>
        <h1 className="">Welcome to owlet payments</h1>
        <p className="text-ddgray">Select one of the services we provide below to proceed</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3  w-full gap-6 my-[56px]">
        {placeholder.map(
          (i, index) =>
            i.caption !== "Wallet" &&
            i.caption !== "Profile" && (
              <Link className={` p-3 h-[292px] rounded-[32px] flex flex-col items-center justify-center ${i.bg}`} key={index} to={`/owlet/${i.link}`}>
                <div className="h-[70px] ">
                  <img src={i.icon} className="h-full" />
                </div>
                <p className="py-2">{i.caption}</p>
              </Link>
            )
        )}
      </div>
    </div>
  )
}

export default Home
