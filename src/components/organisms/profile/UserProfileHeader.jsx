/* eslint-disable react/prop-types */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import defaultImage from "../../../../public/profile pic1.png";
import { t } from "i18next";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserProfileHeader = ({ setEditUser, user }) => {
  const theme = useTheme();
  const bgDynamic = theme?.palette?.primary?.main
    ? theme?.palette?.primary?.main
    : "#9f9685";

  return (
    <>
      <Card>
        <CardMedia
          component="div"
          alt="profile-header"
          // image={orgData?.organizations?.background_image || bannerProfile}
          sx={{
            height: { xs: 150, md: 250 },
          }}
          style={{
            background: `linear-gradient(62deg, rgba(32,32,32,1) 0%, ${bgDynamic} 37%, rgba(255,255,255,1) 100%)`,
          }}
        />
        <CardContent
          sx={{
            pt: 0,
            mt: -8,
            display: "flex",
            alignItems: "flex-end",
            flexWrap: { xs: "wrap", md: "nowrap" },
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <ProfilePicture
            src={
              (user?.attachmentUrl?.length && user?.attachmentUrl[1]?.value) ||
              defaultImage
            }
            alt="profile-picture"
            style={{backgroundColor:theme?.palette?.primary?.main,}}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              ml: { xs: 0, md: 6 },
              alignItems: "flex-end",
              flexWrap: ["wrap", "nowrap"],
              justifyContent: ["center", "space-between"],
            }}
          >
            <Box
              sx={{
                mb: [6, 0],
                display: "flex",
                flexDirection: "column",
                alignItems: ["center", "flex-start"],
              }}
            >
              <Typography variant="h5" sx={{ mb: 4, fontSize: "1.375rem" }}>
                {user?.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: ["center", "flex-start"],
                }}
              >
                {/* <Box
                  sx={{
                    mr: 4,
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 1, color: "text.secondary" },
                  }}
                >
                  <IconifyIcon icon={"mdi:briefcase-outline"} />
                  <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
                    {user?.role_name}
                  </Typography>
                </Box> */}
                <Box
                  sx={{
                    mr: 4,
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 1, color: "text.secondary" },
                  }}
                >
                  <IconifyIcon icon="mdi:map-marker-outline" />
                  <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
                    {user?.nationality_name || "egypt"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& svg": { mr: 1, color: "text.secondary" },
                  }}
                >
                  <IconifyIcon icon="mdi:calendar-blank-outline" />
                  <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
                    Birthday {user?.birthday}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Button
              onClick={() => setEditUser(true)}
              variant="outlined"
              startIcon={<IconifyIcon icon="mdi:account-edit" fontSize={20} />}
            >
              {t("Edit")}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Card className="py-4 mt-5">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            ml: { xs: 0, md: 6 },
            alignItems: "start",
            flexDirection: "column",
            flexWrap: ["wrap"],
          }}
        >
          <Box
            sx={{
              mr: 4,

              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1, color: "text.secondary" },
            }}
          >
            <IconifyIcon icon="ant-design:phone-outlined" />
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p>رقم الهاتف :{user?.phone}</p>
            </Typography>
          </Box>
          <Box
            sx={{
              mr: 4,
              mt: 4,

              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1, color: "text.secondary" },
            }}
          >
            <IconifyIcon icon="ic:outline-email" />
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p>البريد الالكتروني :{user?.email}</p>
            </Typography>
          </Box>
          <Box
            sx={{
              mr: 4,
              mt: 4,

              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1, color: "text.secondary" },
            }}
          >
            <IconifyIcon icon="entypo:v-card" />
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p> الهوية الوطنية:{user?.national_id}</p>
            </Typography>
          </Box>
          <Box
            sx={{
              mr: 4,
              mt: 4,

              display: "flex",
              alignItems: "center",
              "& svg": { mr: 1, color: "text.secondary" },
            }}
          >
            <IconifyIcon icon="solar:card-2-outline" />
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p> تاريخ انتهاء الهوية الوطنية:{user?.national_id_expired}</p>
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default UserProfileHeader;
