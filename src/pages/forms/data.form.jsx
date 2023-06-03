/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import internetForm from "../../utls/form/internet-form"
import { useContext, useEffect, useState } from "react"
import Button from "../../components/button"
import { getVariationCodes } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"

const InterneData = () => {
  const defaultForm = internetForm
  const { handleSubmit, control } = useForm()
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [packages, setPackages] = useState([])
  const [proceed, setProceed] = useState(false)
  const [newData, setNewData] = useState({})
  // const [formData, setFormData] = useState(defaultForm)
  const { setForm, formData, setValue, amount } = useContext(AppContext)

  const submit = async (data) => {
    data.serviceID = queries.service
    data = { ...data, ...newData }
    data["billersCode"] = data["phone"]
    // //console.log(data)
    // const { package_type, ...others } = data
    // //console.log(package_type, others)
    setProceed(true)
    setForm(data)
  }

  const options = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const amount = el.getAttribute("data-id")
    const code = el.getAttribute("value")
    // //console.log(code)
    setNewData({ ...newData, "variation_code": code, "amount": amount })
    setValue({ "amount": amount })
  }

  useEffect(() => {
    if (queries.service)
      getVariationCodes(queries.service).then((e) => {
        // //console.log("working")
        // //console.log(e)
        setPackages(e.content.varations)
      })
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {proceed ? (
          <>
            <Confirm form={defaultForm} name={formData} />
          </>
        ) : (
          <>
            {defaultForm.map((i) =>
              i.label === "Package" ? (
                <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true} onChange={options}>
                  {packages.map((e) => (
                    <option value={e.variation_code} key={e.name} data-id={e.variation_amount}>
                      {e.name}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} disabled={i.disabled} value={amount[i.name]} />
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

export default InterneData
