import { useForm } from "react-hook-form"
import Input from "../../components/input"
import electForm from "../../utls/form/electricity-form"
import { useState } from "react"
import Button from "../../components/button"

const Electricity = () => {
  const electForms = electForm
  const { handleSubmit, control } = useForm()
  const [proceed, setProceed] = useState(false)
  const submit = (data) => {
    setProceed(true)
    console.log(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        {electForms.map((i) =>
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

export default Electricity
