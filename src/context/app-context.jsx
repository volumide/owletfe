import axios from "axios"
import { createContext, useEffect, useState } from "react"
import { baseUrl } from "../utls/url"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formData, setFormData] = useState({})
  const [confirm, setConfirm] = useState(false)
  const [amount, setAmount] = useState({})
  const [isLogged, setLogged] = useState()
  const [user, setUser] = useState("")
  const [com, setCom] = useState("")
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
      setCom(comm.data?.data?.commision || 0)
    } catch (error) {
      setCom(0)
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (user && user !== "undefined") setUser(JSON.parse(user))

    if (token) setLogged(true)
    else setLogged(false)
  }, [isLogged])

  useEffect(() => {
    getCommision()
  }, [])

  const setValue = (amount) => setAmount({ ...amount })

  return <AppContext.Provider value={{ com, formData, setForm, amount, setValue, setLogged, isLogged, logout, user, confirm, setConfirm }}>{children}</AppContext.Provider>
}
