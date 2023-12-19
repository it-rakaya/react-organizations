import React from "react";
import UserNotVerifiedIcon from "../atoms/icons/UserNotVerifiedIcon";
import ButtonComp from "../atoms/buttons/ButtonComp";
import { Alert } from "@mui/material";

function UserNotVerified({ user, setOpen, sendOTP, organization_id }) {
  return (
    <div className="w-full">
      <div className="mx-20 ">
        <h1 className="text-3xl font-bold text-black ">
          مرحبا بك {user?.name} !
        </h1>
        <Alert severity="warning" className="flex items-center bg-transparent ">
          <div className="flex items-center gap-5 ">
            <p className="p-0 m-0 font-bold text-black">
              {" "}
              لاضافة منشئه جديده يرجى تفعيل حسابك
            </p>

            <ButtonComp
              variant="contained"
              className="w-auto !m-0"
              action={() => {
                setOpen(true);
                sendOTP({
                  organization_id: organization_id,
                  phone: user?.phone,
                  phone_code: user?.phone_code,
                });
              }}
            >
              اضغط هنا
            </ButtonComp>
          </div>
        </Alert>
      </div>
      <div className="flex justify-center w-full">
        <UserNotVerifiedIcon />
      </div>
    </div>
  );
}

export default UserNotVerified;
