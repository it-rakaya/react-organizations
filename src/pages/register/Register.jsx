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
    maxWidth: 400,
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
  const organizationName = !orgData?.organizations?.name_ar
    ? t("landing.organizationName")
    : orgData?.organizations?.name_ar;

  const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    letterSpacing: "0.18px",
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
  }));

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  if (!isSuccess || isRefetching) return <Loading />;
  if (!token) {
    return (
      <>
        <div className="absolute rtl:left-0 ltr:right-0 z-[99]">
          <Navbar hidden={true} />
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
              className="scroll_main dark:bg-darkModeColor"
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
                  >{`${t(
                    "Welcome to"
                  )} ${organizationName}! 👋🏻`}</TypographyStyled>
                </Box>
              </Box>
              <BoxWrapper>
                <RegisterForm />
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
