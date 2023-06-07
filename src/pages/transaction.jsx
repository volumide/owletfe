/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Button from "../components/button"
import { baseUrl, paySubscripiton } from "../utls/url"
import axios from "axios"
import AppContext from "../context/app-context"
const Transaction = () => {
  const { com } = useContext(AppContext)
  const [subscription, setSubscription] = useState()
  const [messsage, setMessage] = useState("processing transaction")
  const [details, setDetails] = useState()
  const [error, setError] = useState("")
  const [productName, setProductName] = useState()
  const [keys, setkeys] = useState([])
  // const [paymentLink, setPaymentLink] = useState()
  const saveLogo = localStorage.getItem("logo")
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())

  const subscribe = async () => {
    if (!queries.type) {
      if (Object.keys(queries).length && queries.status !== "successful") {
        setMessage(`transaction${queries.status}`)
        return
      }
    }
    const res = JSON.parse(localStorage.getItem("fmDt"))

    let newRes = ""
    if (queries.type) {
      console.log(res)
      try {
        const result = await axios.post(baseUrl + "withdraw", res, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        console.log(result)
      } catch (error) {
        setMessage(error.response.data.message)
        newRes = error.response.data.message
      }
    }
    if (newRes) return

    const req = await paySubscripiton(res)

    if (req.response_description !== "TRANSACTION SUCCESSFUL") {
      setMessage(req.response_description)
      return
    }
    const ans = req.content.transactions
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

    if (!queries.type) {
      const transactionBody = {
        amount: res.amount,
        type: "flutter_payment",
        status_flutter: queries.status,
        status: req.response_description,
        tx_ref: queries.tx_ref,
        transaction_id: queries.transaction_id,
        requestId: req.requestId,
        phone: res.phone
      }

      await axios.post(baseUrl + "transaction", transactionBody, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
    }

    localStorage.removeItem("fmDt")
  }

  const makePayment = async () => {
    try {
      const url = baseUrl + "payment"
      const body = JSON.parse(localStorage.getItem("fmDt"))
      body["amount"] = parseInt(body.amount) + parseInt(com)
      body["requestId"] = new Date().toISOString()
      if (queries.wallet) {
        return
      }

      const req = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      const result = req.data.body
      if (result.status === "success") {
        window.open("", "_self", "")
        window.close()

        window.location.replace(result.data.link)
      }
    } catch (error) {
      //console.log(error)
    }
  }

  useEffect(() => {
    if (!Object.keys(queries).length) makePayment()
    else subscribe()
  }, [])
  return (
    <>
      <div className="p-[16px] ">
        <div className="md:w-[500px]  border-2 border-input  rounded-[24px] mx-auto py-[48px] px-[59px]  md:my-[40px]">
          {subscription ? (
            <>
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
            </>
          ) : (
            <p className="text-center"> {messsage} </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Transaction

// Email: therealowlet@gmail.com

// Pass : Owletpay098,
