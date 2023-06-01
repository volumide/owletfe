const electForm = [
  { label: "Meter Type", name: "variation_code", select: true, options: ["Prepaid", "Postpaid"] },
  { label: "Meter Number", name: "billersCode", type: "number" },
  { label: "Amount", name: "amount", type: "number" },
  { label: "Phone Number", name: "phone", type: "number" },
  { label: "Email Address", name: "email", type: "email" }
]

export default electForm
