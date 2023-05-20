import axios from "axios"

const password = "Olumide1"
const userName = "volumide42@gmail.com"
const url = "https://sandbox.vtpass.com/api/"

export const getCountries = async () => {
  const getCountries = localStorage.getItem("countries")
  if (getCountries) return getCountries
  const req = await axios.get(`${url}get-international-airtime-countries`, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  localStorage.setItem("countries", JSON.stringify(response))
  return response
}

export const getAirtimeProduct = async (code) => {
  const req = await axios.get(`${url}get-international-airtime-product-types?code=${code}`, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}

export const getAirtimeOperator = async (code, productId) => {
  const req = await axios.get(`${url}get-international-airtime-operator?code=${code}&product_type_id=${productId}`, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}

export const getVariationCodes = async (variant) => {
  const req = await axios.get(`${url}service-variations?serviceID=${variant}`)
  const { data: response } = req
  return response
}

export const verifyMerchant = async (data) => {
  const req = await axios.post(`${url}merchant-verify`, data, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}

export const paySubscripiton = async (data) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hour = String(now.getHours()).padStart(2, "0")
  const minute = String(now.getMinutes()).padStart(2, "0")

  const request_id = `${year}${month}${day}${hour}${minute}OWLET`
  data["request_id"] = request_id
  const req = await axios.post(`${url}pay`, data, { headers: { "Authorization": `Basic ${window.btoa(userName + ":" + password)}` } })
  const { data: response } = req
  return response
}
