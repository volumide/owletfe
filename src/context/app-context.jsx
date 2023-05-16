import { createContext, useState } from "react"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formObj, setFormObj] = useState()
  return <AppContext.Provider value={{ formObj, setFormObj }}>{children}</AppContext.Provider>
}
