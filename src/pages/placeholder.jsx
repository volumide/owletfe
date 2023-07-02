/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom"
import links from "../utls/subscriptions"
import Button from "../components/button"
import { useContext, useEffect, useRef, useState } from "react"
import { description, placeholder } from "../utls/links"
import logos from "../utls/logo"

import allForms from "./forms"
import AppContext from "../context/app-context"

const Placeholder = () => {
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const { name, type } = useParams()
  const [proceeds, setProceeds] = useState(false)
  const [currentLogo, setCurrentLogo] = useState("")
  const screenSize = window.innerWidth
  const emptyIcon = placeholder.findIndex((i) => i.link === name)
  const formSum = useRef(null)
  const next = () => setProceeds(!proceeds)
  const [showNav, setNav] = useState(true)

  const SideNavigations = () => {
    const { restricted } = useContext(AppContext)
    return (
      <>
        <div className={`md:w-2/6 shrink-0  md:border-r h-screen py-10  ${showNav ? "block" : "hidden"} md:block `}>
          <p className="flex items-center gap-4 ">
            {proceeds && (
              <>
                <i className="fa-solid fa-arrow-left-long my-5 font-bold  cursor-pointer" role="button" onClick={next} />
              </>
            )}
            <span className="text-2xl">{description[name].title}</span>
          </p>
          <p className="text-ddgray">{description[name].caption}</p>
          {links[name].map(
            (link) =>
              !restricted[link.title] && (
                <Link
                  to={`/owlet/${name}/${link.title}?service=${link.service || link.name}`}
                  key={link.name}
                  className="my-5 flex items-center gap-2"
                  onClick={() => {
                    setNav(!showNav)
                    if (logos?.[link.cat]?.[link.logo]) {
                      setCurrentLogo(logos[link.cat][link.logo])
                      localStorage.setItem("logo", logos[link.cat][link.logo])
                    }
                  }}
                >
                  <div className="w-[40px] h-[40px] border-2 p-2 rounded-full overflow-hidden  ">
                    <img src={logos?.[link.cat]?.[link.logo] || ""} alt="" className="w-full h-full object-contain" />
                  </div>
                  {link.title}
                </Link>
              )
          )}
        </div>
      </>
    )
  }

  const MainForm = () => {
    return (
      <div className={`lg:w-3/6 grow-0 py-10 px-[16px] lg:px-[127px] h-full ${showNav ? "hidden" : "block"} md:block`} ref={formSum}>
        {type ? (
          <>
            {name !== "wallet" && name !== "dashboard" && (
              <div className="w-[70px] h-[70px] border-2 mb-[16px] p-3 rounded-full overflow-hidden  ">
                <img src={currentLogo} alt="" className="w-full h-full object-contain" />
              </div>
            )}
            {allForms[name]}
          </>
        ) : (
          <div className="w-[100px] h-[100px] bg-[#f4f4f4] p-5 rounded-full overflow-hidden mx-auto mt-20">
            <img src={placeholder[emptyIcon].icon} alt="" className="w-full h-full object-contain grayscale" />
          </div>
        )}
      </div>
    )
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (token && user) setLoggedIn(true)
  }, [])

  return (
    <>
      <div className="h-screen overflow-auto md:flex  mx-auto px-[16px] md:px-[100px]">
        <button className="h-[50px] w-[50px] bg-input  md:hidden  text-center rounded-full flex justify-center items-center mt-5" onClick={() => setNav(!showNav)}>
          {!showNav ? <i className="fa-solid fa-arrow-left-long my-5 font-bold  cursor-pointer" role="button" /> : <i className="fa-solid fa-arrow-right-long my-5 font-bold  cursor-pointer" role="button" />}
        </button>
        <SideNavigations />
        <MainForm />
      </div>
    </>
  )
}
export default Placeholder

export const Confirm = ({ form = [], obj = {}, name, ev, type }) => {
  const { com } = useContext(AppContext)
  const navigate = useNavigate()
  const user = localStorage.getItem("user")
  const formDt = JSON.parse(localStorage.getItem("fmDt"))

  console.log(formDt.amount)
  const convinience = com?.[type] || 0
  const walletWithdraw = () => {
    if (parseInt(formDt.amount) < 1) navigate("/")
    navigate("/transaction?type=wallet_withdraw")
  }
  const completeTransaction = () => {
    if (parseInt(formDt.amount) < 1) navigate("/")
    ev ? ev() : navigate("/transaction")
  }
  const exept = ["requestId", "request_id", "serviceID"]

  return (
    <>
      <h3>Confirm Details</h3>
      <p>Confirm the details below are corect</p>
      <div className="bg-[#F4F6FA] p-5 rounded-[24px] my-10">
        {form.map((i) => (
          <div className="my-[16px]" key={i?.name}>
            <h1 className="text-base font[600]">{i?.label}</h1>
            <p>{name?.data?.[i.name]}</p>
          </div>
        ))}
        {Object.keys(obj).length
          ? Object.keys(obj).map(
              (i) =>
                !exept.includes(i) && (
                  <div className="my-[16px]" key={i}>
                    <h1 className="text-base font[600] capitalize">{i === "reason" ? "Service" : i}</h1>
                    <p>{obj[i]}</p>
                  </div>
                )
            )
          : ""}
        <div className="my-[16px]">
          <h1 className="text-base font[600]">Convenience Fee</h1>
          <p>{com?.[type] || 0}</p>
        </div>
        <div className="my-[16px]">
          <h1 className="text-base font[600]">Total payable amount</h1>
          <p>{parseInt(com?.[type] || 0) + parseInt(formDt.amount)}</p>
        </div>
      </div>
      {user && user !== "undefined" && (
        <Button bg="transaprent" otherClass="border border-2" onClick={walletWithdraw}>
          <i className="fa-solid fa-building-columns mr-3" />
          Pay with wallet
        </Button>
      )}

      <Button bg="transaprent" onClick={completeTransaction} otherClass="border border-2 my-5">
        <i className="fa-solid fa-credit-card mr-3" /> Pay with Card
      </Button>
    </>
  )
}
