import { useForm } from "react-hook-form"
import Input from "../../components/input"
import phoneForm from "../../utls/form/phone-form"
import Button from "../../components/button"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCountries, getVariationCodes, url } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"
import axios from "axios"
import { toast } from "react-toastify"

const Airtime = () => {
  const { type } = useParams()
  const defaultForm = phoneForm
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [countries, setCountries] = useState([])
  const [formInput, setFormInput] = useState([])
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [products, setProducts] = useState([])
  const [operator, setOperators] = useState([])
  const [varia, setVaria] = useState([])
  const [ct, setCt] = useState("")
  const [op, setOp] = useState("")
  const [newData, setNewData] = useState({})
  const { setForm, formData, setCommision, com } = useContext(AppContext)
  const submit = (data) => {
    setCommision(com?.[queries.service || 0])
    data.serviceID = queries.service
    data.reason = type
    data.billersCode = data.phone
    if (Object.keys(newData).length < 4 && queries.service === "foreign-airtime") {
      toast.error("Unable to procceed with this request")
      return
    }
    let count = 0
    Object.keys(data).forEach((e) => {
      if (data[e]) count += 1
    })

    if (count < 5) {
      toast.error("Unable to procceed with this request")
      return
    }

    setForm({ ...data, ...newData })
    changes()
  }

  const getProductType = async (e) => {
    try {
      const res = await axios.get(url + `get-international-airtime-product-types?code=${e.target.value}`)
      setCt(e.target.value)
      setProducts(res.data.content)
      if (res.data.content.length < 1) {
        toast.warning("Airtime topup not available for this country")
        return
      }
      setNewData({ ...newData, "country_code": e.target.value })
    } catch (error) {
      // console.log(error)
    }
  }

  const getOperators = async (e) => {
    try {
      setOp(e.target.value)
      const res = await axios.get(url + `get-international-airtime-operators?code=${ct}&product_type_id=${e.target.value}`)
      setOperators(res.data.content)

      setNewData({ ...newData, "product_type_id": "1" })
    } catch (error) {
      // console.log(error)
    }
  }

  const getCodes = async (e) => {
    const res = await getVariationCodes(`foreign-airtime&operator_id=${op}&product_type_id=1`)
    setVaria(res.content.variations)
    setNewData({ ...newData, "operator_id": e.target.value })
    // console.log(res)
  }

  const variationCode = async (e) => {
    const init = {}
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const amount = el.getAttribute("data-amount")
    if (amount) init["amount"] = amount
    setNewData({ ...newData, ...init, "variation_code": e.target.value })
  }

  const changes = () => {
    setProceed(true)
  }

  const international = [
    { label: "Country", name: "country_code" },
    { label: "Product Type", name: "product_type_id" },
    { label: "Operator", name: "operator_id" }
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
            <Confirm form={formInput} name={formData} type={queries.service} />
          </>
        ) : (
          <div>
            {type == "International Airtime" ? (
              <div>
                <Input label="Country" control={control} name="country_code" select onChange={getProductType} required>
                  {countries.map((country) => (
                    <option value={country.code} key={country.prefix}>
                      {country.name}
                    </option>
                  ))}
                </Input>
                {products.length ? (
                  <Input label="Product Type" control={control} name="product_type_id" select onChange={getOperators} required>
                    {products.map((i) =>
                      i.product_type_id === 1 ? (
                        <option value={i.product_type_id} key={i.name}>
                          {i.name}
                        </option>
                      ) : (
                        <></>
                      )
                    )}
                  </Input>
                ) : (
                  <></>
                )}
                {operator.length ? (
                  <Input label="Operator" control={control} name="operator_id" select onChange={getCodes} required>
                    {operator.map((i) => (
                      <option value={i.operator_id} key={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <></>
                )}
                {varia.length ? (
                  <Input label="Type" control={control} name="variation_code" select onChange={variationCode} required>
                    {varia.map((i) => (
                      <option value={i.variation_code} data-amount={i.variation_amount} key={i.name}>
                        {i.name}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              ""
            )}
            {defaultForm.map((i) =>
              i.select ? (
                <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} select={true} required>
                  {i.options.map((e) => (
                    <option value={e.value} key={e.code}>
                      {e.key}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} value={newData?.[i.name]} required />
              )
            )}
            <div className="flex gap-3 mt-[32px]">
              <Button type="button" bg="transaprent" otherClass="border" disabled={!proceed}>
                Cancel
              </Button>
              <Button type="submit">Proceed</Button>
            </div>
          </div>
        )}
      </form>
    </>
  )
}

export default Airtime
