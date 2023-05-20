const electForm = [
  { label: "Meter Type", name: "variation_code", select: true, options: ["Prepaid", "Postpaid"] },
  { label: "Meter Number", name: "billersCode" },
  { label: "Amount", name: "amount" },
  { label: "Phone Number", name: "phone", type: "number" },
  { label: "Email Address", name: "email", type: "email" }
]

export default electForm
