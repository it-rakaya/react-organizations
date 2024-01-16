/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import defaultImage from "../../../../public/profile pic1.png";
import { convertArabicToEnglish, convertToHijri } from "../../../utils/helpers";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import IconifyIcon from "../../atoms/icons/IconifyIcon";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 150,
  height: 150,
  display: "flex",
  justifyContent: "center",
  border: `4px solid ${theme.palette.primary?.main}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
  borderRadius: "50%",
  // border:"2px solid black"
}));

const UserProfileHeader = ({ user, setEditUser, theme }) => {
  return (
    <div>
      <Card className="flex flex-col items-center justify-center !bg-transparent !shadow-none">
        <ProfilePicture
          src={
            (user?.attachmentUrl?.length && user?.attachmentUrl[1]?.value) ||
            defaultImage
          }
          alt="profile-picture"
        />
        <div className="flex flex-col items-center gap-2 mt-2">
          <h1 className="text-2xl font-extrabold dark:text-white">
            {user?.name}
          </h1>
          <div className="flex items-center">
            <ButtonComp
              className={"!m-0 py-2 px-3"}
              action={() => setEditUser(true)}
            >
              <p className="text-white ">{t("Edit personal information")}</p>
              <IconifyIcon
                icon={"bxs:edit"}
                className="w-[20px] h-[20px]  rtl:mr-2 ltr:ml-2 cursor-pointer text-white"
              />
            </ButtonComp>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 p-5 m-2 bg-white shadow-lg md:gap-20 md:m-20 md:mb-0 md:grid-cols-2 rounded-2xl dark:bg-dark-primary">
        <div>
          <div className="flex flex-col col-span-2 gap-2 py-2 border-b md:col-span-1">
            <p style={{ color: theme.palette.primary?.main }}>
              {t("phone number")}
            </p>
            <p className=" dark:text-white">{user?.phone}</p>
          </div>
          <div className="flex flex-col col-span-2 gap-2 py-2 mt-5 border-b md:col-span-1">
            <p style={{ color: theme.palette.primary?.main }}>{t("Email")}</p>
            <p className="dark:text-white">{user?.email}</p>
          </div>
          <div className="flex flex-col col-span-2 gap-2 py-2 mt-5 border-b md:col-span-">
            <p
              className="dark:text-white"
              style={{ color: theme.palette.primary?.main }}
            >
              {t("Birthday")}
            </p>
            <div className="flex gap-1">
              <p className=" dark:text-white">{user?.birthday}</p>/
              <p className="dark:text-white">
                {user?.birthday
                  ? convertArabicToEnglish(convertToHijri(user?.birthday))
                  : ""}
                {t("H")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col col-span-2 gap-2 py-2 border-b md:col-span-1">
            <p style={{ color: theme.palette.primary?.main }}>
              {t("National ID")}
            </p>
            <p className="dark:text-white">{user?.national_id}</p>
          </div>
          <div className="">
            <div className="flex flex-col col-span-2 gap-2 py-2 mt-5 border-b md:col-span-1">
              <p style={{ color: theme.palette.primary?.main }}>
                {t("National ID Expired")}
              </p>
              <div className="flex gap-1">
                <p className="dark:text-white">{user?.national_id_expired} /</p>

                <p className="dark:text-white">
                  {convertArabicToEnglish(
                    user?.national_id_expired !== "0000-00-00"
                      ? convertToHijri(user?.national_id_expired)
                      : ""
                  )}
                  {t("H")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 gap-2 py-2 mt-5 border-b md:col-span-1">
            <p style={{ color: theme.palette.primary?.main }}>{t("Country")}</p>
            <p className="text-black dark:text-white">
              {user?.nationality_name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
