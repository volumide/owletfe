import { useParams } from "react-router-dom"
import Button from "../../components/button"

const Wallet = () => {
  const query = new URLSearchParams(window.location.search)
  const queries = Object.fromEntries(query.entries())
  const { type } = useParams()
  console.log(window.origin)
  return (
    <>
      <p className="capitalize mb-[24px] text-2xl">{queries.service}</p>
      {type === "Transaction History" ? <Transaction /> : <WalletBalance />}
    </>
  )
}

export default Wallet

const WalletBalance = () => {
  return (
    <div className="card bg-black text-white h-[300px] rounded-[24px] flex justify-between p-[40px] items-end">
      <p>
        Wallet Balance
        <span className="block text-3xl mt-2">NGN20,000</span>
      </p>
      <div>
        <Button otherClass="px-10 text-black">Fund Wallet</Button>
      </div>
    </div>
  )
}

const Transaction = () => {
  return (
    <>
      <div className="flex justify-between py-3 border-b">
        <p>
          Wallet Funding
          <span className="block text-ddgray">Transaction ID: 168122366616812236665501858</span>
        </p>
        <p className="text-right">
          +20,000
          <span className="block text-ddgray">11th April 2023, 03:34PM</span>
        </p>
      </div>
    </>
  )
}
