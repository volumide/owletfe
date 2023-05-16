import axios from "axios"

export const getCountries = async (url) => {
  const request = await axios.get(`${url}get-international-airtime-countries`)
  return request.data
}

export const getAirtimeProduct = async (url, code) => {
  const request = await axios.get(`${url}get-international-airtime-product-types?code=${code}`)
  return request.data
}

export const getAirtimeOperator = async (url, code) => {
  const request = await axios.get(`${url}get-international-airtime-operator?code=${code}&product_type_id=4`)
  return request.data
}
