import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import React from 'react'
import OptionsMenu from '../Navbar/option-menu/OptionsMenu';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import FacilityIcon from '../../atoms/icons/FaciltyIcon';
import ButtonComp from '../../atoms/buttons/ButtonComp';

function CardFacility({paginatedFacilities , setOpen , setDetailsItem , setOpenAddEmployee , setFacultyID}) {
  const navigate = useNavigate();

  return (
    <Grid container spacing={6}>
    {paginatedFacilities?.map((item) => (
      <>
        <Grid item xs={12} sm={4} md={3} key={item?.id}>
          <Card
            sx={{ position: "relative", height: "190px" }}
            className="flex flex-col items-center justify-end"
          >
            <OptionsMenu
              iconButtonProps={{
                size: "small",
                sx: { top: 12, right: 12, position: "absolute" },
              }}
              options={[
                {
                  text: t("Details"),
                  details: "Additional details here",
                  function: () => {
                    setOpen(true);
                    setDetailsItem(item);
                  },
                },

                {
                  text: t("Edit"),
                  function: () => {
                    navigate(
                      `/dashboard/facilities/edit-facility/${item?.id}`
                    );
                  },
                },
              ]}
            />
            <CardContent
              className=" pt-5 !pb-0 !pl-0 !pr-0 cursor-pointer"
              onClick={() => {
                setOpen(true);
                setDetailsItem(item);
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <div className="flex flex-col items-center justify-center">
                  <FacilityIcon />
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 500, marginTop: 1 }}
                    className="!my-2 text-center mx-1 text-black dark:text-white
                    "
                  >
                    {item?.name}
                  </Typography>
                </div>
              </Box>
            </CardContent>
            <ButtonComp
              variant="contained"
              className={"!m-0 !rounded-l-none !rounded-r-none"}
              action={() => {
                setOpenAddEmployee(true);
                setFacultyID(item?.id);
              }}
            >
              {t("ADD EMPLOYEE")}
            </ButtonComp>
          </Card>
        </Grid>
      </>
    ))}
  </Grid>
  )
}

export default CardFacility