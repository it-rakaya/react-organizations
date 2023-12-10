import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { t } from "i18next";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import { useEffect } from "react";
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

// const LoginIllustration = styled("img")(({ theme }) => ({
//   maxWidth: "50rem",
//   [theme.breakpoints.down("xl")]: {
//     maxWidth: "50rem",
//   },
//   [theme.breakpoints.down("lg")]: {
//     maxWidth: "30rem",
//   },
// }));

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

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  // const imageSource = skin === 'bordered' ? 'auth-v2-login-illustration-bordered' : 'auth-v2-login-illustration'
  if (!token) {
    return (
      <div className="">
        <Box className="flex content-right">
    
          {!hidden ? (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                position: "relative",
                alignItems: "center",
                justifyContent: "center",
                height:"100vh",
                overflow:"hidden"
              }}
            >
              <LoginIllustrationWrapper>
                {/* <LoginIllustration
                  alt="login-illustration"
                  // src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                  src={imgLogin}
                /> */}
                <LoginIcon/>
              </LoginIllustrationWrapper>
              {/* <FooterIllustrationsV2 /> */}
            </Box>
          ) : null}
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
                height: "100%",
                display: "flex",
                alignItems: "start",
                flexDirection:"column",
                justifyContent: "start",
                backgroundColor: "background.paper",
              }}
            >
                 <Box
                  sx={{
                   
                    display: "flex",
                    width:"100%",
                    alignItems: "start",
                    justifyContent: "start",
                  }}
                >
                  <img src={orgData?.organizations?.logo} className="w-[30px]"/>
                  <Typography
                    variant="h6"
                    sx={{
                      ml: 2,
                      lineHeight: 1,
                      fontWeight: 700,
                      fontSize: "1.5rem !important",
                    }}
                  >
                    {orgData?.organizations?.name_ar}
                  </Typography>
                </Box>
              <BoxWrapper className="flex flex-col items-center justify-center h-full" >
                <Box sx={{ mb: 6 , width:"100%" }}>
             
                  <TypographyStyled variant="h5">{`${t("Welcome to")} ${
                    orgData?.organizations?.name_ar
                  }! 👋🏻`}</TypographyStyled>
                  <Typography variant="body2">
                    {t("Please sign-in to your account")}
                  </Typography>
                </Box>

                <LoginForm />

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Typography sx={{ mr: 2, color: "text.secondary" }}>
                    {t("New on our platform?")}
                  </Typography>
                  <Link
                    to="/register"
                    sx={{ color: "primary.main", textDecoration: "none" }}
                  >
                    {t("Create an account")}
                  </Link>
                </Box>
              </BoxWrapper>
            </Box>
          </RightWrapper>
        </Box>
      </div>
    );
  } else {
    navigate("/dashboard");
  }
};

export default Login;
