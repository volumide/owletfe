import axios from "axios"
import { baseUrl } from "../../../utls/url"
import { useEffect, useState } from "react"
import DataTable from "react-data-table-component"

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {
      const res = await axios.get(baseUrl + "user", { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      //   console.log(res.data.data)
      setUsers(res.data.data)
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

      cell: (row) => <>{row.suspend === "0" ? <i className="fa-solid fa-toggle-on text-valid text-lg cursor-pointer" onClick={() => suspendUser(row.id, "1")}></i> : <i className="fa-solid fa-toggle-off text-error text-lg cursor-pointer" onClick={() => suspendUser(row.id, "0")}></i>}</>
    }
  ]

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
      <DataTable columns={column} data={users} title="Users" pagination paginationPerPage="15" />
    </>
  )
}

export default Users
