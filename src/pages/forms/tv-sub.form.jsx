/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import tvForn from "../../utls/form/tv-form"
import { useEffect, useState } from "react"
import Button from "../../components/button"
import { getVariationCodes, paySubscripiton, verifyMerchant } from "../../utls/url"

const TvForm = () => {
  const tvForms = tvForn
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const [packages, setPackages] = useState([])

  const submit = async () => {
    setProceed(true)
    console.log("working...")
    const req = await verifyMerchant({
      serviceID: "dstv",
      billersCode: "1212121212"
    })

    console.log(req)
    if (!req.content.error) {
      const sendPay = await paySubscripiton({
        serviceID: "dstv",
        billersCode: "1212121212",
        phone: "08011111111",
        amount: req.content.Renewal_Amount,
        subscription_type: ""
      })
      console.log(sendPay)
    }
  }

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
        {tvForms.map((i) =>
          i.select ? (
            <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i.name} name={i.name} select={true}>
              {i.options
                ? i.options.map((value) => (
                    <option value={value.toLocaleLowerCase()} key={value + Math.random}>
                      {value}
                    </option>
                  ))
                : packages.map((e) => (
                    <option value={e.variation_amount} key={e.name}>
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

export default TvForm
