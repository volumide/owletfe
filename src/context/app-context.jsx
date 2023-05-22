import { createContext, useState } from "react"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formData, setFormData] = useState({})
  const [amount, setAmount] = useState({})
  const setForm = (data = "") => {
    localStorage.setItem("fmDt", JSON.stringify(data))
    setFormData({ data })
  }

  const setValue = (amount) => setAmount({ ...amount })

  return <AppContext.Provider value={{ formData, setForm, amount, setValue }}>{children}</AppContext.Provider>
}
