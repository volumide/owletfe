/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom"
import links from "../utls/subscriptions"
import Input from "../components/input"
import Button from "../components/button"
import { useEffect, useState } from "react"
import { description } from "../utls/links"
import forms from "../utls/form"
import logos from "../utls/logo"
const Placeholder = () => {
  const { name, type } = useParams()
  const [proceed, setProceed] = useState(false)
  const next = () => {
    setProceed(!proceed)
  }

  useEffect(() => {
    setProceed(false)
  }, [type])

  return (
    <div className="h-screen  flex container mx-auto px-[100px]">
      <div className="w-2/6 shrink-0  border-r h-full py-10">
        <p className="flex items-center gap-2 text-3xl">
          {proceed && (
            <>
              <i className="fa-solid fa-arrow-left-long my-5 font-bold text-xl cursor-pointer" role="button" onClick={next} />
            </>
          )}
          {description[name].title}
        </p>
        <p className="text-ddgray">{description[name].caption}</p>
        {links[name].map((link) => (
          <Link to={`/owlet/${name}/${link.title}`} key={link.name} className="my-5 flex items-center gap-2">
            <div className="w-[40px] h-[40px] border-2 p-2 rounded-full overflow-hidden  ">
              <img src={logos[link.cat][link.logo]} alt="" className="w-full h-full object-contain" />
            </div>
            {link.title}
          </Link>
        ))}
      </div>
      <div className="w-4/6 grow-0 py-10 px-[127px]">
        {type ? (
          <>
            <Form type={type} proceed={proceed} next={next} form={forms[description[name].form]} />
          </>
        ) : (
          "no content"
        )}
      </div>
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
