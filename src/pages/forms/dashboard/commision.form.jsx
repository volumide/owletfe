/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Input from "../../../components/input"
import Button from "../../../components/button"
import axios from "axios"
import { useForm } from "react-hook-form"
import { baseUrl } from "../../../utls/url"
import DataTable from "react-data-table-component"

const Commision = () => {
  const { handleSubmit, control } = useForm()
  const [change, setChange] = useState(false)
  const url = baseUrl

  const [commision, setCommision] = useState([])
  const createCommision = async (data) => {
    const req = await axios.post(`${url}commision`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })

    // //console.log(req)
    setChange(!change)
  }

  const allCommision = async () => {
    const req = await axios.get(`${url}commisions`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    setCommision(req.data.data)
  }

  const defaultCommision = async (data) => {
    try {
      const req = await axios.put(
        `${url}commision/${data.id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
    } catch (error) {
      // console.log(error)
    }

    allCommision()
  }

  const columns = [
    {
      name: "#",
      selector: (row, i) => i + 1
    },
    { name: "Commision", selector: (row) => <>&#8358;{row.commision} </> },
    { name: "Date created", selector: (row) => row.created_at.split("T")[0] },
    {
      name: "Action",
      selector: (row) => row.primary,
      sortable: true,
      cell: (row) => <>{row.primary === "1" ? <i className="fa-solid fa-toggle-on text-valid text-2xl cursor-pointer" onClick={() => defaultCommision(row)}></i> : <i className="fa-solid fa-toggle-off text-error text-2xl cursor-pointer" onClick={() => defaultCommision(row)}></i>}</>
    }
  ]

  useEffect(() => {
    allCommision()
  }, [change])

  return (
    <>
      <div className="">
        <form onSubmit={handleSubmit(createCommision)} className="mb-10">
          <Input label="Commision" name="commision" type="number" control={control} />
          <Button type="submit">Add Charges</Button>
        </form>
        {commision.length && <>{commision.length && <DataTable columns={columns} data={commision} title="Commisions" />}</>}
      </div>
    </>
  )
}

export default Commision
