/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form"
import Input from "../../components/input"
import { useParams } from "react-router-dom"
import Button from "../../components/button"
import { useState } from "react"

const Profile = () => {
  const { type } = useParams()
  const [user, setProfile] = useState(JSON.parse(localStorage.getItem("user")))
  return <>{type === "Settings" ? <ChangePassword /> : <ChangeProfile user={user} />}</>
}

const ChangeProfile = ({ user }) => {
  const { handleSubmit, control } = useForm()
  return (
    <>
      <form onSubmit={handleSubmit()}>
        <Input label="First Name" control={control} name="first_name" defaultValue={user?.first_name || ""} />
        <Input label="Last Name" control={control} name="last_name" defaultValue={user?.last_name || ""} />
        <Input label="Email" control={control} name="first_name" defaultValue={user?.email || ""} disabled />
        <Input label="Phone Number" control={control} name="phone" defaultValue={user?.phone || ""} />
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
