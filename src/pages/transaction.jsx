/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react"
import Button from "../components/button"
import { baseUrl, paySubscripiton } from "../utls/url"
import axios from "axios"
import AppContext from "../context/app-context"
import logo from "../assets/logo.png"
import DataTable from "react-data-table-component"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const Transaction = () => {
  const { com, user } = useContext(AppContext)
  const [subscription, setSubscription] = useState()
  const [messsage, setMessage] = useState("processing transaction")
  const [details, setDetails] = useState()
  const [error, setError] = useState("")
  const [productName, setProductName] = useState()
  const [keys, setkeys] = useState([])
  const [detail, setDetail] = useState({})
  const [pdf, setPdf] = useState({})
  // const [paymentLink, setPaymentLink] = useState()
  const saveLogo = localStorage.getItem("logo")
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const callback = window.location.href

  const subscribe = async () => {
    // if (!queries.type) {
    //   if (Object.keys(queries).length && queries.status !== "successful") {
    //     setMessage(`transaction${queries.status}`)
    //     return
    //   }
    // }
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const hour = String(now.getHours()).padStart(2, "0")
    const minute = String(now.getMinutes()).padStart(2, "0")
    const randomNumber = Math.floor(Math.random() * 10000)
    const rnd = randomNumber.toString().padStart(4, "0")
    const request_id = `${year}${month}${day}${hour}${minute}OWLET${rnd}`
    const res = JSON.parse(localStorage.getItem("fmDt"))
    if (!queries.type)
      try {
        const result = await axios.post(
          baseUrl + "payment/verify",
          { id: queries.reference },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        const response = result.data.body.data.status
        if (response !== "success") {
          setMessage(`payment failure`)
          return
        }

        try {
          await axios.post(
            baseUrl + "transaction",
            {
              id: user?.id || "guest",
              phone: res.phone,
              reason: res.reason,
              amount: res.amount,
              requestId: request_id,
              ref: queries.reference,
              status_flutter: response
            },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        setMessage(error.response.data.message)
        return
      }

    res["request_id"] = request_id
    res["requestId"] = request_id

    let newRes = ""
    if (queries.type) {
      try {
        const result = await axios.post(baseUrl + "withdraw", res, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        // console.log(result)
      } catch (error) {
        setMessage(error.response.data.message)
        newRes = error.response.data.message
      }
    }
    if (newRes) return

    const req = await paySubscripiton(res)

    if (req.response_description !== "TRANSACTION SUCCESSFUL") {
      setMessage(req.response_description)
      // return
    }
    const ans = req.content.transactions
    setSubscription(req)

    setDetail(ans)
    const { content, code, ...others } = ans
    setPdf(others)

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

    setTimeout(() => {
      generatePDF("receipt")
    }, 3000)

    localStorage.removeItem("fmDt")
  }

  const makePayment = async () => {
    try {
      const url = baseUrl + "payment"
      const body = JSON.parse(localStorage.getItem("fmDt"))
      body["amount"] = (parseInt(body.amount) + parseInt(com)) * 100
      body["requestId"] = new Date().toISOString()
      body["callback"] = callback
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
      if (result.status) {
        window.open("", "_self", "")
        window.close()

        window.location.replace(result.data.authorization_url)
      }
    } catch (error) {
      //console.log(error)
    }
  }

  useEffect(() => {
    if (!Object.keys(queries).length) makePayment()
    else subscribe()
  }, [])

  const columns = [
    { name: "#", selector: (row, i) => i + 1 },
    { name: "Serial", selector: (row) => row.Serial },
    { name: "Pin", selector: (row) => row.Pin }
  ]

  const Test = ({ title, content }) =>
    content && (
      <div className="py-1">
        <span className="text-ddgray text-sm block">{title}</span>
        <span className="font-[14px]">{content}</span>
      </div>
    )

  const generatePDF = (name) => {
    const input = document.getElementById("pdf-content")
    input.classList.remove("invisible")
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF("p", "mm", "a4")
      const imgData = canvas.toDataURL("image/png")
      const imgWidth = 190 // Adjust the width as per your requirement
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight)
      pdf.save(`${name}.pdf`)
      input.classList.add("invisible")
    })
  }

  return (
    <div className="px-10">
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
                <h2>NGN{details?.[productName]}</h2>
              </div>
              <div className="md:flex md:flex-wrap md:justify-between lg:grid lg:grid-cols-2 gap-3 mt-[52px]">
                {keys.map((i) => (
                  <p key={i}>
                    {i}
                    <br />
                    <small>{details?.[i]}</small>
                  </p>
                ))}
              </div>

              <div className="md:flex gap-11 mt-[48px]">
                <Button bg="transaparent" otherClass="border mb-[16px] md:mb-0">
                  Report Transaction
                </Button>
                <Button onClick={() => generatePDF("owlet_recept")}>Download Receipt</Button>
              </div>
            </>
          ) : (
            <p className="text-center"> {messsage} </p>
          )}
        </div>
      </div>

      <div className="receipt border p-10 mb-10 rounded-[16px] invisible" id="pdf-content">
        <div className="flex items-center gap-10 font-[600]">
          <div>
            <img src={logo} width="100px" className="my-5" />
          </div>
          <p>
            <span className="text-ddgray">status : </span>
            {detail?.status}
          </p>
        </div>
        <div className="flex justify-between flex-wrap">
          <Test title="Tansaction id" content={detail?.transactionId} />
          <Test title="Email" content={detail?.email} />
          <Test title="Contact" content={detail?.phone} />
        </div>
        <hr className="my-2" />
        <div className="grid grid-cols-2">
          <Test title="Name" content={pdf?.customerName} />
          <Test title="Subsription Number" content={detail?.unique_element} />
          <Test title="Service" content={detail?.product_name} />
          <Test title="Amount" content={detail?.amount} />
          <Test title="Date" content={pdf?.transaction_date?.date} />
        </div>
        <hr className="my-2" />
        <div className="flex justify-between flex-wrap">
          <Test title="Token" content={pdf?.mainToken} />
          <Test title="Tax" content={pdf?.mainTokenTax} />
          <Test title="Token Unit" content={pdf?.mainTokenUnits} />
        </div>
        {pdf?.cards && <DataTable data={pdf?.cards} columns={columns} />}
      </div>
    </div>
  )
}

export default Transaction

// Email: therealowlet@gmail.com

// Pass : Owletpay098,
