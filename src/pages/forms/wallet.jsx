/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import { baseUrl } from "../../utls/url"
import DataTable from "react-data-table-component"

const Wallet = () => {
  const url = baseUrl

  const { type } = useParams()
  const [transactions, setTransactions] = useState([])
  const [latest, setLateest] = useState([])
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [wallet, setWallet] = useState("")
  const [topUp, setTopUp] = useState("")
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
    // const top = localStorage.getItem("top-up")
    // if (top) return
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
    setTopUp(queries.amount)
    localStorage.setItem("top-up", queries.amount)
    if (response !== "success") {
      return
    }
  }

  const topIt = async () => {
    if (!topUp) return
    const res = await axios.post(
      `${url}top/up`,
      { amount: topUp },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    setTopUp("")
    getTransactions()

    navigate("/owlet/wallet/Wallet%20Overview?service=wallet%20balance")
  }

  useEffect(() => {
    getTransactions()
    getWallet()
    if (queries.amount) fundWallet()
  }, [type])

  useEffect(() => {
    if (topUp) {
      topIt()
    }
  }, [topUp])

  return (
    <>
      {/* <p className="capitalize mb-[24px] text-2xl">{queries.service}</p> */}
      {type === "Transaction History" ? <Transaction transact={transactions} /> : <WalletBalance transact={latest} wallet_balance={wallet || 0} />}
    </>
  )
}

export default Wallet

const WalletBalance = ({ transact = [], wallet_balance }) => {
  const callback = window.location.href
  const [isFund, setFund] = useState(false)
  const [amount, setAmount] = useState()
  const url = baseUrl

  const payment = async (e) => {
    e.preventDefault()
    if (!amount || parseInt(amount) < 1) {
      alert("invalid amount")
      return
    }
    const data = {
      amount: amount * 100,
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
    console.log(result)
    if (result.status) {
      // Close the current window
      window.open("", "_self", "")
      window.close()

      // Open a new window
      console.log(result.data.authorization_url)
      window.location.replace(result.data.authorization_url)
      //console.log(result.data.link)
    }
  }

  return (
    <div>
      <div className="card bg-black text-white h-[300px] rounded-[24px] flex justify-between  p-3 md:p-[40px] ">
        <>
          <p className="text-right">
            Wallet Balance
            <span className="block text-3xl mt-2">NGN{wallet_balance}</span>
          </p>

          <div>
            {isFund ? (
              <form onSubmit={payment} className="lg:flex lg:gap-3 w-full">
                <input className="bg-white mb-3 block md:mb-0 text-black py-[16px] rounded-default w-full lg:flex-1" type="number" onChange={(e) => setAmount(e.target.value)} />
                <div>
                  <Button otherClass="px-10 text-black" type="submit">
                    Fund Wallet
                  </Button>
                </div>
              </form>
            ) : (
              <div className=" flex">
                <Button otherClass="px-10 text-black" onClick={() => setFund(!isFund)}>
                  Fund Wallet
                </Button>
              </div>
            )}
          </div>
        </>
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
  const column = [
    {
      name: "Type",
      minWidth: "150px",
      cell: (row) => (
        <>
          <p>
            <span className="capitalize">{row.type === "wallet" ? row.type + " Top up" : row.type}</span>
          </p>
        </>
      )
    },
    {
      name: "Transaction Id",
      minWidth: "250px",
      selector: (row) => <span className="block text-ddgray">Transaction ID: {row.transaction_id}</span>
    },
    {
      name: "Amount",
      selector: (row) => row.amount
    },
    {
      name: "Date",
      selector: (row) => row.created_at.split("T")[0]
    }
  ]
  return (
    <>
      <div>
        <DataTable columns={column} data={transact} title="Transaction History" />
        {/* {transact.length &&
          transact.map((el, i) => (
            <div className="flex justify-between py-3 border-b" key={i}>
              <p>
                <span className="capitalize">{el.type === "wallet" ? el.type + " Top up" : el.type}</span>

                <span className="block text-ddgray">Transaction ID: {el.transaction_id}</span>
              </p>
              <p className="text-right">
                NGN{el.amount}
                <span className="block text-ddgray">{el.created_at.split("T")[0]}</span>
              </p>
            </div>
          ))} */}
      </div>
    </>
  )
}
