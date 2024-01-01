import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import AccountSetting from "../../components/organisms/profile/AccountSetting";
import UserProfileHeader from "../../components/organisms/profile/UserProfileHeader";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

export default function Profile() {
  const [editUser, setEditUser] = useState(false);
  const { user, setUser } = useAuth();
  const { orgData } = UseOrg();
  // const theme = useTheme();
  // const bgDynamic = theme?.palette?.primary?.main
  //   ? theme?.palette?.primary?.main
  //   : "#9f9685";
  return (
    <div
      className="grid grid-cols-12 gap-5 h-[calc(100vh)]"
      style={{
        // background: `linear-gradient(130deg, ${bgDynamic} 0%, rgba(255,255,255,1) 90%)`,
        height: "",
      }}
    >
      <div className="col-span-12 mt-10">
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
