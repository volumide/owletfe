import { useForm } from "react-hook-form"
import Input from "../../components/input"
import electForm from "../../utls/form/electricity-form"
import { useState } from "react"
import Button from "../../components/button"
import { useParams } from "react-router-dom"
import { paySubscripiton, verifyMerchant } from "../../utls/url"

const Electricity = () => {
  const electForms = electForm
  const { type } = useParams()
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)

  const submit = async () => {
    setProceed(true)
    console.log("working...")
    const req = await verifyMerchant({
      serviceID: "kano-electric",
      type: "postpaid",
      billersCode: "1010101010101"
    })
    console.log(req)
    if (!req.content.error) {
      const sendPay = await paySubscripiton({
        serviceID: "kano-electric",
        billersCode: "1010101010101",
        phone: "08011111111",
        variation_code: "postpaid",
        amount: "1000"
      })
      console.log(sendPay)
    }
  }

  return (
    <>
      <h4>Prepaid and Postpaid {type} Payment</h4>
      <p>Prepaid and PZostpaid {type} Payment</p>
      <div className="py-3 my-5 border-t border-b">
        <p>
          Select <span className="font-[700]">&quot;Prepaid”</span> if you load token on your meter
        </p>
        <p>
          Select <span className="font-[700]">“Postpaid”</span> if you get a bill at the end of the month{" "}
        </p>
      </div>
      <form onSubmit={handleSubmit(submit)}>
        {electForms.map((i) =>
          i.select ? (
            <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true}>
              {i.options.map((e) => (
                <option value={e.toLocaleLowerCase()} key={e}>
                  {e}
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

export default Electricity
