import education from "../assets/home/education.png"
import electricity from "../assets/home/electricity.png"
import internet from "../assets/home/internet.png"
import phone from "../assets/home/phone.png"
import tv from "../assets/home/tv.png"

export const placeholder = [
  { icon: phone, caption: "Phone Airtime ", bg: "phone", link: "phone" },
  { icon: internet, caption: "Internet Bill", bg: "bill", link: "internet-bill" },
  { icon: tv, caption: " Tv Subscription ", bg: "sub", link: "tv-subscription" },
  { icon: electricity, caption: "Electricity Bill", bg: "elect", link: "electricity-bill" },
  { icon: education, caption: "Education", bg: "ed", link: "education" },
  { icon: education, caption: "Wallet", bg: "", link: "wallet" },
  { icon: education, caption: "Profile", bg: "", link: "profile" }
]

export const description = {
  "phone": { title: "Buy Phone Airtime", caption: "Select one of the distros below to proceed", form: "phoneForm" },
  "internet-bill": { title: "Buy Internet Data", caption: "Select one of the services we provide below to proceed", form: "internetForm" },
  "tv-subscription": { title: "Pay Tv Subscription", caption: "Select one of the tv service below to proceed", form: "tvForn" },
  "electricity-bill": { title: "Pay Electricity Bill", caption: "Select one of the distros below to proceed", form: "electForm" },
  "education": { title: "Education Payment", caption: "Select the one applicable to you", form: "eduForm" },
  "wallet": { title: "Wallet", caption: "", form: "" },
  "profile": { title: "Profile", caption: "", form: "" }
}
