/* eslint-disable no-unused-vars */
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import DataNotFound from "../../components/molecules/NotFound";
import DetailsFacility from "../../components/organisms/MyFacilities/DetailsFacility";
import StepperFacility from "../../components/organisms/MyFacilities/StepperFacility";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";
import useFetch from "../../hooks/useFetch";

export default function MyFacilities() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [facultyID, setFacultyID] = useState("");
  const [detailsItem, setDetailsItem] = useState();
  const [resetForm, setResetForm] = useState(true);

  const {
    data: facilities,
    isLoading,
    isRefetching,
    refetch,
  } = useFetch({
    endpoint: `facilities`,
    queryKey: ["facilities"],
    onError(e) {
      console.log("e", e);
    },
  });

  const handleEdit = () => {
    setShow(true);
  };

  return (
    <div>
      <MainHeader
        title="منشآتي"
        addTitle="اضافة منشأ"
        action={() => setOpenAddFaculty(true)}
      />
      {isLoading || isRefetching ? (
        <Loading />
      ) : facilities?.user_facilities.length ? (
        <>
          <Grid container spacing={6}>
            {facilities?.user_facilities?.map((item) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                key={item?.id}
                className={{ height: "290px" }}
              >
                <Card sx={{ position: "relative" }}>
                  <OptionsMenu
                    iconButtonProps={{
                      size: "small",
                      sx: { top: 12, right: 12, position: "absolute" },
                    }}
                    options={[
                      {
                        text: "تفاصيل",
                        details: "Additional details here",
                        function: () => {
                          // Add your custom function logic here
                          setOpen(true);
                          setDetailsItem(item);
                        },
                      },

                      {
                        text: "تعديل",
                        function: () => {
                          setOpenAddFaculty(true);
                          setResetForm(false);
                        },
                      },
                      { divider: true },
                      {
                        text: "حذف",
                        menuItemProps: { sx: { color: "error.main" } },
                      },
                    ]}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      {/* <Avatar
                        src={"/images/icons/project-icons/social-label.png"}
                        sx={{ mb: 4, width: 100, height: 100 }}
                      /> */}
                      <img
                        width="60"
                        height="60"
                        src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/64/external-company-town-xnimrodx-lineal-xnimrodx-4.png"
                        alt="external-company-town-xnimrodx-lineal-xnimrodx-4"
                      />
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 500, marginTop: 1 }}
                        className="my-2"
                      >
                        {item?.name}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setOpenAddEmployee(true);
                          setFacultyID(item?.id);
                        }}
                      >
                        اضافة موظف{" "}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <DataNotFound title={"لايوجد منشآت"} />
      )}
      <ModalComp
        open={open}
        onClose={() => setOpen(false)}
        Children={<DetailsFacility data={detailsItem} />}
      />
      <ModalComp
        open={openAddFaculty}
        className={"  "}
        onClose={() => setOpenAddFaculty(false)}
        Children={
          <StepperFacility
            setOpenAddFaculty={setOpenAddFaculty}
            resetForm={resetForm}
            updateData={detailsItem}
          />
        }
      />
      <ModalComp
        open={openAddEmployee}
        className={"  "}
        onClose={() => setOpenAddEmployee(false)}
        Children={
          <AddEmployee
            facultyID={facultyID}
            refetch={refetch}
            setOpenAddEmployee={setOpenAddEmployee}
          />
        }
      />
    </div>
  );
}
