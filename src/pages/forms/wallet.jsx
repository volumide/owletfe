/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

const Wallet = () => {
  const url = import.meta.env.VITE_APP_API_URL

  const { type } = useParams()
  const [transactions, setTransactions] = useState([])
  const [latest, setLateest] = useState([])
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [wallet, setWallet] = useState("")
  const navigate = useNavigate()
  const getTransactions = async () => {
    const res = await axios.get(`${url}transactions/user`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    setTransactions(res.data.data)
    setLateest(res.data.latest)
  }

  const getWallet = async () => {
    const res = await axios.get(`${url}wallet`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    setWallet(res.data.user.wallet_balance)
    // setWallet(res.data)
  }

  const fundWallet = async () => {
    try {
      const topUp = await axios.post(
        `${url}top/up`,
        { amount: queries.amount },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      getTransactions()
      navigate("/owlet/wallet/Wallet%20Overview?service=wallet%20balance")
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (queries.amount) {
      console.log(queries)
      fundWallet()
    }
    getTransactions()
    getWallet()
  }, [type])

  return (
    <>
      <p className="capitalize mb-[24px] text-2xl">{queries.service}</p>
      {type === "Transaction History" ? <Transaction transact={transactions} /> : <WalletBalance transact={latest} wallet_balance={wallet || 0} />}
    </>
  )
}

export default Wallet

const WalletBalance = ({ transact = [], wallet_balance }) => {
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
      callback: callback + `&amount=${amount}`,
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

  return (
    <div>
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
              <span className="block text-3xl mt-2">NGN{wallet_balance}</span>
            </p>

            <div>
              <Button otherClass="px-10 text-black" onClick={() => setFund(!isFund)}>
                Fund Wallet
              </Button>
            </div>
          </>
        )}
      </div>
      <p className="text-2xl mt-[20px]">Recent Transaction</p>
      {transact.length &&
        transact.map((el, i) => (
          <div className="flex justify-between py-3 border-b" key={i}>
            <p>
              <span className="capitalize">{el.type === "wallet" ? el.type + " Transaction" : el.type}</span>

              <span className="block text-ddgray">Transaction ID: {el.transaction_id}</span>
            </p>
            <p className="text-right">
              NGN{el.amount}
              <span className="block text-ddgray">{el.created_at.split("T")[0]}</span>
            </p>
          </div>
        ))}
    </div>
  )
}

const Transaction = ({ transact = [] }) => {
  return (
    <>
      <div>
        {transact.length &&
          transact.map((el, i) => (
            <div className="flex justify-between py-3 border-b" key={i}>
              <p>
                <span className="capitalize">{el.type === "wallet" ? el.type + " Transaction" : el.type}</span>

                <span className="block text-ddgray">Transaction ID: {el.transaction_id}</span>
              </p>
              <p className="text-right">
                NGN{el.amount}
                <span className="block text-ddgray">{el.created_at.split("T")[0]}</span>
              </p>
            </div>
          ))}
      </div>
    </>
  )
}
