/* eslint-disable react/prop-types */

import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import defaultImage from "../../../../public/profile pic1.png";

const ProfilePicture = styled("img")(({ theme }) => ({
  width: 150,
  height: 150,
  display: "flex",
  justifyContent: "center",
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down("md")]: {
    marginBottom: theme.spacing(4),
  },
  borderRadius: "50%",
}));

const UserProfileHeader = ({ user }) => {
  const theme = useTheme();
  const bgDynamic = theme?.palette?.primary?.main
    ? theme?.palette?.primary?.main
    : "#9f9685";

  return (
    <div style={{ backgroundColor: bgDynamic }}>
      <Card className="flex justify-center bg-transparent shadow-none">
        <ProfilePicture
          src={
            (user?.attachmentUrl?.length && user?.attachmentUrl[1]?.value) ||
            defaultImage
          }
          alt="profile-picture"
          style={{ backgroundColor: theme?.palette?.primary?.main }}
        />
      </Card>
      <div className="grid grid-cols-2 p-5 m-20 bg-white rounded shadow ">
        <div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="ant-design:phone-outlined" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p>رقم الهاتف :{user?.phone}</p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="ic:outline-email" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p>البريد الالكتروني :{user?.email}</p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="entypo:v-card" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p> الهوية الوطنية:{user?.national_id}</p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="solar:card-2-outline" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p> تاريخ انتهاء الهوية الوطنية:{user?.national_id_expired}</p>
            </Typography>
          </div>
        </div>

        <div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="ant-design:phone-outlined" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p>رقم الهاتف :{user?.phone}</p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="ic:outline-email" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p>البريد الالكتروني :{user?.email}</p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="entypo:v-card" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p> الهوية الوطنية:{user?.national_id}</p>
            </Typography>
          </div>
          <div className="flex gap-2 mt-4">
            {/* <IconifyIcon icon="solar:card-2-outline" /> */}
            <Typography sx={{ color: "text.secondary", fontWeight: 600 }}>
              <p> تاريخ انتهاء الهوية الوطنية:{user?.national_id_expired}</p>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;
