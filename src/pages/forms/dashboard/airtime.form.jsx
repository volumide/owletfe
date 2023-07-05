import axios from "axios"
import { useState } from "react"
import { baseUrl } from "../../../utls/url"
import { toast } from "react-toastify"

const AirtimeNumbers = () => {
  const [allProviders, setProvider] = useState([])
  const [data, setData] = useState({})

  const addContact = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const submit = async (e) => {
    e.preventDefault()
    const newDt = [...allProviders]
    const key = allProviders.findIndex((e) => e.provider === data["provider"])
    if (key > -1) {
      try {
        await axios.put(baseUrl + "provider", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        newDt[key].number = data["number"]
        setProvider(newDt)
        toast.success("provider number updated successfuly")
      } catch (error) {
        toast.error("unable to process")
        console.log(error)
      }

      return
    }
    try {
      await axios.post(baseUrl + "provider", data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      setProvider([...allProviders, data])
      toast.success("provider created success")
    } catch (error) {
      toast.error("unable to process")
      console.log(error)
    }
  }

  const getAllProviders = async () => {
    try {
      const res = await axios.get(baseUrl + "providers", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      setProvider(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useState(() => {
    getAllProviders()
  }, [])

  return (
    <>
      <form onSubmit={submit}>
        <div>
          <label className="font[600]">Provider</label>
          <select className="border rounded-[16px] p-3 bg-white my-3 w-full" onChange={addContact} name="provider">
            <option value=""></option>
            {["mtn", "glo", "airtel", "etisalat"].map((provider) => (
              <option value={provider} key={provider}>
                {provider.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font[600]">Phone Number</label>
          <input className="border rounded-[16px] p-3 bg-white my-3 w-full" type="number" onChange={addContact} name="number" />
        </div>
        <button className="bg-black text-white rounded-[16px] ml-auto p-3 block">Add Provider</button>
      </form>

      {allProviders.length ? (
        <>
          <p className="text-2xl font-[600] py-3">Providers</p>
          {allProviders.map((provider) => (
            <p key={provider.provider} className="py-2 rounded shadow-sm my-3 ">
              <span className="uppercase font-[600]">{provider.provider}</span>
              <span className="block font-[600] text-ddgray">{provider.number} </span>
            </p>
          ))}
        </>
      ) : (
        ""
      )}
    </>
  )
}

export default AirtimeNumbers
