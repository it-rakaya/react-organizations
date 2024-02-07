import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { t } from "i18next";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Landing/Navbar";
import LoginIcon from "../../components/atoms/icons/LoginIcon";
import Loading from "../../components/molecules/Loading";
import LoginForm from "../../components/templates/LoginForm";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useIsRTL } from "../../hooks/useIsRTL";
import ModalComp from "../../components/atoms/ModalComp";
import Signature from "../../components/molecules/Signature";
import RegistrationClosed from "../../components/molecules/RegistrationClosed";

const LoginIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const RightWrapper = styled(Box)(({ theme }) => ({
  width: "100%",

  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const Login = () => {
  const navigate = useNavigate();
  const { orgData, isSuccess, isRefetching } = UseOrg();
  const theme = useTheme();
  // const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const isRTL = useIsRTL();

  const name = isRTL
    ? orgData?.organizations?.name_ar
    : orgData?.organizations?.name_en;

  const token = Cookies.get("token");
  const organizationName = !name ? t("landing.organizationName") : name;
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const closeRegistration = orgData?.organizations?.close_registeration;

  if (!isSuccess || isRefetching) return <Loading />;
  if (!token) {
    return (
      <div className="">
        <div className="absolute rtl:left-0 ltr:right-0 z-[99]">
          <Navbar hidden={true} />
        </div>

        <Box className="flex content-right">
          <RightWrapper>
            <Box
              sx={{
                p: 7,
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "background.paper",
                height: "100vh",
                overflowY: "scroll",
                overflowX: "hidden",
                padding:" 0 15px",
              }}
              className="scroll_main dark:bg-darkModeColor"
            >
              <Box
                sx={{
                  display: "flex",
                  cursor: "pointer",
                  justifyContent: "center",
                }}
              >
                <img
                  src={orgData?.organizations?.logo}
                  className=" h-[100px] rounded-xl  mx-auto"
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </Box>
              <BoxWrapper className="flex flex-col items-center justify-center mt-5">
                <Box sx={{ mb: 3, width: "100%" }} className="text-center">
                  <TypographyStyled
                    className="!text-black dark:!text-white"
                    variant="h5"
                  >{`${t(
                    "Welcome to"
                  )} ${organizationName}!`}</TypographyStyled>
                  <Typography
                    variant="body2"
                    className="!text-black dark:!text-white"
                  >
                    {t("Please sign-in to your account")}
                  </Typography>
                  {/* <Typography variant="body2" className="text-black dark:text-white" >{"530410927"}</Typography> */}
                </Box>

                <LoginForm />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <span
                 
                    className="!text-black dark:!text-white mx-2"
                  >
                    {t("Don't have an account yet ?")}
                  </span>
                  <span
                    // to="/register"
                    style={{
                      color: theme?.palette?.primary?.main,
                      textDecoration: "none",
                    }}
                    className="cursor-pointer "
                    onClick={() =>
                      closeRegistration == 1 ? setOpenModal(true) : setOpen(true)
                    }
                  >
                    {t("Create an account")}
                  </span>
                </Box>
              </BoxWrapper>
            </Box>
          </RightWrapper>
          {!hidden ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                overflow: "hidden",
              }}
            >
              <LoginIllustrationWrapper>
                <LoginIcon />
              </LoginIllustrationWrapper>
              {/* <FooterIllustrationsV2 /> */}
            </Box>
          ) : null}
        </Box>
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
  } else {
    navigate("/dashboard");
  }
};

export default Login;
