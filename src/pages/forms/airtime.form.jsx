import { useForm } from "react-hook-form"
import Input from "../../components/input"
import phoneForm from "../../utls/form/phone-form"
import Button from "../../components/button"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCountries } from "../../utls/url"

const Airtime = () => {
  const { type } = useParams()
  const defaultForm = phoneForm
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [countries, setCountries] = useState([])
  const submit = (data) => {
    setProceed(true)
    console.log(data)
  }

  useEffect(() => {
    if (type === "International Airtime")
      getCountries().then((e) => {
        if (typeof e === "string") setCountries(JSON.parse(e.content.countries))
        else setCountries(e.content.countries)
      })
  }, [type])

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {type == "International Airtime" ? (
          <>
            <Input label="Country" control={control} key="country" name="counry" select>
              {countries.map((country) => (
                <option value={country.code} key={country.prefix}>
                  {country.name}
                </option>
              ))}
            </Input>
            <Input label="Product Type" control={control} key="product_type" name="product_type" select>
              <option value="">working</option>
            </Input>
            <Input label="Operator" control={control} key="operator" name="operator" select>
              <option value="">working</option>
            </Input>
          </>
        ) : (
          ""
        )}
        {defaultForm.map((i) =>
          i.select ? (
            <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true}>
              {i.options.map((e) => (
                <option value={e.value} key={e.code}>
                  {e.key}
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

export default Airtime
