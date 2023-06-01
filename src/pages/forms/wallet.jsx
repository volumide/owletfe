/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom"
import Button from "../../components/button"
import axios from "axios"
import { useState } from "react"

const Wallet = () => {
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { type } = useParams()

  // console.log(callback)

  return (
    <>
      <p className="capitalize mb-[24px] text-2xl">{queries.service}</p>
      {type === "Transaction History" ? <Transaction /> : <WalletBalance />}
    </>
  )
}

export default Wallet

const WalletBalance = () => {
  const callback = window.location.href
  const [isFund, setFund] = useState(false)
  const [amount, setAmount] = useState()
  const url = import.meta.env.VITE_APP_API_URL
  const payment = async (e) => {
    e.preventDefault()
    if (!amount || parseInt(amount) < 1) {
      alert("invalid amount")
      return
    }
    const data = {
      amount,
      callback,
      requestId: new Date().toISOString()
    }

    const user = JSON.parse(localStorage.getItem("user"))
    const req = await axios.post(
      url + "payment",
      { ...user, ...data },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    const result = req.data.body
    if (result.status === "success") {
      // Close the current window
      window.open("", "_self", "")
      window.close()

      // Open a new window
      window.location.replace(result.data.link)
      console.log(result.data.link)
    }
  }

  // const updateWallet =async () =>{

  // }
  return (
    <div className="card bg-black text-white h-[300px] rounded-[24px] flex justify-between p-[40px] items-end">
      {isFund ? (
        <form onSubmit={payment} className="flex gap-3 w-full">
          <input className="bg-white text-black p-1 rounded-[16px] w-full flex-1" type="number" onChange={(e) => setAmount(e.target.value)} />
          <div>
            <Button otherClass="px-10 text-black" type="submit">
              Fund Wallet
            </Button>
          </div>
        </form>
      ) : (
        <>
          <p>
            Wallet Balance
            <span className="block text-3xl mt-2">NGN20,000</span>
          </p>

          <div>
            <Button otherClass="px-10 text-black" onClick={() => setFund(!isFund)}>
              Fund Wallet
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

const Transaction = () => {
  return (
    <>
      <div className="flex justify-between py-3 border-b">
        <p>
          Wallet Funding
          <span className="block text-ddgray">Transaction ID: 168122366616812236665501858</span>
        </p>
        <p className="text-right">
          +20,000
          <span className="block text-ddgray">11th April 2023, 03:34PM</span>
        </p>
      </div>
    </>
  )
}
