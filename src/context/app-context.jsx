import { createContext, useEffect, useState } from "react"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formData, setFormData] = useState({})
  const [amount, setAmount] = useState({})
  const [isLogged, setLogged] = useState()
  const setForm = (data = "") => {
    localStorage.setItem("fmDt", JSON.stringify(data))
    setFormData({ data })
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setLogged(false)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setLogged(true)
    else setLogged(false)
  }, [isLogged])

  const setValue = (amount) => setAmount({ ...amount })

  return <AppContext.Provider value={{ formData, setForm, amount, setValue, setLogged, isLogged, logout }}>{children}</AppContext.Provider>
}
