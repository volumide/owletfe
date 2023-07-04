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
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Transaction = () => {
  const { commision, user } = useContext(AppContext)
  const [subscription, setSubscription] = useState()
  const [messsage, setMessage] = useState("processing transaction")
  const [details, setDetails] = useState()
  const [error, setError] = useState("")
  const [productName, setProductName] = useState()
  const [keys, setkeys] = useState([])
  const [detail, setDetail] = useState({})
  const [pdf, setPdf] = useState({})
  const [allRes, setAllRes] = useState()
  // const [paymentLink, setPaymentLink] = useState()
  const saveLogo = localStorage.getItem("logo")
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const callback = window.location.href
  const navigate = useNavigate()

  const subscribe = async () => {
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

    try {
      const result = await axios.post(baseUrl + "check/value", res, {
        headers: {
          "Content-Type": "application/json"
        }
      })
    } catch (error) {
      setMessage(error.response.data.message)
      return
    }


    let transId = ""

    try {
      const result = await axios.post(
        baseUrl + "transaction",
        {
          id: user?.id || "guest",
          phone: res.phone,
          reason: res.reason,
          amount: res.amount,
          requestId: request_id,
          ref: queries?.reference || "initiated",
          status_flutter: "initiated",
          "data": JSON.stringify(res)
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      transId = result.data.id
    } catch (error) {
      // console.log(error)
      toast.error("error connecting to server!")
      return
    }

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
          axios.put(
            baseUrl + `transaction/${transId}`,
            { tx_ref: queries?.reference, status: "inititated", status_flutter: "fail" },
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            }
          )
          return
        }
      } catch (error) {
        setMessage(error.response.data.message)
        return
      }

    res["request_id"] = request_id
    res["requestId"] = request_id

    let newRes = ""

    if (queries.type) {
      // toast("cannot perfom operation")
      // navigate("/")
      if (parseInt(res.amount) < 1) return
      try {
        const result = await axios.post(
          baseUrl + "withdraw",
          { ...res, "data": JSON.stringify(res) },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
        // console.log(result)
      } catch (error) {
        // console.log(error)
        setMessage(error.response.data.message)
        newRes = error.response.data.message
        return
      }
    }

    if (newRes) return

    if (!parseInt(res.amount) || parseInt(res.amount) < 1) {
      toast("cannot not topup wallet at this moment")
      return
    }

    const req = await paySubscripiton(res)

    if (req.response_description !== "TRANSACTION SUCCESSFUL") {
      setMessage(req.response_description)
      try {
        axios.put(
          baseUrl + `transaction/${transId}`,
          { tx_ref: queries?.reference || `wall_${transId}`, status: "success", status_flutter: "success" },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
      } catch (error) {
        // console.log(error)
      }
    } else {
      try {
        axios.put(
          baseUrl + `transaction/${transId}`,
          { tx_ref: queries?.reference || `wall_${transId}`, status: "fail", status_flutter: "fail" },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          }
        )
      } catch (error) {
        // console.log(error)
      }
    }
    const ans = req.content.transactions
    setSubscription(req)

    try {
      req.to = res.email
      await axios.post(baseUrl + "send/receipt", req, { headers: { "Content-Type": "application/json" } })
    } catch (error) {
      toast("unable to send receipt")
      console.log(error)
    }
    setDetail(ans)
    const { content, code, ...others } = ans
    setPdf(others)
    setAllRes(req)

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
      // console.log(body.amount)
      if (commision) {
        body["amount"] = (parseInt(body.amount) + parseInt(commision)) * 100
      } else {
        body["amount"] = parseInt(body.amount) * 100
      }
      // console.log(body.amount)
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

              <div className="flex justify-between flex-wrap">
                <Test title="Purchase code" content={allRes?.purchased_code} />
                <Test title="Token" content={allRes?.mainToken} />
                <Test title="Bonus Token" content={allRes?.bonusToken} />
                <Test title="Tax" content={allRes?.mainTokenTax} />
                <Test title="Token Unit" content={allRes?.mainTokenUnits} />
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
          <Test title="Customer Name" content={allRes?.customerName} />
          <Test title="Name" content={allRes?.Name} />
          <Test title="Address" content={allRes?.Address} />
          <Test title="Subsription Number" content={detail?.unique_element} />
          <Test title="Service" content={detail?.product_name} />
          <Test title="Amount" content={detail?.amount} />
          <Test title="Date" content={allRes?.transaction_date?.date} />
        </div>
        <hr className="my-2" />
        <div className="flex justify-between flex-wrap">
          <Test title="Purchase code" content={allRes?.purchased_code} />
          <Test title="Token" content={allRes?.mainToken} />
          <Test title="Bonus Token" content={allRes?.bonusToken} />
          <Test title="Tax" content={allRes?.mainTokenTax} />
          <Test title="Token Unit" content={allRes?.mainTokenUnits} />
        </div>

        <div className="flex justify-between flex-wrap">
          <Test title="Token" content={allRes?.Token} />
          <Test title="Meter Number" content={allRes?.MeterNumber} />
          <Test title="Tarif Rate" content={allRes?.TariffRate} />
          <Test title="Unit" content={allRes?.PurchasedUnits} />
          <Test title="Meter category" content={allRes?.MeterCategory} />
        </div>
        <div className="flex justify-between flex-wrap">
          <Test title="Code " content={allRes?.purchased_code} />
        </div>
        {allRes?.cards && <DataTable data={allRes?.cards} columns={columns} />}
      </div>
    </div>
  )
}

export default Transaction

// Email: therealowlet@gmail.com

// Pass : Owletpay098,
