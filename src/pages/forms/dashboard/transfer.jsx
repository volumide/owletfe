import axios from "axios"
import { baseUrl } from "../../../utls/url"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { toast } from "react-toastify"

const Transfers = () => {
  const [users, setUsers] = useState([])
  const [unfiltered, setUnfiltered] = useState([])
  //   const [newValue, setNewValue] = useState("")
  const getTransfers = async () => {
    try {
      const res = await axios.get(baseUrl + "airtime/transfers", { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      const result = res.data.data
      setUsers(result)
      setUnfiltered(result)
    } catch (error) {
      //   console.log(error)
    }
  }

  const search = (e) => {
    const value = e.target.value
    if (value.length >= 3) {
      const dt = unfiltered.filter((ev) => ev?.provider.toLowerCase().includes(value) || ev?.name.toLowerCase().includes(value.toLowerCase()) || ev?.email.toLowerCase().includes(value.toLowerCase()) || ev?.number.toLowerCase().includes(value.toLowerCase()))

      if (dt.length) setUsers(dt)
      else setUsers(unfiltered)
      return
    }
    setUsers(unfiltered)
  }

  const updateStatus = async (status, id) => {
    try {
      axios.put(baseUrl + `airtime/transfers/${id}`, { status: status }, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      toast.info("status update success")
      getTransfers()
    } catch (error) {
      toast.info("unable to process at this moment")
    }
  }

  const column = [
    {
      name: "#",
      selector: (row, i) => i + 1
    },
    {
      name: "Name",
      minWidth: "250px",
      selector: (row) => row.name
    },
    { name: "provider", minWidth: "250px", selector: (row) => row.provider },
    { name: "Amount", minWidth: "150px", selector: (row) => row.amount },
    { name: "Number used", minWidth: "150px", selector: (row) => row.number },
    {
      name: "Action",
      minWidth: "250px",
      cell: (row) => (
        <>
          {row.status === "initiated" ? (
            <>
              {" "}
              <button className="p-1 px-2 me-1 rounded-full border" onClick={() => updateStatus("approved", row.id)}>
                approve
              </button>
              <button className="p-1 px-2 me-1 rounded-full border bg-error text-white" onClick={() => updateStatus("denied", row.id)}>
                deny
              </button>
            </>
          ) : (
            <span className="capitalize">{row.status}</span>
          )}
        </>
      )
    }
  ]

  useEffect(() => {
    getTransfers()
  }, [])

  return (
    <>
      <DataTable
        columns={column}
        data={users}
        title="Airtime Transfers"
        pagination
        paginationPerPage="15"
        subHeader
        subHeaderComponent={
          <div className=" w-full mb-3">
            <input type="search" className="border p-3 bg-transparent rounded-[16px]  w-full " placeholder="search by status, provider, name, email" onChange={search} />{" "}
          </div>
        }
      />
    </>
  )
}

export default Transfers
