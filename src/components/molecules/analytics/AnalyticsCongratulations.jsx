/* eslint-disable react/prop-types */
// ** MUI Imports
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import { Link } from "react-router-dom";
import AvatarCongruity from "../../../assets/cards/illustration-john-dark.png";

// Styled Grid component
const StyledGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    order: -1,
    display: "flex",
    justifyContent: "center",
  },
}));

// Styled component for the image
const Img = styled("img")(({ theme }) => ({
  right: 0,
  bottom: 0,
  width: 298,
  position: "absolute",
  [theme.breakpoints.down("sm")]: {
    width: 250,
    position: "static",
  },
}));

const AnalyticsCongratulations = ({ userData }) => {
  return (
    <Card sx={{ position: "relative" }}>
      <CardContent
        sx={{ p: (theme) => `${theme.spacing(6.75, 7.5)} !important` }}
      >
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h5" sx={{ mb: 4.5 }}>
              <Box component="span" sx={{ fontWeight: "bold" }}>
                {t("Welcome")} {userData?.user?.name}
              </Box>
              ! 🎉
            </Typography>
            <Typography variant="body2">
              You have done{" "}
              <Box component="span" sx={{ fontWeight: 600 }}>
                68%
              </Box>{" "}
              😎 more sales today.
            </Typography>
            <Typography sx={{ mb: 4.5 }} variant="body2">
              Check your new badge in your profile.
            </Typography>
            <Link to={"/dashboard/profile"}>
              <Button variant="contained" className="bg-contained">
                بياناتي الشخصية
              </Button>
            </Link>
          </Grid>
          <StyledGrid item xs={12} sm={6}>
            {/* ${theme.palette.mode}.png`} */}
            <Img alt="Congratulations John" src={AvatarCongruity} />
          </StyledGrid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AnalyticsCongratulations;
