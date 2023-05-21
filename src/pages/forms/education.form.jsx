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
  const submit = async (data) => {
    data.serviceID = queries.service
    setProceed(true)
    setForm(data)
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
        {defaultForm.map((i) =>
          i.select ? (
            <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true}>
              {packages.map((e) => (
                <option value={e.variation_code} key={e.code}>
                  {e.name}
                </option>
              ))}
            </Input>
          ) : (
            <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} />
          )
        )}
        <div className="flex gap-3 mt-[32px]">
          <Button type="button" bg="transaprent" otherClass="border" disabled={!proceed}>
            Cancel
          </Button>
          <Button type="submit">Proceed</Button>
        </div>
        {proceed ? (
          <>
            <Confirm form={defaultForm} name={formData} ev={() => console.log(formData)} />
            {/* <Button bg="transaprent" otherClass="border border-2">
              <i className="fa-solid fa-building-columns mr-3" />
              Pay with Bank Transfer
            </Button>
            <Button bg="transaprent" onClick={makePayment} otherClass="border border-2 my-5">
              <i className="fa-solid fa-credit-card mr-3" /> Pay with Card
            </Button> */}
          </>
        ) : (
          ""
        )}
      </form>
    </>
  )
}

export default Education
