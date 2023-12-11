import { useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import AccountSetting from "../../components/organisms/profile/AccountSetting";
import UserProfileHeader from "../../components/organisms/profile/UserProfileHeader";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import OrganizationProfile from "../../components/organisms/profile/OrganizationProfile";

export default function Profile() {
  const [editUser, setEditUser] = useState(false);
  const { user, setUser } = useAuth();
  console.log("🚀 ~ file: Profile.jsx:11 ~ Profile ~ user:", user);
  const { orgData } = UseOrg();

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-3">
        <OrganizationProfile setEditUser={setEditUser} orgData={orgData} />
      </div>
      <div className="col-span-9">
        <UserProfileHeader
          setEditUser={setEditUser}
          user={user}
          orgData={orgData}
        />
      </div>

      <ModalComp
        open={editUser}
        className={"  "}
        onClose={() => setEditUser(false)}
        Children={
          <AccountSetting
            userData={user}
            setUser={setUser}
            setEditUser={setEditUser}
          />
        }
      />
    </div>
  );
}
