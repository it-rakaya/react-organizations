import { useEffect, useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import AccountSetting from "../../components/organisms/profile/AccountSetting";
import UserProfileHeader from "../../components/organisms/profile/UserProfileHeader";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useTheme } from "@mui/material/styles";
import useFetch from "../../hooks/useFetch";

export default function Profile() {
  const [editUser, setEditUser] = useState(false);
  const { user, setUser , token } = useAuth();
  const { orgData } = UseOrg();
  const theme = useTheme();
  // const bgDynamic = theme?.palette?.primary?.main
  //   ? theme?.palette?.primary?.main
  //   : "#9f9685";
  const {
    data: infoUser,
    isFetched,
    isSuccess,
    refetch
  } = useFetch({
    endpoint: `users/info`,
    queryKey: ["users/info"],
    enabled: !!user && !!user?.is_verified,
  });
  useEffect(() => {
    if (isSuccess && user && user?.is_verified) {
      setUser(infoUser?.user);
    }
  }, [infoUser?.user, isSuccess, setUser, token, user, user?.is_verified]);

  return (
    <div
      className="grid grid-cols-12 gap-5"
      style={{
        // background: `linear-gradient(130deg, ${bgDynamic} 0%, rgba(255,255,255,1) 90%)`,
        height: "",
      }}
    >
      <div className="col-span-12 ">
        <UserProfileHeader
          setEditUser={setEditUser}
          user={user}
          orgData={orgData}
          theme={theme}
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
            refetch={refetch}
          />
        }
      />
    </div>
  );
}
