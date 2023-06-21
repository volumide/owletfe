import { useForm } from "react-hook-form"
import Input from "../../components/input"
import electForm from "../../utls/form/electricity-form"
import { useState, useContext } from "react"
import Button from "../../components/button"
import { useParams } from "react-router-dom"
import { verifyMerchant } from "../../utls/url"
import { Confirm } from "../placeholder"
import AppContext from "../../context/app-context"
import { toast } from "react-toastify"

const Electricity = () => {
  const electForms = electForm
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { type } = useParams()
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const [error, setError] = useState()
  const { setForm, formData, setCommision, com } = useContext(AppContext)
  const [meter, setMeter] = useState({})
  const submit = async (data) => {
    if (data.amount < 500) {
      toast.warn("minimum amount of purchase is 500")
      return
    }
    setCommision(com?.[queries.service || 0])
    data.serviceID = queries.service.toLowerCase() + "-electric"
    data.reason = type
    const req = await verifyMerchant({
      serviceID: data.serviceID,
      type: data.variation_code,
      billersCode: data.billersCode
    })

    if (req.content.error) {
      setError(req.content.error)
      return
    }
    if (req.response_description === "BILLER NOT REACHEABLE AT THIS POINT") {
      toast(req.response_description)
      return
    }
    setMeter(req.content)
    setError("")
    setProceed(true)
    setForm(data)
  }

  return (
    <>
      {!proceed && (
        <>
          <h4>Prepaid and Postpaid {type} Payment</h4>
          <p>Prepaid and Postpaid {type} Payment</p>
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
            <div className="bg-[#F4F6FA] p-5 rounded-[24px] my-10">
              <div className="my-[16px]">
                <h1 className="text-base font[600]">Customer Name </h1>
                <p>{meter?.Customer_Name}</p>
              </div>
              <div className="my-[16px]">
                <h1 className="text-base font[600]">Address</h1>
                <p>{meter?.Address}</p>
              </div>
              <div className="my-[16px]">
                <h1 className="text-base font[600]">Address</h1>
                <p>{meter?.Address}</p>
              </div>
              <div className="my-[16px]">
                <h1 className="text-base font[600]">Meter Number</h1>
                <p>{meter?.MeterNumber}</p>
              </div>
              <div className="my-[16px]">
                <h1 className="text-base font[600]">Meter Type</h1>
                <p>{meter?.Meter_Type}</p>
              </div>
            </div>

            <Confirm form={electForm} name={formData} type={queries.service} />
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
