import edu from "./edu"
import electricity from "./electricity"
import intertenetData from "./internet"
import airtime from "./phone"
import profile from "./profile"
import subTv from "./tv"
import wallet from "./wallet"

const links = {
  "phone": airtime,
  "internet-bill": intertenetData,
  "tv-subscription": subTv,
  "electricity-bill": electricity,
  "education": edu,
  "wallet": wallet,
  "profile": profile
}

export default links
