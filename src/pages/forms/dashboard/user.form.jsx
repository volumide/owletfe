import axios from "axios"
import { baseUrl } from "../../../utls/url"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { toast } from "react-toastify"

const Users = () => {
  const [users, setUsers] = useState([])
  const [unfiltered, setUnfiltered] = useState([])
  const [wallet, setWallet] = useState("")
  const [newValue, setNewValue] = useState("")
  const getUsers = async () => {
    try {
      const res = await axios.get(baseUrl + "user", { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      //   console.log(res.data.data)
      const result = res.data.data.reverse()
      setUsers(result)
      setUnfiltered(result)
    } catch (error) {
      //   console.log(error)
    }
  }

  const suspendUser = async (id, data) => {
    try {
      await axios.put(baseUrl + `user/${id}`, { suspend: data }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      getUsers()
    } catch (error) {
      //   console.log(error)
    }
  }

  const topUpWallet = async (id, data) => {
    const wallet = parseInt(data) + parseInt(newValue)
    try {
      await axios.put(baseUrl + `user/${id}`, { wallet_balance: wallet }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      getUsers()
      document.getElementById("controller").click()
      setNewValue("")
      toast("wallet top up successfully")
      // document.getElementById("input").val
    } catch (error) {
      //   console.log(error)
    }
  }

  const search = (e) => {
    const value = e.target.value
    if (value.length >= 3) {
      const dt = unfiltered.filter((ev) => ev?.first_name.toLowerCase().includes(value) || ev?.last_name.toLowerCase().includes(value.toLowerCase()) || ev?.email.toLowerCase().includes(value.toLowerCase()))

      if (dt.length) setUsers(dt)
      else setUsers(unfiltered)
      return
    }
    setTimeout(() => toast.info("No infomation found"), 2000)

    setUsers(unfiltered)
  }

  const column = [
    {
      name: "#",
      selector: (row, i) => i + 1
    },
    {
      name: "Name",
      minWidth: "250px",
      selector: (row) => (
        <>
          {row.first_name} {row.last_name}{" "}
        </>
      )
    },
    { name: "Email", minWidth: "250px", selector: (row) => row.email },
    { name: "Phone", minWidth: "150px", selector: (row) => row.phone },
    {
      name: "Action",

      cell: (row) => (
        <>
          {row.suspend === "0" ? <i className="fa-solid fa-toggle-on text-valid text-lg cursor-pointer" onClick={() => suspendUser(row.id, "1")}></i> : <i className="fa-solid fa-toggle-off text-error text-lg cursor-pointer" onClick={() => suspendUser(row.id, "0")}></i>}

          <label className="ml-3" htmlFor="my-modal-4" role="button" id="md-button" onClick={() => setWallet(row)}>
            <i className="fa-solid fa-wallet"></i>
          </label>
        </>
      )
    }
  ]

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <>
      <DataTable
        columns={column}
        data={users}
        title="Users"
        pagination
        paginationPerPage="15"
        subHeader
        subHeaderComponent={
          <div className=" w-full mb-3">
            <input type="search" className="border p-3 bg-transparent rounded-[16px]  w-full " placeholder="Search by payment id, transaction type" onChange={search} />{" "}
          </div>
        }
      />

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label className="modal" htmlFor="my-modal-4" id="controller">
        <div className="modal-box  bg-white">
          <p className="py-2">
            <span className="text-xs">Wallet Balance</span>
            <span className="block"> {wallet.wallet_balance || 0} </span>
          </p>
          <input className="border rounded-[16px] p-3 bg-white my-3 w-full" type="number" onChange={(e) => setNewValue(e.target.value)} value={newValue} />
          <button className="bg-black text-white rounded-[16px] ml-auto p-3 block" onClick={() => topUpWallet(wallet.id, wallet.wallet_balance)}>
            TopUp User Wallet
          </button>
        </div>
      </label>
    </>
  )
}

export default Users
