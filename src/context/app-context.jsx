import { createContext, useEffect, useState } from "react"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formData, setFormData] = useState({})
  const [confirm, setConfirm] = useState(false)
  const [amount, setAmount] = useState({})
  const [isLogged, setLogged] = useState()
  const [user, setUser] = useState("")
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

  useEffect(() => {
    const token = localStorage.getItem("token")
    const user = localStorage.getItem("user")
    if (user) setUser(JSON.parse(user))

    if (token) setLogged(true)
    else setLogged(false)
  }, [isLogged])

  const setValue = (amount) => setAmount({ ...amount })

  return <AppContext.Provider value={{ formData, setForm, amount, setValue, setLogged, isLogged, logout, user, confirm, setConfirm }}>{children}</AppContext.Provider>
}
