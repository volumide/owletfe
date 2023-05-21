import { createContext, useState } from "react"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formData, setFormData] = useState({})
  const setForm = (data = "") => {
    localStorage.setItem("fmDt", JSON.stringify(data))
    setFormData(data)
  }

  return <AppContext.Provider value={{ formData, setForm }}>{children}</AppContext.Provider>
}
