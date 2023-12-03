import { useState } from 'react'
import ModalComp from '../../components/atoms/ModalComp'
import AccountSetting from '../../components/organisms/profile/AccountSetting'
import UserProfileHeader from '../../components/organisms/profile/UserProfileHeader'
import { useUser } from '../../context/user provider/UserContext'

export default function Profile() {
  const [editUser, setEditUser] = useState(false)
  const { userData , refetch } = useUser();

  return (
    <div>
      <UserProfileHeader setEditUser={setEditUser} />
      <ModalComp
        open={editUser}
        className={'  '}
        onClose={() => setEditUser(false)}
        Children={<AccountSetting userData={userData}  refetch={refetch} setEditUser={setEditUser}/>}
      />
    </div>
  )
}
