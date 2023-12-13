/* eslint-disable no-unused-vars */
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import CheckIcon from "../../components/atoms/icons/CheckIcon";
import FacilityIcon from "../../components/atoms/icons/FaciltyIcon";
import Loading from "../../components/molecules/Loading";
import DataNotFound from "../../components/molecules/NotFound";
import Paginate from "../../components/molecules/Paginate";
import Search from "../../components/molecules/Search";
import DetailsFacility from "../../components/organisms/MyFacilities/DetailsFacility";
import StepperFacility from "./AddFacilityPage";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";
import useFetch from "../../hooks/useFetch";

export default function MyFacilities() {
  const [open, setOpen] = useState(false);
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [facultyID, setFacultyID] = useState("");
  const [detailsItem, setDetailsItem] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [openSecundModal, setSecundModal] = useState(false);

  const {
    data: facilities,
    isLoading,
    isRefetching,
    refetch,
  } = useFetch({
    endpoint: `facilities`,
    queryKey: ["facilities"],
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
  const navigate = useNavigate();
  return (
    <div>
      <MainHeader title={t("Facilities")} />

      <Search
        setSearchQuery={setSearchQuery}
        placeholder={t("Search facilities...")}
        addTitle={t("Add Facility")}
        action={() => navigate("/dashboard/facilities/create-facility")}
      />
      <div className="flex flex-col items-center justify-between h-[65vh]">
        {isLoading || isRefetching ? (
          <Loading />
        ) : filteredFacilities?.length ? (
          <>
            <Grid container spacing={6}>
              {paginatedFacilities?.map((item) => (
                <>
                  <Grid item xs={12} sm={4} md={3} key={item?.id}>
                    <Card sx={{ position: "relative" }}>
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
                              navigate(`/dashboard/facilities/edit-facility/${item?.id}`);

                            },
                          },
                          { divider: true },
                          {
                            text: t("Delete"),
                            menuItemProps: { sx: { color: "error.main" } },
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
                              className="my-2"
                            >
                              {item?.name}
                            </Typography>
                          </div>
                        </Box>
                      </CardContent>
                      <ButtonComp
                        variant="contained"
                        className={"!m-0 rounded-l-none rounded-r-none"}
                        action={() => {
                          setOpenAddEmployee(true);
                          setFacultyID(item?.id);
                        }}
                      >
                        {t("Add Employ")}
                      </ButtonComp>
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
            setSecundModal={setSecundModal}
          />
        }
      />
      <ModalComp
        open={openSecundModal}
        className="!max-w-[500px]  "
        onClose={() => setSecundModal(true)}
        Children={
          <div className="flex flex-col items-center justify-center gap-5 p-3">
            <CheckIcon className="stroke-contained" />
            <h1 className="font-bold"> تم إضافة موظف بنجاح</h1>
            <ButtonComp
              className="!w-2/3"
              variant="contained"
              action={() => navigate("/dashboard/employee")}
            >
              الانتقال الى الموظفين
            </ButtonComp>
            <ButtonComp
              className="!w-2/3 !px-10 !"
              variant="outlined"
              action={() => {
                setSecundModal(false);
                setOpenAddEmployee(false);
              }}
            >
              الرجوع
            </ButtonComp>
          </div>
        }
      />
    </div>
  );
}
