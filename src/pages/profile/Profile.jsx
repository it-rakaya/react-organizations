import { useState } from 'react'
import ModalComp from '../../components/atoms/ModalComp'
import AccountSetting from '../../components/organisms/profile/AccountSetting'
import UserProfileHeader from '../../components/organisms/profile/UserProfileHeader'
import { useAuth } from '../../context/auth-and-perm/AuthProvider'

export default function Profile() {
  const [editUser, setEditUser] = useState(false)
  const { user  } = useAuth();

  return (
    <div>
      <UserProfileHeader setEditUser={setEditUser} />
      <ModalComp
        open={editUser}
        className={'  '}
        onClose={() => setEditUser(false)}
        Children={<AccountSetting userData={user}  setEditUser={setEditUser}/>}
      />
    </div>
  )
}
