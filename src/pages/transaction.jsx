import Button from "../components/button"

const Transaction = () => {
  return (
    <div>
      <div className="w-[600px]  border-2 rounded-[24px] mx-auto py-[48px] px-[69px] mt-[40px]">
        <p className="text-center text-[32px]">Transaction Details</p>
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

          <Button bg="transaparent" otherClass="border text-[12px] mt-[48px]">
            Report Transaction
          </Button>
          <Button otherClass="text-[12px] mt-[48px]">Download Receipt</Button>
        </div>
      </div>
    </div>
  )
}

export default Transaction
