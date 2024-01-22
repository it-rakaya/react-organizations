import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { t } from "i18next";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginIcon from "../../components/atoms/icons/LoginIcon";
import LoginForm from "../../components/templates/LoginForm";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useSettings } from "../../hooks/useSettings";

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
  const { orgData } = UseOrg();
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  const { skin } = settings;
  const token = Cookies.get("token");
  const organizationName = !orgData?.organizations?.name_ar
    ? t("landing.organizationName")
    : orgData?.organizations?.name_ar;
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  // if (!isSuccess || isRefetching) return <Loading />;
  if (!token) {
    return (
      <div className="">
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
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "background.paper",
                height: "100vh",
                overflowY: "scroll",
                overflowX: "hidden",

              }}
              className="scroll_main"
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
                  <TypographyStyled className="!text-black dark:!text-white" variant="h5">{`${t(
                    "Welcome to"
                  )} ${organizationName}!`}</TypographyStyled>
                  <Typography variant="body2" className="!text-black dark:!text-white" >
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
                  <Typography sx={{ mr: 2,}} className="!text-black dark:!text-white" >
                    {t("New on our platform?")}
                  </Typography>
                  <Link
                    to="/register"
                    sx={{ color: "primary.main", textDecoration: "none" }}
                    className="!text-black dark:!text-white" 
                  >
                    {t("Create an account")}
                  </Link>
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
      </div>
    );
  } else {
    navigate("/dashboard");
  }
};

export default Login;
