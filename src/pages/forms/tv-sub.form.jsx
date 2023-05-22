/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import tvForn from "../../utls/form/tv-form"
import { useEffect, useState, useContext } from "react"
import Button from "../../components/button"
import { getVariationCodes, verifyMerchant } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"

const TvForm = () => {
  const [subDetails, setSubDetails] = useState()
  const tvForms = tvForn
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [packages, setPackages] = useState([])
  const { setForm, formData } = useContext(AppContext)
  const [message, setMessage] = useState()
  const [newData, setNewData] = useState({})
  const submit = async (data) => {
    console.log(newData)
    setProceed(true)
    setForm({ ...data, ...newData })
  }

  const handleChange = async (e) => {
    const { name, value } = e.target
    if (e.target.value.length >= 10 && name === "billersCode") {
      console.log("working")
      const req = await verifyMerchant({
        serviceID: queries.service,
        billersCode: value
      })
      setNewData({ ...newData, "billersCode": value, serviceID: queries.service })
      setSubDetails(req.content)
      if (req.content.error) setMessage(req.content.error)
      else setMessage("")
      console.log(req)
    } else {
      const index = e.target.selectedIndex
      const el = e.target.childNodes[index]
      const v = el.getAttribute("name")
      const vCode = el.getAttribute("code")
      setNewData({ ...newData, "amount": el.value, "bouquet": v, variation_code: vCode })
    }
  }

  const dstvDetails = [
    { name: "Name", pointer: "Customer_Name" },
    { name: "Current Bouquet(s)", pointer: "Current_Bouquet" },
    { name: "Due Date", pointer: "Due_Date" },
    { name: "Renewal Amount", pointer: "Renewal_Amount" }
  ]

  useEffect(() => {
    if (queries.service)
      getVariationCodes(queries.service).then((e) => {
        console.log(e)
        setPackages(e.content.varations)
      })
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {proceed ? (
          <>
            <Confirm form={tvForn} name={formData} />
          </>
        ) : (
          <>
            <Input label="Smart Card Number" name="billersCode" onChange={handleChange} control={control} />
            {!message && subDetails && queries.service === "dstv" && (
              <div className="rounded-[16px] bg-input p-5">
                {dstvDetails.map((e) => (
                  <p className="py-3" key={e.pointer}>
                    <span className="block">{e.name}</span>
                    <span className="font-[700]">{subDetails?.[e.pointer]}</span>
                  </p>
                ))}
              </div>
            )}
            {message && <p className="bg-red-400 text-white my-3 p-5 rounded-[16px]">{message}</p>}

            {["dstv", "gotv"].includes(queries.service) && (
              <Input label="What do you want to do" name="subscription_type" onChange={handleChange} control={control} select>
                <option value="renew">Renew</option>
                <option value="change">Change</option>
              </Input>
            )}

            {tvForms.map((i) =>
              i.select ? (
                <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i.name} name={i.name} select onChange={handleChange}>
                  {packages.map((e) => (
                    <option value={e.variation_amount} key={e.name} name={e.name} code={e.variation_code}>
                      {e.name}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} value={newData?.[i.name]} />
              )
            )}

            <div className="flex gap-3 mt-[32px]">
              <Button type="button" bg="transaprent" otherClass="border" disabled={!proceed}>
                Cancel
              </Button>
              <Button type="submit">Proceed</Button>
            </div>
          </>
        )}
      </form>
    </>
  )
}

export default TvForm
