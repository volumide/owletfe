/* eslint-disable react/prop-types */
import axios from "axios"
import { baseUrl, verifySubscription } from "../../../utls/url"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
const Transactions = () => {
  const [allTrans, setAllTrans] = useState([])
  const [detail, setDetail] = useState({})
  const getTransactionDetails = async (data) => {
    try {
      const bn = await verifySubscription(data.requestId)
      setDetail(bn?.content?.transactions)
    } catch (error) {
      //   console.log(error)
    }
  }
  const column = [
    {
      name: "#",
      selector: (row, i) => i + 1
    },
    {
      name: "Transaction Type",
      minWidth: "150px",
      selector: (row) => row.type
    },
    {
      name: "Payment id",
      minWidth: "150px",
      selector: (row) => row.transaction_id
    },
    {
      name: "VTpass id",
      minWidth: "150px",
      selector: (row) => row.requestId
    },
    {
      name: "Date",
      selector: (row) => row.created_at.split("T")[0]
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <label className="" htmlFor="my-modal-4" role="button" id="md-button" onClick={() => getTransactionDetails(row)}>
            <i className="fa-solid fa-eye text-success"></i>
          </label>
        </>
      )
    }
  ]
  const getAllTransactions = async () => {
    try {
      const res = await axios.get(baseUrl + "transactions", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      setAllTrans(res.data.data)
    } catch (error) {
      //   console.log(error)
    }
  }

  useEffect(() => {
    getAllTransactions()
  }, [])

  return (
    <div className="pb-10">
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label className="modal" htmlFor="my-modal-4">
        <div className="modal-box  bg-white">
          <small className="capitalize p-1 px-2 rounded-full bg-success text-white ">{detail?.status}</small>

          <p className="py-2">
            <span className="text-xs">Product</span>
            <span className="block">{detail?.product_name} </span>
          </p>
          <p className="py-2">
            <span className="text-xs">Amount</span>
            <span className="block">{detail?.amount} </span>
          </p>
          <p className="py-2">
            <span className="text-xs">Contact</span>
            <span className="block">{detail?.phone} </span>
          </p>
        </div>
      </label>
      <div className="mb-10">
        <DataTable columns={column} data={allTrans} title="All Transactions" responsive />
      </div>
    </div>
  )
}

export default Transactions
