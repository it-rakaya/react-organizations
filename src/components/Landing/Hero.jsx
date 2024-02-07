import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-and-perm/AuthProvider";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import ModalComp from "../atoms/ModalComp";
import Signature from "../molecules/Signature";
import { useIsRTL } from "../../hooks/useIsRTL";
import RegistrationClosed from "../molecules/RegistrationClosed";
const Hero = () => {
  const navigate = useNavigate();
  const btnStyles =
    "basis-1/2 py-4 rounded-lg font-bold text-lg 3xl:text-2xl shadow";
  const { i18n, t } = useTranslation();
  const { user, token } = useAuth();

  const { orgData } = UseOrg();
  const theme = useTheme();
  const language = i18n.language;
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const closeRegistration = orgData?.organizations?.close_registeration;

  const isRTL = useIsRTL();

  return (
    <div className="px-3 lg:w-1/2 2xl:ps-36 2xl:px-36 lg:ps-36">
      <div dir={i18n.dir(language)}>
        {/* title */}
        <div className="flex flex-col items-center justify-between w-full gap-5 xl:flex-row-reverse xl:gap-0">
          {/* <h1 className="px-6 py-1 border rounded-lg border-primaryText"> */}
          <img
            alt=""
            src={orgData?.organizations?.logo}
            className="w-[70px] rounded-xl"
          />
          {/* </h1> */}
          <h1 className="text-2xl font-bold 3xl:text-3xl dark:text-white">
            {!orgData?.organizations?.name && t("landing.organizationName")}
            {isRTL
              ? orgData?.organizations?.name_ar
              : orgData?.organizations?.name_en}
          </h1>
        </div>
        {/* description */}
        <div
          dangerouslySetInnerHTML={{ __html: orgData?.organizations?.about_us }}
          className={`w-full mt-5 decryption_orga overflow-scroll text-xl font-bold text-center rounded-[10px] md:text-start 3xl:text-2xl scroll_main ${orgData?.organizations?.about_us ? "dark:bg-white" :""} `}
        ></div>
        <div
          className={`flex flex-col gap-4 mt-5 ${!user ? " xl:flex-row" : ""}`}
        >
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                style={{ backgroundColor: theme?.palette?.primary?.main }}
                className={`${btnStyles} text-white transition-shadow duration-300 hover:shadow-lg `}
              >
                {t("Login")}
              </button>

              <button
                onClick={() =>
                  closeRegistration ==1 ? setOpenModal(true) : setOpen(true)
                }
                style={{
                  borderColor: theme?.palette?.primary?.main,
                  color: theme?.palette?.primary?.main,
                }}
                className={`${btnStyles} border-2  transition-shadow duration-300 hover:shadow-lg`}
              >
                {t("Register")}
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              style={{ backgroundColor: theme?.palette?.primary?.main }}
              className={`${btnStyles} text-white transition-shadow duration-300 hover:shadow-lg w-full `}
            >
              {t("landing.Dashboard")}
            </button>
          )}
        </div>
      </div>
      <ModalComp
        open={open}
        className="!max-w-[500px] !block  "
        onClose={() => setOpen(false)}
        Children={<Signature />}
      />
      <ModalComp
        open={openModal}
        className="!max-w-[500px] !block  "
        onClose={() => setOpenModal(false)}
        Children={<RegistrationClosed />}
      />
    </div>
  );
};

export default Hero;
