import { createContext, useState } from "react"

const AppContext = createContext(null)
export default AppContext

// eslint-disable-next-line react/prop-types
export const OwletProvider = ({ children }) => {
  const [formObj, setFormObj] = useState()
  const [countries, setCountries] = useState()
  const [products, setProducts] = useState()
  const [ops, setOps] = useState()

  return <AppContext.Provider value={{ formObj, setFormObj, countries, products, ops, setCountries, setProducts, setOps }}>{children}</AppContext.Provider>
}
