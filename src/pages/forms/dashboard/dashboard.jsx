import { useParams } from "react-router-dom"
import Commision from "./commision.form"
import Services from "./services.form"
import Transactions from "./transactions.form"
import Users from "./user.form"

const DashBoard = () => {
  const { type } = useParams()
  return (
    <>
      {type === "Commisions" && <Commision />}
      {type === "All Service" && <Services />}
      {type === "All Transactions" && <Transactions />}
      {type === "All users" && <Users />}
    </>
  )
}

export default DashBoard
