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
  { icon: education, caption: "Education", bg: "ed", link: "education" }
]

export const description = {
  "phone": { link: "Buy Phone Airtime", caption: "Select one of the distros below to proceed" },
  "internet-bill": { link: "Buy Internet Data", caption: "Select one of the services we provide below to proceed" },
  "tv-subscription": { link: "Pay Tv Subscription", caption: "Select one of the tv service below to proceed" },
  "electricity-bill": { link: "Pay Electricity Bill", caption: "Select one of the distros below to proceed" },
  "education": { link: "Education Payment", caption: "Select the one applicable to you" }
}
