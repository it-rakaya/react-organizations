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
import { t } from "i18next";
import Search from "../../components/molecules/Search";
import Paginate from "../../components/molecules/Paginate";
import ShowDetails from "../../components/atoms/icons/ShowDetails";
import EditIcon from "../../components/atoms/icons/EditIcon";

export default function MyFacilities() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [facultyID, setFacultyID] = useState("");
  const [detailsItem, setDetailsItem] = useState();
  const [resetForm, setResetForm] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const pageSize = 8; // Set your desired page size

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

  const filteredFacilities = facilities?.user_facilities?.filter((item) =>
    item?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedFacilities = filteredFacilities?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredFacilities?.length / pageSize);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <MainHeader title={t("Facilities")} />

      <Search
        setSearchQuery={setSearchQuery}
        placeholder={t("Search facilities...")}
        addTitle={t("Add Facility")}
        action={() => setOpenAddFaculty(true)}
      />
      <div className="flex flex-col items-center justify-between h-[65vh]">
        {isLoading || isRefetching ? (
          <Loading />
        ) : filteredFacilities?.length ? (
          <>
            <Grid container spacing={6}>
              {paginatedFacilities?.map((item) => (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    key={item?.id}
                    className={{ height: "290px" }}
                  >
                    <Card sx={{ position: "relative" }}>
                      {/* <div className="flex items-center justify-between px-2 py-1 item">
                        <ShowDetails />
                        <EditIcon />
                      </div> */}
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
                              setOpenAddFaculty(true);
                              setResetForm(false);
                            },
                          },
                          { divider: true },
                          {
                            text: t("Delete"),
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
                            {t("Add Employ")}
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              ))}
            </Grid>
            {filteredFacilities?.length > 8 && (
              <Paginate
                page={currentPage}
                totalPages={totalPages}
                handleChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <DataNotFound title={t("Not Found Facilities")} />
        )}
      </div>

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
