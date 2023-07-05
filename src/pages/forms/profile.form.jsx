/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { baseUrl } from "../../utls/url"
import AppContext from "../../context/app-context"
import { toast } from "react-toastify"

const Profile = () => {
  const { type } = useParams()
  const [user, setProfile] = useState(JSON.parse(localStorage.getItem("user")))
  return (
    <>
      {type === "Settings" && <ChangePassword />}
      {type === "Profile" && <ChangeProfile user={user} setUser={setProfile} />}
      {type === "Airtime" && <AirtimeToCash user={user} />}
      {/* {type === "Settings" ? <ChangePassword /> : <ChangeProfile user={user} setUser={setProfile} />} */}
    </>
  )
}

const ChangeProfile = ({ user, setUser }) => {
  const { userName } = useContext(AppContext)
  const { handleSubmit, control } = useForm()
  const updateProfile = async (data) => {
    const sentData = {}
    Object.keys(data).map((e) => {
      if (data[e]) sentData[e] = data[e]
    })

    if (Object.keys(sentData).length) {
      try {
        const v = await axios.put(baseUrl + `user/${user.id}`, sentData, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        localStorage.setItem("user", JSON.stringify(v.data.data))
        setUser(v.data.data)
      } catch (error) {
        // console.log(error)
      }
      return
    }

    // console.log("data does not change")
  }
  return (
    <>
      <form onSubmit={handleSubmit(updateProfile)}>
        <div className="my-[16px]">
          <label className="block text-[12px] ">Username</label>
          <input className="block mb-[8px]  mt-[8px] rounded-default px-5 py-[16px] bg-input w-full" defaultValue={userName} readOnly />
        </div>
        <Input label="First Name" control={control} name="first_name" defaultValue={user?.first_name || ""} />
        <Input label="Last Name" control={control} name="last_name" defaultValue={user?.last_name || ""} />
        <Input label="Email" control={control} name="first_name" defaultValue={user?.email || ""} disabled />
        <Input label="Phone Number" control={control} name="phone" defaultValue={user?.phone || ""} />
        <Input label="Country" control={control} name="country" defaultValue={user?.country || ""} />
        <Input label="Bank Name" control={control} name="bank_name" defaultValue={user?.country || ""} />
        <Input label="Account Number" type="number" control={control} name="acct_number" defaultValue={user?.country || ""} />
        <Button type="submit">Update Profile</Button>
      </form>
    </>
  )
}

const ChangePassword = () => {
  const { handleSubmit, control } = useForm()
  const { setUser } = useContext(AppContext)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const updateProfile = async (data) => {
    // console.log(data)
    if (data.new_password !== data.confirm_password) {
      setError("confirm password and new password doesn't match")
      setMessage("")
      return
    }
    // console.log(data)
    // return
    setError("")
    const sentData = {}
    Object.keys(data).map((e) => {
      if (data[e]) sentData[e] = data[e]
    })

    if (Object.keys(sentData).length) {
      try {
        const v = await axios.put(baseUrl + `change/password`, sentData, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        const user = JSON.parse(localStorage.getItem("user"))
        user["temporal"] = "false"
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))
        setMessage(v.data.message)
        setTimeout(() => setMessage(""), 2000)
        toast.success(v.data.message)
      } catch (error) {
        console.log(error)
      }
      return
    }

    // console.log("data does not change")
  }
  return (
    <>
      <form onSubmit={handleSubmit(updateProfile)}>
        <p className="text-red-500">{error}</p>
        <p className="text-blue-500">{message}</p>

        <Input label="Old password" control={control} type="password" name="old_password" />
        <Input label="New password" control={control} type="password" name="new_password" />
        <Input label="Confrim Password" type="Password" control={control} name="confirm_password" />
        <Button type="submit">Change Password</Button>
      </form>
    </>
  )
}

const AirtimeToCash = ({ user }) => {
  const { handleSubmit, control } = useForm()
  const [providers, setProviders] = useState([])
  const [provider, setProvider] = useState("")
  const navigate = useNavigate()
  const getProviders = async () => {
    try {
      const res = await axios.get(baseUrl + "providers", { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
      setProviders(res.data.data)
    } catch (error) {
      // console.log(error)
    }
  }

  const makeTransfer = async (data) => {
    if (!provider.provider) {
      toast.info("choose a provider")
      return
    }
    data.provider = provider.provider
    data.to = provider.number
    data.name = user.first_name + " " + user.last_name
    data.email = user.email
    try {
      await axios.post(baseUrl + "airtime/transfers", data, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` }
      })
      toast.success("trnasfered logged we will get back to you")
      const location = window.location.pathname + "?service=Airtime"
      navigate(location)
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
    getProviders()
  }, [])

  return (
    <>
      {providers.length ? (
        <>
          <div className="flex gap-3 flex-wrap py-5">
            {providers.map((provider) => (
              <p key={provider.provider} className="border p-5 rounded-[4px] text-center" role="button" onClick={() => setProvider({ provider: provider.provider, number: provider.number })}>
                <span className="text-2xl block uppercase"> {provider.provider} </span>

                <span>{provider.number}</span>
              </p>
            ))}
          </div>
          {provider ? (
            <p className="text-center">
              Send airtime to this <span className="text-2xl ">{provider.number}</span> and fill in the form below
            </p>
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit(makeTransfer)}>
        <Input label="Phone Number used for trnasfer" control={control} name="number" defaultValue={user?.number || ""} />
        <Input label="Amount Transfered" control={control} name="amount" defaultValue={user?.number || ""} />
        <Input label="Bank Name" control={control} name="bank_name" defaultValue={user?.bank_name || ""} />
        <Input label="Account Number" type="number" control={control} name="acct_number" defaultValue={user?.bank_name || ""} />
        <Button type="submit">Make Transfer</Button>
      </form>
    </>
  )
}
export default Profile
