import { useController } from "react-hook-form"

/* eslint-disable react/prop-types */
const Input = ({ children, label, id, width = true, name, control, select, ...props }) => {
  const {
    field: { onChange, onBlur },
    fieldState: { error }
  } = useController({ name, control })
  return (
    <div className="my-[16px]">
      <label htmlFor={id} className="block text-[12px] ">
        {label}
      </label>
      {select ? (
        <>
          <select name="" id={id} onChange={onChange} onBlur={onBlur} className={`block mb-[8px]  mt-[8px] rounded-default px-5 py-[16px]  bg-input ${!width ? width : "w-full"} `} {...props}>
            <option></option>
            {children}
          </select>
        </>
      ) : (
        <>
          <input id={id} name={name} onChange={onChange} onBlur={onBlur} className={`block mb-[8px]  mt-[8px] rounded-default px-5 py-[16px]  bg-input ${!width ? width : "w-full"} `} {...props} />
          {error && <span>{error.message}</span>}
          {children}
        </>
      )}
    </div>
  )
}

export default Input
