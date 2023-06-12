import Airtime from "./airtime.form"
import DashBoard from "./dashboard/dashboard"
import InterneData from "./data.form"
import Education from "./education.form"
import Electricity from "./electricity.form"
import Profile from "./profile.form"
import TvForm from "./tv-sub.form"
import Wallet from "./wallet"

const forms = {
  "phone": <Airtime />,
  "internet-bill": <InterneData />,
  "tv-subscription": <TvForm />,
  "electricity-bill": <Electricity />,
  "education": <Education />,
  "wallet": <Wallet />,
  "profile": <Profile />,
  "dashboard": <DashBoard />
}

export default forms
