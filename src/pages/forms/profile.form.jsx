/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import { useParams } from "react-router-dom"
import Button from "../../components/button"
import { useState } from "react"
import axios from "axios"

const Profile = () => {
  const { type } = useParams()
  const [user, setProfile] = useState(JSON.parse(localStorage.getItem("user")))
  return <>{type === "Settings" ? <ChangePassword /> : <ChangeProfile user={user} setUser={setProfile} />}</>
}

const ChangeProfile = ({ user, setUser }) => {
  const { handleSubmit, control } = useForm()
  const updateProfile = async (data) => {
    const sentData = {}
    Object.keys(data).map((e) => {
      if (data[e]) sentData[e] = data[e]
    })

    if (Object.keys(sentData).length) {
      try {
        const v = await axios.put(import.meta.env.VITE_APP_API_URL + `user/${user.id}`, sentData, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` } })
        localStorage.setItem("user", JSON.stringify(v.data.data))
        setUser(v.data.data)
      } catch (error) {
        console.log(error)
      }
      return
    }

    console.log("data does not change")
  }
  return (
    <>
      <form onSubmit={handleSubmit(updateProfile)}>
        <Input label="First Name" control={control} name="first_name" defaultValue={user?.first_name || ""} />
        <Input label="Last Name" control={control} name="last_name" defaultValue={user?.last_name || ""} />
        <Input label="Email" control={control} name="first_name" defaultValue={user?.email || ""} disabled />
        <Input label="Phone Number" control={control} name="phone" defaultValue={user?.phone || ""} />
        <Input label="Country" control={control} name="country" defaultValue={user?.country || ""} />
        <Button type="submit">Update Profile</Button>
      </form>
    </>
  )
}

const ChangePassword = () => {
  const { handleSubmit, control } = useForm()
  return (
    <>
      <form onSubmit={handleSubmit()}>
        <Input label="Old password" control={control} type="password" name="old_password" />
        <Input label="New password" control={control} type="password" name="new_password" />
        <Input label="Confrim Password" type="Password" control={control} name="confirm_password" />
        <Button type="submit">Change Password</Button>
      </form>
    </>
  )
}
export default Profile
