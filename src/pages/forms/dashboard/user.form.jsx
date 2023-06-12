import axios from "axios"
import { baseUrl } from "../../../utls/url"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {
      const res = await axios.get(baseUrl + "user", { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      console.log(res.data.data)
      setUsers(res.data.data)
    } catch (error) {
      console.log(error)
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

      cell: (row) => <>{row.primary || row.primary === "1" ? <i className="fa-solid fa-toggle-on text-valid text-2xl cursor-pointer"></i> : <i className="fa-solid fa-toggle-off text-error text-2xl cursor-pointer" onClick={() => console.log(row)}></i>}</>
    }
  ]

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
      <DataTable columns={column} data={users} title="Users" />
    </>
  )
}

export default Users
