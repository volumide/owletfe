import { useState } from "react"
import { placeholder } from "../../../utls/links"
import links from "../../../utls/subscriptions"
import Button from "../../../components/button"
const Services = () => {
  const exclude = ["Wallet", "Profile", "Dashboard"]
  const [toggles, setToggles] = useState({})
  const changeToggle = (e) => {
    if (toggles[e]) {
      const v = { ...toggles }
      delete v[e]
      setToggles(v)
    } else setToggles({ ...toggles, [e]: e })
  }
  return (
    <div className="py-5">
      <p className="text-lg mb-10 font-[600]">Manage Services</p>
      {placeholder.map(
        (row) =>
          !exclude.includes(row.caption) && (
            <div key={row.caption} className="mb-5 ">
              <button className="block border-b w-full text-left py-2 text-2xl font-[600]">{row.caption} Service(s) </button>
              {links[row.link].map((e) => (
                <p key={e.name} className="py-1 flex items-center justify-between capitalize">
                  <span>{e.name}</span>
                  {toggles[e.title] ? <i className="fa-solid fa-toggle-off text-error text-2xl cursor-pointer" onClick={() => changeToggle(e.title)}></i> : <i className="fa-solid fa-toggle-on text-valid text-2xl cursor-pointer" onClick={() => changeToggle(e.title)}></i>}
                </p>
              ))}
            </div>
          )
      )}
      <Button otherClass="mt-[32px]">Submit</Button>
    </div>
  )
}

export default Services
