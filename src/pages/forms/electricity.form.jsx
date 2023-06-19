import { useForm } from "react-hook-form"
import Input from "../../components/input"
import electForm from "../../utls/form/electricity-form"
import { useState, useContext } from "react"
import Button from "../../components/button"
import { useParams } from "react-router-dom"
import { verifyMerchant } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"

const Electricity = () => {
  const electForms = electForm
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { type } = useParams()
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [error, setError] = useState()
  const { setForm, formData } = useContext(AppContext)
  const submit = async (data) => {
    data.serviceID = queries.service + "-electric"
    data.reason = type
    const req = await verifyMerchant({
      serviceID: data.serviceID,
      type: data.variation_code,
      billersCode: data.billersCode
    })

    //console.log(req)
    if (req.content.error) {
      setError(req.content.error)
      return
    }
    setError("")
    setProceed(true)
    setForm(data)
  }

  return (
    <>
      {!proceed && (
        <>
          <h4>Prepaid and Postpaid {type} Payment</h4>
          <p>Prepaid and PZostpaid {type} Payment</p>
          {error && <p className="p-5 bg-red-400 text-white my-3 rounded-[16px]">{error}</p>}
          <div className="py-3 my-5 border-t border-b">
            <p>
              Select <span className="font-[700]">&quot;Prepaid”</span> if you load token on your meter
            </p>
            <p>
              Select <span className="font-[700]">“Postpaid”</span> if you get a bill at the end of the month{" "}
            </p>
          </div>
        </>
      )}

      <form onSubmit={handleSubmit(submit)}>
        {proceed ? (
          <>
            <Confirm form={electForm} name={formData} />
          </>
        ) : (
          <>
            {electForms.map((i) =>
              i.select ? (
                <Input label={i.label || "moving"} type={i?.type || "text"} control={control} key={i} name={i.name} select={true} required>
                  {i.options.map((e) => (
                    <option value={e.toLocaleLowerCase()} key={e}>
                      {e}
                    </option>
                  ))}
                </Input>
              ) : (
                <Input label={i.label} type={i?.type || "text"} control={control} key={i.label} name={i.name} required />
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

export default Electricity
