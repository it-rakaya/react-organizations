import React from "react";
import UserNotVerifiedIcon from "../atoms/icons/UserNotVerifiedIcon";
import ButtonComp from "../atoms/buttons/ButtonComp";
import { Alert } from "@mui/material";
import { t } from "i18next";

function UserNotVerified({ user, setOpen, sendOTP, organization_id }) {
  return (
    <div className="w-full">
      <div className="md:mx-20 ">
        <h1 className="text-3xl font-bold text-black dark:text-white ">
          <p className="text-black dark:text-white">
            {t("Welcome")} {user?.name} !
          </p>
        </h1>
        <div className="md:!flex !items-center gap-1 md:gap-5 mt-5">
          <Alert severity="warning" className="!bg-transparent ">
            <div className="!flex !items-center gap-1 md:gap-5 ">
              <p className="p-0 m-0 font-bold text-black dark:text-white">
                {t("Add a new facility, please activate your account")}
              </p>
            </div>
          </Alert>
          <ButtonComp
            variant="contained"
            className=" w-full md:!w-auto !m-0 rtl:!mt-0 ltr:!mt-0 "
            action={() => {
              setOpen(true);
              sendOTP({
                organization_id: organization_id,
                phone: user?.phone,
                phone_code: user?.phone_code,
              });
            }}
          >
            {t("click here")}
          </ButtonComp>
        </div>
      </div>
      <div className="flex justify-center w-full">
        <UserNotVerifiedIcon />
      </div>
    </div>
  );
}

export default UserNotVerified;
