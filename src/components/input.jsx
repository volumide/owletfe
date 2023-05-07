/* eslint-disable react/prop-types */
export default function Input({ children, label, id, props }) {
  return (
    <>
      <label htmlFor={id} className="block text-[12px] ">
        {label}
      </label>
      <input id={id} className="block mb-[8px]  mt-[8px] rounded-default px-5 py-[16px]  bg-input" {...props} />
      {children}
    </>
  )
}
