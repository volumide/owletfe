/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button"
import axios from "axios"
import { useContext, useState } from "react"
import { useEffect } from "react"
import { baseUrl } from "../../utls/url"
import DataTable from "react-data-table-component"
import { Confirm } from "../placeholder"
import { toast } from "react-toastify"
import AppContext from "../../context/app-context"

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
      {type === "Transaction History" ? <Transaction transact={transactions} /> : <WalletBalance transact={latest} wallet_balance={wallet || 0} setWallet={setWallet} />}
    </>
  )
}

export default Wallet

const WalletBalance = ({ transact = [], wallet_balance, setWallet }) => {
  const callback = window.location.href
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [isFund, setFund] = useState(false)
  const [transfer, setTransfer] = useState(false)
  const [amount, setAmount] = useState()
  const url = baseUrl
  const { userName, user } = useContext(AppContext)
  const [allUsers, setUsers] = useState([])
  const [list, setList] = useState([])
  const [search, setSearch] = useState("")
  const [data, setData] = useState({})

  const payment = async () => {
    let realValue = ""
    if (amount && parseInt(amount) >= 1 && !queries.reload) realValue = amount
    if (queries.reload && parseInt(queries.reload) > 0) realValue = queries.reload

    if (!realValue) {
      toast.error("invalid amount")
      // alert("invalid amount")
      return
    }

    const data = {
      amount: realValue * 100,
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
    // console.log(result)
    if (result.status) {
      // Close the current window
      window.open("", "_self", "")
      window.close()

      // Open a new window
      window.location.replace(result.data.authorization_url)
      //console.log(result.data.link)
    }
  }

  const getAllUsers = async () => {
    try {
      const users = await axios.get(baseUrl + "user", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      setUsers(users.data.data)
    } catch (error) {
      // console.log(error)
    }
  }

  const filterUsers = async (e) => {
    const value = e.target.value
    setSearch(value)
    if (value && value.length > 1) {
      const dt = allUsers.filter((ev) => (ev.id !== user.id && ev.first_name.toLowerCase().includes(value.toLowerCase())) || ev.last_name.toLowerCase().includes(value.toLowerCase()))
      setList(dt)
      return
    }
    setList([])
  }

  const transferFund = async () => {
    if (data.amount < 1) {
      toast.error("cannot procced with transfer")
      return
    }

    if (parseInt(wallet_balance) < data.amount) {
      toast.warn("insufficient balance")
      return
    }

    if (!data.id || !data.amount) {
      toast.info("all fields are compulsory")
      return
    }

    try {
      const res = await axios.post(baseUrl + "transfer", data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      // console.log(res)
      setWallet(parseInt(wallet_balance) - data.amount)
      setFund(!isFund)
      setTransfer(!transfer)
    } catch (err) {
      toast.info("unable to perfom operation")
    }
  }

  useEffect(() => {
    if (queries.reload) {
      setTimeout(() => {
        payment()
      }, 1000)
    }
  }, [])

  return (
    <div>
      <div className="card bg-black text-white h-[300px] rounded-[24px] flex justify-between  p-3 md:p-[40px] relative">
        <>
          <p className="flex justify-between items-center">
            <span className="text-[#acff28]">@{userName}</span>
            <span>
              Wallet Balance
              <span className="block text-3xl mt-2">NGN{wallet_balance}</span>
            </span>
          </p>

          <div>
            {isFund ? (
              <>
                {!transfer ? (
                  <form className="lg:flex lg:gap-3 w-full">
                    <input className="bg-white mb-3 block md:mb-0 text-black py-[16px] rounded-default w-full lg:flex-1" type="number" onChange={(e) => setAmount(e.target.value)} min={1} />
                    <div>
                      <Button otherClass="px-10 text-black" type="button" onClick={payment}>
                        Fund Wallet
                      </Button>
                    </div>
                  </form>
                ) : (
                  <form>
                    <div className="lg:flex lg:gap-3 w-full">
                      <input className="bg-white mb-3 block md:mb-0 text-black py-[16px] px-3 w-full lg:flex-1" type="number" onChange={(e) => setData({ ...data, amount: e.target.value })} placeholder="amount" min={1} />
                      <input className="bg-white mb-3 block md:mb-0 text-black py-[16px] px-3 w-full lg:flex-1" type="test" onChange={filterUsers} placeholder="@user" value={search} />
                    </div>
                    <div className="w-full mt-3">
                      <Button otherClass="px-10 text-black" type="button" onClick={transferFund}>
                        Transfer
                      </Button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              <div className="flex gap-2 md:gap-5 flex-wrap lg:flex-nowrap">
                <Button
                  otherClass="px-10 text-black bg-white border-primary"
                  onClick={() => {
                    getAllUsers()
                    setFund(!isFund)
                    setTransfer(!transfer)
                  }}
                >
                  Wallet Transfer
                </Button>
                <Button otherClass="px-10 text-black" onClick={() => setFund(!isFund)}>
                  Fund Wallet
                </Button>
              </div>
            )}
          </div>
        </>
      </div>
      {list.length ? (
        <div className="bg-white text-black shadow-sm mt-5 max-h-[500px] overflow-auto p-5 rounded-[8px]">
          {list.map((l) => (
            <p
              className="my-1 p-2 block"
              key={l.id}
              role="button"
              onClick={() => {
                setData({ ...data, id: l.id })
                setSearch("@" + l.first_name.replace(/ /g, "_") + l.id.toString().padStart(3, "0"))
                setList([])
              }}
            >
              {l.first_name.replace(/ /g, "_") + l.id.toString().padStart(3, "0")}
              <small className="block text-gray">
                {l.first_name} {l.last_name}{" "}
              </small>
            </p>
          ))}
        </div>
      ) : (
        ""
      )}

      {transact.length ? (
        <>
          <p className="text-2xl mt-[20px]">Recent Transaction</p>
          {transact.map((el, i) => (
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
        </>
      ) : (
        <p className="text-center mt-[20px]">No record found</p>
      )}
    </div>
  )
}

const Transaction = ({ transact = [] }) => {
  const [proceed, setProceed] = useState(false)
  const [form, setForm] = useState()
  const [detail, setDetail] = useState({})
  const navigate = useNavigate()

  const reWork = (data) => {
    if (!data.requestId) {
      navigate(`/owlet/wallet/Wallet%20Overview?service=wallet%20balance&reload=${data.amount}`)
      return
    }
    if (!data.data) {
      // console.log("can't perfom trnasaction")
      toast("can't perform transaction")
      return
    }

    const resp = data.data
    localStorage.setItem("fmDt", resp)
    setForm(JSON.parse(resp))
    setProceed(true)
  }

  const seeDetails = (dt) => {
    setDetail({})
    if (dt) setDetail(JSON.parse(dt))
  }

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
      minWidth: "150px",
      selector: (row) => <span className="block text-ddgray">{row.transaction_id}</span>
    },
    {
      name: "Amount",
      selector: (row) => row.amount
    },
    {
      name: "Date",
      selector: (row) => row.created_at.split("T")[0]
    },
    {
      name: "Action",
      minWidth: "250px",
      selector: (row) => (
        <div className="p-1">
          <button title="redo" onClick={() => reWork(row)} className="bg-valid font-[600] rounded-full p-1 px-3 text-white">
            <i className="fa-solid fa-arrow-rotate-right mr-1  "></i> Repeat
          </button>
          <label htmlFor="my-modal-5" role="button" id="md-button" title="details" onClick={() => seeDetails(row.data)} className="font-[600] rounded-full p-1 px-3 border border-stroke ml-1">
            Details
          </label>
        </div>
      )
    }
  ]

  const Det = ({ title, content }) => (
    <>
      {content && (
        <>
          {/* <small className="capitalize p-1 px-2 rounded-full bg-success text-white ">{detail?.status}</small> */}
          <p className="py-2">
            <span className="text-xs">{title}</span>
            <span className="block">{content} </span>
          </p>
        </>
      )}
    </>
  )

  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <label className="modal" htmlFor="my-modal-5">
        <div className="modal-box  bg-white">
          {/* <small className="capitalize p-1 px-2 rounded-full bg-success text-white ">{detail?.status}</small> */}
          <Det title="Product" content={detail?.reason} />
          <Det title="Amount" content={detail?.amount} />
          <Det title="Contact" content={detail?.phone} />
          <Det title="Subscribed Number" content={detail?.billersCode} />
          <Det title="Type" content={detail?.variation_code} />
        </div>
      </label>
      <div>{proceed ? <Confirm obj={form} /> : <DataTable columns={column} data={transact} title="Transaction History" responsive pagination paginationPerPage="15" />}</div>
    </>
  )
}
