/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Input from "../../components/input"
import Button from "../../components/button"
import axios from "axios"
import { useForm } from "react-hook-form"

const DashBoard = () => {
  const { handleSubmit, control } = useForm()
  const [change, setChange] = useState(false)
  const url = import.meta.env.VITE_APP_API_URL

  const [commision, setCommision] = useState([])
  const createCommision = async (data) => {
    const req = await axios.post(`${url}commision`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })

    console.log(req)
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

  const defaultCommision = async (id) => {
    const req = await axios.get(`${url}commision/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    allCommision()
  }

  useEffect(() => {
    allCommision()
  }, [change])
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(createCommision)}>
          <Input label="Commision" name="commision" type="number" control={control} />
          <Button type="submit">Add Commision</Button>
        </form>
        <p className="text-3xl py-3">Commisions</p>
        {commision.length
          ? commision.map((e) => (
              <div key={e.commision} className="flex gap-5  items-center my-3">
                <p className="p-1">
                  {e.commision} <span>{e.created_at.split("T")[0]}</span>{" "}
                </p>
                {e.primary ? (
                  "Primary Commision"
                ) : (
                  <button className="p-3 bg-primary rounded-[16px]" onClick={() => defaultCommision(e.id)}>
                    Change Primary
                  </button>
                )}
              </div>
            ))
          : ""}
      </div>
    </>
  )
}

export default DashBoard
