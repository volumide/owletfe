import Button from "../components/button"
import logo from "../utls/logo"
const Transaction = () => {
  return (
    <div>
      <div className="w-[500px]  border-2 rounded-[24px] mx-auto py-[48px] px-[59px] mt-[40px]">
        <p className="text-center text-[32px]">Transaction Details</p>

        <div className="w-[70px] h-[70px] p-2 mx-auto  border-2 my-[44px] rounded-full">
          <img src={logo.tv.startime} alt="" className="w-full h-full object-contain" />
        </div>
        <div className="mt-[44px] text-center">
          <p>Smile Airtime Payment</p>
          <h2>NGN7,600</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-[52px]">
          {[1, 2, 3, 4].map((i) => (
            <p key={i}>
              Transaction Status
              <br />
              <small>123456789</small>
            </p>
          ))}
        </div>

        <div className="flex gap-11 mt-[48px]">
          <Button bg="transaparent" otherClass="border  ">
            Report Transaction
          </Button>
          <Button>Download Receipt</Button>
        </div>
      </div>
    </div>
  )
}

export default Transaction
