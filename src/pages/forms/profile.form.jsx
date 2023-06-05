import { useForm } from "react-hook-form"
import Input from "../../components/input"
import { useParams } from "react-router-dom"

const Profile = () => {
  const { type } = useParams()
  return <>{type === "profile" ? <ChangePassword /> : <ChangeProfile />}</>
}

const ChangeProfile = () => {
  const { handleSubmit, control } = useForm()
  return (
    <>
      <form onSubmit={handleSubmit()}>
        <Input label="First Name" control={control} name="first_name" />
        <Input label="Last Name" control={control} name="last_name" />
        <Input label="Phone Number" control={control} name="phone" />
      </form>
    </>
  )
}

const ChangePassword = () => {
  const { handleSubmit, control } = useForm()
  return (
    <>
      <form onSubmit={handleSubmit()}>
        <Input label="password" control={control} name="new_password" />
        <Input label="Confrim Password" control={control} name="confirm_password" />
      </form>
    </>
  )
}
export default Profile
