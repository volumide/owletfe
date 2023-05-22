import { useEffect, useState } from "react"
import Button from "../components/button"
import logo from "../utls/logo"
import { paySubscripiton } from "../utls/url"
const Transaction = () => {
  const [subscription, setSubscription] = useState()
  const [messsage, setMessage] = useState()
  const [details, setDetails] = useState()
  const [productName, setProductName] = useState()
  const [keys, setkeys] = useState([])
  const saveLogo = localStorage.getItem("logo")
  console.log(saveLogo)
  const makePayment = async () => {
    const res = JSON.parse(localStorage.getItem("fmDt"))
    const req = await paySubscripiton(res)

    console.log(req)
    const ans = req.content.transactions

    if (req.response_description === "TRANSACTION SUCCESSFUL") {
      setSubscription(req)
      setDetails({
        "Transaction Status": ans.status,
        "Transaction ID": ans.transactionId,
        "Phone Number": ans.phone,
        "Date": new Date(req.transaction_date.date).toGMTString(),
        [ans.product_name]: ans.amount
      })
      setProductName(ans.product_name)
      const keys = ["Phone Number", "Transaction Status", "Transaction ID", "Date"]
      setkeys(keys)
      return
    }
    setMessage(req.response_description)
  }

  useEffect(() => {
    makePayment()
  }, [])
  return (
    <>
      {subscription ? (
        <div className="p-[16px] ">
          <div className="md:w-[500px]  border-2 border-input  rounded-[24px] mx-auto py-[48px] px-[59px]  md:my-[40px]">
            <p className="text-center text-[24px] md:text-[32px]">Transaction Details</p>

            <div className="w-[70px] h-[70px] p-2 mx-auto  border-2 my-[44px] rounded-full">
              <img src={saveLogo} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="mt-[44px] text-center">
              <p>{productName}</p>
              <h2>NGN{details[productName]}</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-[52px]">
              {keys.map((i) => (
                <p key={i}>
                  {i}
                  <br />
                  <small>{details[i]}</small>
                </p>
              ))}
            </div>

            <div className="md:flex gap-11 mt-[48px]">
              <Button bg="transaparent" otherClass="border mb-[16px] md:mb-0">
                Report Transaction
              </Button>
              <Button>Download Receipt</Button>
            </div>
          </div>
        </div>
      ) : (
        messsage
      )}
    </>
  )
}

export default Transaction
