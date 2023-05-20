import { useForm } from "react-hook-form"
import Input from "../../components/input"
import internetForm from "../../utls/form/internet-form"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import { getVariationCodes, paySubscripiton } from "../../utls/url"
import { Confirm } from "../placeholder"

const InterneData = () => {
  const defaultForm = internetForm
  const { handleSubmit, control } = useForm()
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [packages, setPackages] = useState([])
  const [proceed, setProceed] = useState(false)
  const [formData, setFormData] = useState(defaultForm)

  const submit = async (data) => {
    setProceed(true)
    setFormData(data)
  }

  const makePayment = async () => {
    const req = await paySubscripiton({
      serviceID: queries.service,
      billersCode: "08011111111",
      variation_code: "mtn-10mb-100",
      amount: "900.00",
      phone: "08011111111"
    })
    console.log(req)
  }

  useEffect(() => {
    if (queries.service)
      getVariationCodes(queries.service).then((e) => {
        setPackages(e.content.varations)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {defaultForm.map((i) =>
          i.label === "Package" ? (
            <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true}>
              {packages.map((e) => (
                <option value={e.variation_code} key={e.name}>
                  {e.name}
                </option>
              ))}
            </Input>
          ) : (
            <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} disabled={i.disabled} />
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
            <Confirm form={defaultForm} name={formData} />
            <Button bg="transaprent" otherClass="border border-2">
              <i className="fa-solid fa-building-columns mr-3" />
              Pay with Bank Transfer
            </Button>
            <Button bg="transaprent" onClick={makePayment} otherClass="border border-2 my-5">
              <i className="fa-solid fa-credit-card mr-3" /> Pay with Card
            </Button>
          </>
        ) : (
          ""
        )}
      </form>
    </>
  )
}

export default InterneData
