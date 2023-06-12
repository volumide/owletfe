import axios from "axios"
import { baseUrl } from "../../../utls/url"
import { useEffect, useState } from "react"

const Users = () => {
  const [users, setUsers] = useState([])
  const getUsers = async () => {
    try {
      const res = await axios.get(baseUrl + "user", { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      console.log(res)
      setUsers(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const headers = ["Name", "Phone", "Email", "Action"]
  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
      <p className="text-lg mb-5">All Users</p>
      <table className="table-auto w-full">
        <thead>
          <tr>
            {headers.map((head) => (
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left  leading-4 font-medium text-gray-500 uppercase tracking-wider" key={head}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tbody>
            <tr>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className=" leading-5 font-medium text-gray-900">John Doe</div>
              </td>
            </tr>
          </tbody>
        </tbody>
      </table>
    </>
  )
}

export default Users
