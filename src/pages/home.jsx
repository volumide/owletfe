import education from "../assets/home/education.png"
import electricity from "../assets/home/electricity.png"
import internet from "../assets/home/internet.png"
import phone from "../assets/home/phone.png"
import tv from "../assets/home/tv.png"
const Home = () => {
  const placeholder = [
    { icon: phone, caption: "Phone Airtime ", bg: "#EEFBF4", link: "" },
    { icon: internet, caption: "Internet Bill", bg: "#FAF1FF", link: "" },
    { icon: tv, caption: " Tv Subscription ", bg: "#F2F1FC", link: "" },
    { icon: electricity, caption: "Electricity Bill", bg: "#FFF6ED", link: "" },
    { icon: education, caption: "Education", bg: "#ECF8FF", link: "" }
  ]
  return (
    <div className="container mx-auto w-screen px-[100px] py-[54px]">
      <div>
        <h1>Welcome to abc payments</h1>
        <p className="text-ddgray">Select one of the services we provide below to proceed</p>
      </div>
      <div className="grid grid-cols-3  w-full gap-6 my-[56px]">
        {placeholder.map((i) => (
          <div className={` p-3 h-[292px] rounded-[32px] flex flex-col items-center justify-center bg-[${i.bg}]`} key={i}>
            <div className="h-[70px] ">
              <img src={i.icon} className="h-full" />
            </div>
            <p className="py-2">{i.caption}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
