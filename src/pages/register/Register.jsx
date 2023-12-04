import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import imageSource from "../../../src/assets/images/pages/auth-v2-register-illustration-bordered-light.png";
import RegisterForm from "../../components/templates/RegisterForm";
import { useSettings } from "../../hooks/useSettings";
import themeConfig from "../../themeConfig";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const RegisterIllustrationWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const RegisterIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
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
            }}
          >
            <RegisterIllustrationWrapper>
              <RegisterIllustration
                alt="register-illustration"
                // src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                src={imageSource}
              />
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
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.paper",
            }}
          >
            <BoxWrapper>
              <Box
                sx={{
                  top: 30,
                  left: 40,
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg
                  width={47}
                  fill="none"
                  height={26}
                  viewBox="0 0 268 150"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    rx="25.1443"
                    width="50.2886"
                    height="143.953"
                    fill={theme.palette.primary.main}
                    transform="matrix(-0.865206 0.501417 0.498585 0.866841 195.571 0)"
                  />
                  <rect
                    rx="25.1443"
                    width="50.2886"
                    height="143.953"
                    fillOpacity="0.4"
                    fill="url(#paint0_linear_7821_79167)"
                    transform="matrix(-0.865206 0.501417 0.498585 0.866841 196.084 0)"
                  />
                  <rect
                    rx="25.1443"
                    width="50.2886"
                    height="143.953"
                    fill={theme.palette.primary.main}
                    transform="matrix(0.865206 0.501417 -0.498585 0.866841 173.147 0)"
                  />
                  <rect
                    rx="25.1443"
                    width="50.2886"
                    height="143.953"
                    fill={theme.palette.primary.main}
                    transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                  />
                  <rect
                    rx="25.1443"
                    width="50.2886"
                    height="143.953"
                    fillOpacity="0.4"
                    fill="url(#paint1_linear_7821_79167)"
                    transform="matrix(-0.865206 0.501417 0.498585 0.866841 94.1973 0)"
                  />
                  <rect
                    rx="25.1443"
                    width="50.2886"
                    height="143.953"
                    fill={theme.palette.primary.main}
                    transform="matrix(0.865206 0.501417 -0.498585 0.866841 71.7728 0)"
                  />
                  <defs>
                    <linearGradient
                      y1="0"
                      x1="25.1443"
                      x2="25.1443"
                      y2="143.953"
                      id="paint0_linear_7821_79167"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient
                      y1="0"
                      x1="25.1443"
                      x2="25.1443"
                      y2="143.953"
                      id="paint1_linear_7821_79167"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop />
                      <stop offset="1" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <Typography
                  variant="h6"
                  sx={{
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 700,
                    fontSize: "1.5rem !important",
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>

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
