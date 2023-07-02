/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
import { useContext, useEffect, useState } from "react"
import { placeholder } from "../../../utls/links"
import links from "../../../utls/subscriptions"
import Button from "../../../components/button"
import axios from "axios"
import { baseUrl } from "../../../utls/url"
import AppContext from "../../../context/app-context"
import { toast } from "react-toastify"
const Services = () => {
  const exclude = ["Wallet", "Profile", "Dashboard"]
  const [toggles, setToggles] = useState({})
  const { restricted, com } = useContext(AppContext)
  const [commisions, setCommitions] = useState({})
  const excludes = {
    dashboard: true,
    wallet: true,
    profile: true
  }
  const changeToggle = (e) => {
    if (toggles[e]) {
      const v = { ...toggles }
      delete v[e]
      setToggles(v)
    } else setToggles({ ...toggles, [e]: e })
  }

  const getCommision = async () => {
    // console.log(com)
    const defaultCommision = com
    if (Object.keys(defaultCommision).length) {
      setCommitions(defaultCommision)
      return
    }

    const cat = Object.keys(links)
    const services = {}
    cat.forEach((j) => {
      if (!excludes[j]) {
        const service = links[j]
        service.forEach((k) => {
          const del = k.service || k.name
          services[del] = 0
        })
      }
    })
    setCommitions(services)
  }

  const submit = async () => {
    try {
      await axios.post(
        baseUrl + "service",
        { services: JSON.stringify(toggles) },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      toast.success("success on excluded service")
    } catch (error) {}

    try {
      await axios.post(
        baseUrl + "commision",
        { commision: JSON.stringify(commisions) },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      toast.success("success on commision creation")
    } catch (error) {}

    // console.log(toggles, result)
  }

  useEffect(() => {
    setToggles(restricted)
    getCommision()
  }, [])
  return (
    <div className="py-5">
      <p className="text-lg mb-10 font-[600]">Manage Services</p>
      {placeholder.map(
        (row) =>
          !exclude.includes(row.caption) && (
            <div key={row.caption} className="mb-5 ">
              <button className="block border-b w-full text-left py-2 text-2xl font-[600]">{row.caption} Service(s) </button>
              {links[row.link].map((e) => (
                <p key={e.name} className="py-1 flex items-center justify-between ">
                  <span className="capitalize">{e.name}</span>
                  <span>
                    {toggles[e.title] ? <i className="fa-solid fa-toggle-off text-error text-2xl cursor-pointer" onClick={() => changeToggle(e.title)}></i> : <i className="fa-solid fa-toggle-on text-valid text-2xl cursor-pointer" onClick={() => changeToggle(e.title)}></i>}
                    <input type="number" name={e.service || e.name} className="p-2 border bg-transparent ml-3 w-[70px] text-center appearance-none rounded-full" defaultValue={commisions?.[e.service || e.name]} onChange={(e) => setCommitions({ ...commisions, [e.target.name]: e.target.value })} />
                  </span>
                </p>
              ))}
            </div>
          )
      )}
      <Button otherClass="mt-[32px]" onClick={submit}>
        Submit
      </Button>
    </div>
  )
}

export default Services
