import { useForm } from "react-hook-form"
import Input from "../../components/input"
import eduForm from "../../utls/form/education-form"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import { getVariationCodes, paySubscripiton } from "../../utls/url"
const Education = () => {
  const defaultForm = eduForm
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [packages, setPackages] = useState([])
  const submit = async () => {
    setProceed(true)
    const req = await paySubscripiton({
      serviceID: queries.service,
      variation_code: "waecdirect",
      amount: "900.00",
      phone: "08011111111"
    })
    console.log(req)
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
      </form>
    </>
  )
}

export default Education
