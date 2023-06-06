/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Input from "../../components/input"
import Button from "../../components/button"
import axios from "axios"
import { useForm } from "react-hook-form"
import { baseUrl } from "../../utls/url"

const DashBoard = () => {
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

  const defaultCommision = async (id) => {
    const req = await axios.put(
      `${url}commision/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      }
    )
    allCommision()
  }

  useEffect(() => {
    allCommision()
  }, [change])
  return (
    <>
      <div className=" w-100 p-5 mx-auto md:4/5 lg:w-3/5">
        <form onSubmit={handleSubmit(createCommision)}>
          <Input label="Commision" name="commision" type="number" control={control} />
          <Button type="submit">Add Charges</Button>
        </form>
        {commision.length && (
          <>
            <p className="text-3xl py-3">Charges Logs</p>
            {commision.map((e) => (
              <div key={e.commision} className="flex gap-5  items-center my-3">
                <p className="p-1">
                  NGN{e.commision} <span>{e.created_at.split("T")[0]}</span>{" "}
                </p>
                {e.primary ? (
                  "Primary Charge fee"
                ) : (
                  <button className="p-3 bg-primary rounded-[16px]" onClick={() => defaultCommision(e.id)}>
                    Change default
                  </button>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </>
  )
}

export default DashBoard
