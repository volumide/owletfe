import edu from "./edu"
import electricity from "./electricity"
import intertenetData from "./internet"
import airtime from "./phone"
import subTv from "./tv"

const links = {
  "phone": airtime,
  "internet-bill": intertenetData,
  "tv-subscription": subTv,
  "electricity-bill": electricity,
  "education": edu
}

export default links
