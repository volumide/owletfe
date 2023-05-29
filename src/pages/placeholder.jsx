/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom"
import links from "../utls/subscriptions"
import Button from "../components/button"
import { useContext, useRef, useState } from "react"
import { description, placeholder } from "../utls/links"
import logos from "../utls/logo"

import allForms from "./forms"
import AppContext from "../context/app-context"

const Placeholder = () => {
  const navigate = useNavigate()
  const { isLogged } = useContext(AppContext)
  const { name, type } = useParams()
  const [proceed, setProceed] = useState(false)
  const [currentLogo, setCurrentLogo] = useState("")
  const [mobileView, setMobileView] = useState(false)
  const screenSize = window.innerWidth
  const emptyIcon = placeholder.findIndex((i) => i.link === name)
  const formSum = useRef(null)
  const next = () => setProceed(!proceed)

  const mobile = () => {
    if (screenSize <= 640) setMobileView(true)
  }

  const SideNavigations = () => (
    <>
      <div className="md:w-2/6 shrink-0  md:border-r h-full py-10">
        <p className="flex items-center gap-4 ">
          {proceed && (
            <>
              <i className="fa-solid fa-arrow-left-long my-5 font-bold  cursor-pointer" role="button" onClick={next} />
            </>
          )}
          <span className="text-2xl">{description[name].title}</span>
        </p>
        <p className="text-ddgray">{description[name].caption}</p>
        {links[name].map((link) => (
          <Link
            to={`/owlet/${name}/${link.title}?service=${link.service || link.name}`}
            key={link.name}
            className="my-5 flex items-center gap-2"
            onClick={() => {
              mobile()
              setCurrentLogo(logos[link.cat][link.logo])
              localStorage.setItem("logo", logos[link.cat][link.logo])
              formSum.current.scrollIntoView()
            }}
          >
            <div className="w-[40px] h-[40px] border-2 p-2 rounded-full overflow-hidden  ">
              <img src={logos[link.cat][link.logo]} alt="" className="w-full h-full object-contain" />
            </div>
            {link.title}
          </Link>
        ))}
      </div>
    </>
  )

  const MainForm = () => (
    <div className="md:w-4/6 grow-0 py-10 px-[16px] md:px-[127px] h-full" ref={formSum}>
      {type ? (
        <>
          <div className="w-[70px] h-[70px] border-2 mb-[16px] p-3 rounded-full overflow-hidden  ">
            <img src={currentLogo} alt="" className="w-full h-full object-contain" />
          </div>
          {allForms[name]}
        </>
      ) : (
        <div className="w-[100px] h-[100px] bg-[#f4f4f4] p-5 rounded-full overflow-hidden mx-auto mt-20">
          <img src={placeholder[emptyIcon].icon} alt="" className="w-full h-full object-contain grayscale" />
        </div>
      )}
    </div>
  )

  return (
    <>
      {isLogged ? (
        <div className="h-screen md:flex md:container mx-auto px-[16px] md:px-[100px]">
          <button className="h-[50px] w-[50px] bg-input sticky top-[50px] md:hidden  text-center rounded-full flex justify-center items-center mt-5" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left-long my-5 font-bold  cursor-pointer" role="button" />
          </button>
          <SideNavigations />
          <MainForm />
        </div>
      ) : (
        <p className="text-center p-10 text-lg">
          Login to access <span className="font-[600]">{name.toUpperCase()}</span> services
        </p>
      )}
    </>
  )
}
export default Placeholder

export const Confirm = ({ form = [], name, ev }) => {
  console.log(name.data)
  const navigate = useNavigate()
  const completeTransaction = () => {
    ev ? ev() : navigate("/transaction")
  }
  return (
    <>
      <h3>Confirm Details</h3>
      <p>Confirm the details below are corect</p>
      <div className="bg-[#F4F6FA] p-5 rounded-[24px] my-10">
        {form.map((i) => (
          <div className="my-[16px]" key={i.name}>
            <h1 className="text-base font[600]">{i.label}</h1>
            <p>{name.data[i.name]}</p>
          </div>
        ))}
        <div className="my-[16px]">
          <h1 className="text-base font[600]">Transaction satus</h1>
          <p>Initiated</p>
        </div>
      </div>
      <Button bg="transaprent" otherClass="border border-2">
        <i className="fa-solid fa-building-columns mr-3" />
        Pay with Bank Transfer
      </Button>
      <Button bg="transaprent" onClick={completeTransaction} otherClass="border border-2 my-5">
        <i className="fa-solid fa-credit-card mr-3" /> Pay with Card
      </Button>
    </>
  )
}
