/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import defaultImage from "../../../../public/profile pic1.png";
import { useIsRTL } from "../../../hooks/useIsRTL";
import { convertArabicToEnglish, convertToHijri } from "../../../utils/helpers";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import PreviewID from "../../atoms/icons/PreviewID";
import PadgePreview from "../../molecules/PadgePreview";

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
  const isRTL = useIsRTL();

  return (
    <div>
      <Card className="flex flex-col items-center justify-center !bg-transparent !shadow-none">
        <ProfilePicture
          src={user?.profile_photo || defaultImage}
          alt="profile-picture"
          style={{ backgroundColor: theme?.palette?.primary?.main }}
        />
        <div className="flex flex-col items-center gap-2 mt-2">
          <h1 className="text-2xl font-extrabold dark:text-white">
            {user?.name}
          </h1>
          <div className="flex items-center gap-1">
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
            <div>
              {/* <div className="" >
                {!user?.value?.toLowerCase().endsWith(".pdf") ? (
                  <div
                    className="rounded-sm "
                    style={{ background: theme?.palette?.primary.main }}
                  >
                    <PadgePreview url={item?.value} label={item?.label} />
                  </div>
                ) : (
                  <div
                    className="px-1 rounded-sm bg-primary"
                    style={{
                      background: theme?.palette?.primary.main,
                      opacity: "0,8",
                    }}
                  >
                    <a
                      href={item?.value}
                      download={item?.value}
                      className=""
                      target="_blank"
                      rel="noreferrer"
                    >
                      <p className="text-[10px] text-white px-1">
                        {item?.label}
                      </p>
                    </a>
                  </div>
                )}
              </div> */}
              {/* <PreviewID /> */}
              <div className="">
                {!user?.national_id_attachment
                  ?.toLowerCase()
                  .endsWith(".pdf") ? (
                  <div
                    className="rounded-[8px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                    style={{ background: theme?.palette?.primary.main }}
                  >
                    <PadgePreview
                      url={user?.national_id_attachment}
                      label={<PreviewID />}
                    />
                  </div>
                ) : (
                  <div
                    className="rounded-[8px] w-[40px] h-[40px] flex items-center justify-center cursor-pointer"
                    style={{
                      background: theme?.palette?.primary.main,
                      opacity: "0,8",
                    }}
                  >
                    <a
                      href={user?.national_id_attachment}
                      download={user?.national_id_attachment}
                      className=""
                      target="_blank"
                      rel="noreferrer"
                    >
                      <PreviewID />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 p-5 m-2 bg-white shadow-lg md:gap-20 md:m-20 md:mb-0 md:grid-cols-2 rounded-2xl dark:bg-dark-primary">
        <div>
          <div className="flex flex-col col-span-2 gap-2 py-2 border-b md:col-span-1">
            <p style={{ color: theme.palette.primary?.main }}>
              {t("Phone Number")}
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
              <p className=" dark:text-white">{user?.birthday}</p>
              <span className=" dark:text-white">/</span>
              <p className="dark:text-white" dir="rtl">
                {convertToHijri(user?.birthday).hy}-{" "}
                {convertToHijri(user?.birthday).hd}-{" "}
                {convertToHijri(user?.birthday).hm}
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

                <p className="dark:text-white" dir="rtl">
                  {/* {user?.national_id_expired !== "0000-00-00"
                    ? convertToHijri(user?.national_id_expired)
                    : ""} */}
                  {convertToHijri(user?.national_id_expired).hy}-{" "}
                  {convertToHijri(user?.national_id_expired).hd}-{" "}
                  {convertToHijri(user?.national_id_expired).hm}
                  {t("H")}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col col-span-2 gap-2 py-2 mt-5 border-b md:col-span-1">
            <p style={{ color: theme.palette.primary?.main }}>{t("Country")}</p>
            <p className="text-black dark:text-white">
              {isRTL ? user?.country.name_ar : user?.country.name_en}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
