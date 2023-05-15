/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom"
import links from "../utls/subscriptions"
import Input from "../components/input"
import Button from "../components/button"
import { useEffect, useRef, useState } from "react"
import { description, placeholder } from "../utls/links"
import forms from "../utls/form"
import logos from "../utls/logo"
const Placeholder = () => {
  const navigate = useNavigate()
  const { name, type } = useParams()
  const [proceed, setProceed] = useState(false)
  const [currentLogo, setCurrentLogo] = useState("")
  const [mobileView, setMobileView] = useState(false)
  const screenSize = window.innerWidth
  const emptyIcon = placeholder.findIndex((i) => i.link === name)
  const formSum = useRef(null)
  const next = () => {
    setProceed(!proceed)
  }

  const mobile = () => {
    if (screenSize <= 640) setMobileView(true)
  }

  useEffect(() => {
    setProceed(false)
  }, [type])

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
            to={`/owlet/${name}/${link.title}`}
            key={link.name}
            className="my-5 flex items-center gap-2"
            onClick={() => {
              mobile()
              setCurrentLogo(logos[link.cat][link.logo])
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
          <Form type={type} proceed={proceed} next={next} form={forms[description[name].form]} />
        </>
      ) : (
        <div className="w-[100px] h-[100px] bg-[#f4f4f4] p-5 rounded-full overflow-hidden mx-auto mt-20">
          <img src={placeholder[emptyIcon].icon} alt="" className="w-full h-full object-contain grayscale" />
        </div>
      )}
    </div>
  )

  return (
    <div className="h-screen md:flex md:container mx-auto px-[16px] md:px-[100px]">
      <button className="h-[50px] w-[50px] bg-input sticky top-[50px] md:hidden  text-center rounded-full flex justify-center items-center mt-5" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-arrow-left-long my-5 font-bold  cursor-pointer" role="button" />
      </button>
      <SideNavigations />
      <MainForm />
    </div>
  )
}
export default Placeholder

const Form = ({ type, proceed, next, form = [] }) => {
  const naviate = useNavigate()
  return (
    <>
      <form action="">
        {!proceed ? (
          <>
            <h3>{type}</h3>
            {form.map((i) => (
              <Input label={i.label} type={i?.type || "text"} name={i.name} key={i.label} />
            ))}
            <div className="flex gap-3 mt-[32px]">
              <Button bg="transaprent" otherClass="border" disabled={!proceed}>
                Cancel
              </Button>
              <Button type="button" onClick={next}>
                Proceed
              </Button>
            </div>
          </>
        ) : (
          <>
            <Confirm />
            <Button bg="transaprent" otherClass="border border-2">
              <i className="fa-solid fa-building-columns mr-3" />
              Pay with Bank Transfer
            </Button>
            <Button bg="transaprent" otherClass="border border-2 my-5" onClick={() => naviate("/transaction")}>
              <i className="fa-solid fa-credit-card mr-3" /> Pay with Card
            </Button>
          </>
        )}
      </form>
    </>
  )
}

const Confirm = () => {
  return (
    <>
      <h3>Confirm Details</h3>
      <p>Confirm the details below are corect</p>
      <div className="bg-[#F4F6FA] p-5 rounded-[24px] my-10">
        <div className="my-[16px]">
          <h1 className="text-base font[600]">Phone Number</h1>
          <p>+2340123456789</p>
        </div>
        <div className="my-[16px]">
          <h1 className="text-base font[700]">Phone Number</h1>
          <p>+2340123456789</p>
        </div>
      </div>
    </>
  )
}
