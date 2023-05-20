import { useForm } from "react-hook-form"
import Input from "../../components/input"
import internetForm from "../../utls/form/internet-form"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import { getVariationCodes, paySubscripiton } from "../../utls/url"

const InterneData = () => {
  const defaultForm = internetForm
  const { handleSubmit, control } = useForm()
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [packages, setPackages] = useState([])
  const [proceed, setProceed] = useState(false)

  const submit = async (data) => {
    setProceed(true)
    const req = await paySubscripiton({
      serviceID: queries.service,
      billersCode: "08011111111",
      variation_code: "mtn-10mb-100",
      amount: "900.00",
      phone: "08011111111"
    })
    console.log(req)
    console.log(data)
  }

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
      </form>
    </>
  )
}

export default InterneData
