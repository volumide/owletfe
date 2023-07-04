import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { baseUrl } from "../utls/url"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formData, setFormData] = useState({})
  const [commision, setCommision] = useState()
  const [confirm, setConfirm] = useState(false)
  const [amount, setAmount] = useState({})
  const [isLogged, setLogged] = useState()
  const [user, setUser] = useState("")
  const [com, setCom] = useState("")
  const [userName, setUserName] = useState("")

  const [restricted, setRestricted] = useState({})
  const setForm = (data = "") => {
    localStorage.setItem("fmDt", JSON.stringify(data))
    setFormData({ data })
    setConfirm(true)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setLogged(false)
    setUser("")
  }

  const getCommision = async () => {
    try {
      const comm = await axios.get(baseUrl + "commision")
      sessionStorage.setItem("comm", comm.data?.data?.commision)
      setCom(JSON.parse(comm.data?.data?.commision) || 0)
    } catch (error) {
      setCom(0)
      // console.log(error)
    }
  }

  const getRestricted = async () => {
    const res = await axios.get(baseUrl + "service/latest", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    const result = res.data.data?.services
    // console.log(result)
    if (result) setRestricted(JSON.parse(result))
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (user && user !== "undefined") {
      const userObj = JSON.parse(user)
      if (!userObj.email_verified_at) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setUser("")
        setLogged(false)
        return
      }
      const pad = userObj.id.toString()
      const paddedSt = pad.padStart(3, "0")
      userObj.first_name.replace(/ /g, "_")
      setUserName(`${userObj.first_name}${paddedSt}`)
      setUser(userObj)
    }

    if (token) setLogged(true)
    else setLogged(false)
  }, [isLogged])

  useEffect(() => {
    getCommision()
    getRestricted()
  }, [])

  const setValue = (amount) => setAmount({ ...amount })

  return (
    <AppContext.Provider value={{ com, formData, setForm, amount, userName, setValue, setLogged, isLogged, logout, user, setUser, confirm, setConfirm, restricted, commision, setCommision }}>
      {user?.temporal === "true" ? <p className="text-center text-error p-1">You are using a temporal password, change your password</p> : ""}
      {children}
    </AppContext.Provider>
  )
}
