/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import eduForm from "../../utls/form/education-form"
import { useContext, useEffect, useState } from "react"
import Button from "../../components/button"
import { getVariationCodes } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"
const Education = () => {
  const defaultForm = eduForm
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [packages, setPackages] = useState([])
  const { setForm, formData } = useContext(AppContext)
  const [newData, setNewData] = useState({})

  const submit = async (data) => {
    data.serviceID = queries.service
    if (!data.quantity) data.quantity = 1
    setProceed(true)
    setForm({ ...data, ...newData })
  }

  const handleChange = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const vCode = el.getAttribute("data-v")
    const exam = el.getAttribute("name")
    console.log(el)
    const value = e.target.value
    console.log(vCode, value)
    setNewData({ ...newData, amount: vCode, variation_code: value, exam_type: exam })
  }

  useEffect
  getVariationCodes
  useEffect(() => {
    if (queries.service)
      getVariationCodes(queries.service).then((e) => {
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
              i.select ? (
                <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true} onChange={handleChange}>
                  {packages.map((e) => (
                    <option value={e.variation_code} key={e.code} name={e.name} data-v={e.variation_amount}>
                      {e.name}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} defaultValue={newData?.[i.name]} />
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

export default Education
