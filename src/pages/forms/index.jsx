import Airtime from "./airtime.form"
import InterneData from "./data.form"
import Education from "./education.form"
import Electricity from "./electricity.form"
import TvForm from "./tv-sub.form"

const forms = {
  "phone": <Airtime />,
  "internet-bill": <InterneData />,
  "tv-subscription": <TvForm />,
  "electricity-bill": <Electricity />,
  "education": <Education />
}

export default forms
