/* eslint-disable react/prop-types */

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
}));

const OrganizationProfile = ({ orgData }) => {
  console.log(
    "🚀 ~ file: OrganizationProfile.jsx:21 ~ OrganizationProfile ~ orgData:",
    orgData
  );
  return (
    <Card>
      {/* <CardMedia
        component="img"
        alt="profile-header"
        image={orgData?.organizations?.background_image || bannerProfile}
        sx={{
          height: { xs: 150, md: 250 },
        }}
      /> */}
      <CardContent
        sx={{
          pt: 0,
          //   mt: -8,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          flexWrap: { xs: "wrap", md: "nowrap" },
          justifyContent: { xs: "center", md: "center" },
        }}
      >
        <ProfilePicture
          src={orgData?.organizations?.logo}
          alt="profile-picture"
        />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            ml: { xs: 0, md: 6 },
            alignItems: "start",
            flexWrap: ["wrap", "nowrap"],
            flexDirection: "column",

            justifyContent: ["start"],
          }}
        >
          <Box
            sx={{
              mb: [6, 0],
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "start",
            }}
          >
            <Typography variant="h5" sx={{ mb: 4, fontSize: "1.375rem" }}>
              {orgData?.organizations?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection:"column",
                  alignItems: "start",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "text.secondary", fontWeight: 600 }}
                >
                  <span>عن </span>
                  <span>{orgData?.organizations?.name}:</span>
                </Typography>
                <div
                  dangerouslySetInnerHTML={{
                    __html: orgData?.organizations?.about_us,
                  }}
                  className="text-xl text-center Text md:text-start 3xl:text-2xl"
                ></div>
              </Box>
         
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrganizationProfile;
