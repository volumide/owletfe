import { useParams } from "react-router-dom"

const Placeholder = () => {
  const { name } = useParams()
  console.log(name)
  return (
    <div className="h-screen  flex container mx-auto px-[100px]">
      <div className="flex-1 border-r h-full py-10">{name}</div>
      <div className="flex-auto flex-shrink-0 py-10 px-10">content</div>
    </div>
  )
}
export default Placeholder
