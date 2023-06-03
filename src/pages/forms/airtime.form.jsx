import { useForm } from "react-hook-form"
import Input from "../../components/input"
import phoneForm from "../../utls/form/phone-form"
import Button from "../../components/button"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCountries } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"

const Airtime = () => {
  const { type } = useParams()
  const defaultForm = phoneForm
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [countries, setCountries] = useState([])
  const [formInput, setFormInput] = useState([])
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { setForm, formData } = useContext(AppContext)
  const submit = (data) => {
    data.serviceID = queries.service
    setForm(data)
    changes()
  }

  const changes = () => {
    //console.log("working")
    setProceed(true)
  }

  const international = [
    { label: "Country", name: "country" },
    { label: "Product Type", name: "product_type" },
    { label: "Operator", name: "operator" }
  ]

  useEffect(() => {
    if (type === "International Airtime") {
      getCountries().then((e) => {
        const res = typeof e === "string" ? JSON.parse(e) : e
        setCountries(res.content.countries)
      })
      setFormInput([...international, ...defaultForm])
    } else setFormInput(defaultForm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type])

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {proceed ? (
          <>
            <Confirm form={formInput} name={formData} />
          </>
        ) : (
          <>
            {type == "International Airtime" ? (
              <>
                <Input label="Country" control={control} key="country" name="country" select>
                  {countries.map((country) => (
                    <option value={country.code} key={country.prefix}>
                      {country.name}
                    </option>
                  ))}
                </Input>
                <Input label="Product Type" control={control} key="product_type" name="product_type" select>
                  <option value="product">working</option>
                </Input>
                <Input label="Operator" control={control} key="operator" name="operator" select>
                  <option value="operator">working</option>
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
          </>
        )}
      </form>
    </>
  )
}

export default Airtime
