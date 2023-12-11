import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LoginIcon from "../../components/atoms/icons/LoginIcon";
import RegisterForm from "../../components/templates/RegisterForm";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { useSettings } from "../../hooks/useSettings";
import { useEffect } from "react";

const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

// const RegisterIllustration = styled("img")(({ theme }) => ({
//   maxWidth: "48rem",
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

const Register = () => {
  const theme = useTheme();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));
  const { skin } = settings;
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const { orgData } = UseOrg();
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);
  
  if (!token) {
    return (
      <Box className="flex content-right">
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
              {/* <RegisterIllustration
                alt="register-illustration"
                // src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                src={imgLogin}
              /> */}
              <LoginIcon />
            </RegisterIllustrationWrapper>
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
              backgroundColor: "background.paper",
              height: "100vh",
              overflowY: "scroll",
            }}
            className="scroll_main"
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <img src={orgData?.organizations?.logo} className="w-[30px]" />
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
            <BoxWrapper>
              <RegisterForm />
            </BoxWrapper>
          </Box>
        </RightWrapper>
      </Box>
    );
  } else {
    navigate("/dashboard");
  }
};

export default Register;
