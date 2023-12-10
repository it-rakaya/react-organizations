/* eslint-disable react/prop-types */

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import bannerProfile from "../../../assets/images/pages/profile-banner.png";
import avatarUser from "../../../assets/avatars/1.png";
import { useAuth } from "../../../context/auth-and-perm/AuthProvider";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const UserProfileHeader = ({ setEditUser }) => {
  const { user } = useAuth();
  console.log(
    "🚀 ~ file: UserProfileHeader.jsx:27 ~ UserProfileHeader ~ user:",
    user
  );

  return (
    <Card>
      <CardMedia
        component="img"
        alt="profile-header"
        image={
          (user?.attachmentUrl?.length && user?.attachmentUrl[1]?.value) ||
          bannerProfile
        }
        sx={{
          height: { xs: 150, md: 250 },
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
            avatarUser
          }
          alt="profile-picture"
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
              <Box
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
              </Box>
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
            تعديل
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileHeader;
