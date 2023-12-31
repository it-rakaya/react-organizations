/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import defaultImage from "../../../../public/profile pic1.png";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { t } from "i18next";
import { convertArabicToEnglish, convertToHijri } from "../../../utils/helpers";

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
        <div className="flex items-center gap-2 mt-2">
          <h1 className="text-3xl font-extrabold dark:text-white">
            {user?.name}
          </h1>
          <IconifyIcon
            icon={"bxs:edit"}
            className="w-[20px] md:w-[30px] h-[20px] md:h-[30px] cursor-pointer"
            onClick={() => setEditUser(true)}
            style={{ color: theme.palette.primary?.main }}
          />
        </div>
      </Card>
      <div className="grid grid-cols-1 p-5 m-2 bg-white shadow-lg md:m-20 md:grid-cols-2 rounded-2xl dark:bg-dark-primary">
        <div>
          <div className="flex gap-2 mt-4">
            <Typography
              sx={{ color: "text.secondary", fontWeight: 600 }}
              className="dark:text-white"
            >
              <p className="dark:text-white">
                {" "}
                {t("phone number")} :{user?.phone}
              </p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            <Typography
              sx={{ color: "text.secondary", fontWeight: 600 }}
              className="dark:text-white"
            >
              <p className="dark:text-white">
                {t("Email")} :{user?.email}
              </p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            <Typography
              sx={{ color: "text.secondary", fontWeight: 600 }}
              className="dark:text-white"
            >
              <div className="flex gap-1">
                <p className="dark:text-white">{t("Birthday")} :</p>
                <p className="dark:text-white">{user?.birthday}</p>/
                <p className="dark:text-white">
                  {user?.birthday
                    ? convertArabicToEnglish(convertToHijri(user?.birthday))
                    : ""}
                </p>
                هـ
              </div>
            </Typography>
          </div>
        </div>

        <div>
          <div className="flex gap-2 mt-4">
            <Typography
              sx={{ color: "text.secondary", fontWeight: 600 }}
              className="dark:text-white"
            >
              <p className="dark:text-white">
                {" "}
                {t("National ID")}:{user?.national_id}
              </p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            <Typography
              sx={{ color: "text.secondary", fontWeight: 600 }}
              className="dark:text-white"
            >
              <p className="dark:text-white">
                <div className="flex gap-1">
                  {t("National ID Expired")} :
                  <p className="dark:text-white">{user?.national_id_expired}</p>
                  /
                  <p className="dark:text-white">
                    {convertArabicToEnglish(
                      user?.national_id_expired !== "0000-00-00"
                        ? convertToHijri(user?.national_id_expired)
                        : ""
                    )}
                  </p>
                  هـ
                </div>
              </p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            <Typography
              sx={{ color: "text.secondary", fontWeight: 600 }}
              className="dark:text-white"
            >
              <p className="dark:text-white">
                {" "}
                {t("Country")} :{user?.nationality_name}
              </p>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
