/* eslint-disable react/prop-types */
export default function Button({ children, bg, color, type = "button", otherClass, ...props }) {
  return (
    <button type={type} className={`rounded-default ${!color ? color : "text-white"} ${!bg ? "bg-primary" : bg} px-[64px] py-[16px] w-full ${otherClass} `} {...props}>
      {children}
    </button>
  )
}
