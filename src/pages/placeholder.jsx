/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom"
import links from "../utls/subscriptions"
import Input from "../components/input"
import Button from "../components/button"
import { useEffect, useState } from "react"
const Placeholder = () => {
  const { name, type } = useParams()
  const [proceed, setProceed] = useState(false)
  const next = () => {
    console.log(proceed)
    setProceed(!proceed)
  }

  useEffect(() => {
    setProceed(false)
  }, [type])
  return (
    <div className="h-screen  flex container mx-auto px-[100px]">
      <div className="w-2/6 shrink-0  border-r h-full py-10">
        <h3 className="flex items-center gap-2">
          {proceed && (
            <>
              <i className="fa-solid fa-arrow-left-long my-5 font-bold text-xl cursor-pointer" role="button" onClick={next} />
            </>
          )}
          {name.toUpperCase().split("-").join(" ")}
        </h3>
        {links[name].map((link) => (
          <Link to={`/owlet/${name}/${link.title}`} key={link.name} className="block my-5">
            {link.title}
          </Link>
        ))}
      </div>
      <div className="w-4/6 grow-0 py-10 px-[127px]">
        {type ? (
          <>
            <Form type={type} proceed={proceed} next={next} />
          </>
        ) : (
          "no content"
        )}
      </div>
    </div>
  )
}
export default Placeholder

const Form = ({ type, proceed, next }) => {
  return (
    <>
      <form action="">
        {!proceed ? (
          <>
            <h3>{type}</h3>
            <Input label="Country" />
            <Input label="Product Type" />
            <Input type="number" label="Account ID" />
            <Input type="number" label="Amount" />
            <Input type="number" label="Phone" />
            <Input type="email" label="Email" />
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

// subscription

// Confirm Details
// Please confirm the details below are correct
// Bouquet
// ExtraView Access ₦2,900 + Dstv
// Premium ₦21,000
// Smartcard Number
// 01234567890
// Phone Number
// +2340123456789
// Amount
// ₦23,900 + ₦100 (convenience fee)
// Total payable amount
// ₦24,000
// Transaction ID
// 16805310982987817437742341
// Transaction Status
// Initiated
// Pay with Bank Transfer
// Pay with Card
