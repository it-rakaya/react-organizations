import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "../../components/atoms/icons/LoginIcon";
import RegisterForm from "../../components/templates/RegisterForm";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useSettings } from "../../hooks/useSettings";
import { useEffect } from "react";
import { t } from "i18next";
import Loading from "../../components/molecules/Loading";
import Navbar from "../../components/Landing/Navbar";
import { useIsRTL } from "../../hooks/useIsRTL";
import { Alert } from "@mui/material";

const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
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
    maxWidth: 880,
  },
}));

const Register = () => {
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const { skin } = settings;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { orgData, isSuccess, isRefetching } = UseOrg();
  const isRTL = useIsRTL();
  const closeRegistration = orgData?.organizations?.close_registeration;

  const name = isRTL
    ? orgData?.organizations?.name_ar
    : orgData?.organizations?.name_en;
  const organizationName = !name ? t("landing.organizationName") : name;

  const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: "0.18px",
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
  }));

  useEffect(() => {
    if (token || closeRegistration == 1) {
      navigate("/");
    }
  }, [closeRegistration, navigate, token]);
  if (closeRegistration == 1) return navigate("/");
  if (!isSuccess || isRefetching) return <Loading />;
  if (!token) {
    return (
      <>
        <div className="absolute rtl:left-0 ltr:right-0 z-[99] w-full md:!w-auto">
          <Navbar hidden={true}  className={"!justify-end md:!bg-transparent"}/>
        </div>

        <Box className="flex content-right">
          <RightWrapper
            sx={
              skin === "bordered" && !hidden
                ? { borderLeft: `1px solid ${theme.palette.divider}` }
                : {}
            }
          >
            <Box
              sx={{
                p: 7,
                backgroundColor: "background.paper",
                height: "100vh",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
              className="mt-10 md:mt-0 scroll_main dark:bg-darkModeColor"
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                  flexDirection: "column",
                  gap: "10px",
                  marginTop: "20px",
                }}
              >
                <Link to="/">
                  <img
                    src={orgData?.organizations?.logo}
                    className="w-[30px]"
                  />
                </Link>
                <Box sx={{ mb: 3, width: "100%" }} className="text-center">
                  <TypographyStyled
                    className="!text-black dark:!text-white"
                    variant="h5"
                  >{`${t("Welcome to")} ${organizationName}`}</TypographyStyled>
                </Box>
              </Box>
              {closeRegistration == 1 ? (
                <div
                  className="flex items-center justify-center "
                  style={{ height: "calc(100vh - 190px)" }}
                >
                  <Alert
                    severity="warning"
                    className="flex items-center justify-center !bg-transparent mt-[-14px]"
                  >
                    <div className="flex items-center gap-5 ">
                      <p className="p-0 m-0 text-xl font-bold text-red-500">
                        {t("Registration period is closed")}
                      </p>
                    </div>
                  </Alert>
                </div>
              ) : (
                <BoxWrapper>
                  <RegisterForm />
                </BoxWrapper>
              )}
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
              <RegisterIllustrationWrapper>
                <LoginIcon />
              </RegisterIllustrationWrapper>
            </Box>
          ) : null}
        </Box>
      </>
    );
  } else {
    navigate("/dashboard");
  }
};

export default Register;
