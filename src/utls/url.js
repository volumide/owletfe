import axios from "axios"

const password = "Olumide1"
const userName = "volumide42@gmail.com"
const url = "https://sandbox.vtpass.com/api/"

export const getCountries = async () => {
  const req = await axios.get(`${url}get-international-airtime-countries`, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}

export const getAirtimeProduct = async (code) => {
  const req = await axios.get(`${url}get-international-airtime-product-types?code=${code}`, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}

export const getAirtimeOperator = async (code) => {
  const req = await axios.get(`${url}get-international-airtime-operator?code=${code}&product_type_id=4`, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}

export const getVariationCodes = async (variant) => {
  const req = await axios.get(`${url}service-variations?serviceID=${variant}`)
  const { data: response } = req
  console.log(response)
  return response
}
