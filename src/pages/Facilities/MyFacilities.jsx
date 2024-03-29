/* eslint-disable no-unused-vars */
import { useMediaQuery } from '@mui/material';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
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
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import DetailsFacility from "../../components/templates/MyFacilities/DetailsFacility";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";
import StepperFacility from "./AddFacilityPage";

export default function MyFacilities() {
  const [open, setOpen] = useState(false);
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [facultyID, setFacultyID] = useState("");
  const [detailsItem, setDetailsItem] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useMediaQuery('(max-width:893px)');
  const pageSize = isMobile ? 9 : 8;
  const [openSecundModal, setSecundModal] = useState(false);

  const isRTL = useIsRTL();

  const {
    data: facilities,
    isLoading,
    isRefetching,
    refetch,
  } = useFetch({
    endpoint: `facilities`,
    queryKey: [`facilities${isRTL}`],
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
    <>
      <Helmet>
        <title>{t("Facilities")}</title>
        <meta name="description" content="This home page" />
      </Helmet>
      <div>
        <MainHeader title={t("Facilities")} />

        <Search
          setSearchQuery={setSearchQuery}
          placeholder={t("Search facilities...")}
          addTitle={t("Add Facility")}
          action={() => navigate("/dashboard/facilities/create-facility")}
        />
        <div className="flex flex-col items-center justify-between " >
          {isLoading || isRefetching ? (
            <Loading />
          ) : filteredFacilities?.length ? (
            <>
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
                            sx: { top: 12, right: isRTL && "12px", left: !isRTL &&"12px", position: "absolute" },
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
                                className="!my-2 text-center mx-1 !text-black dark:!text-white
                              "
                              >
                                {item?.name.length > 20
                                  ? `${item?.name.slice(0, 20)}...`
                                  : item?.name}
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
                          {t("Add Employee")}
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
          classNameBox={"!h-full "}
          className={"max-w-[850px]"}
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
          hidden
          className="!max-w-[500px]"
          onClose={() => setSecundModal(true)}
          Children={
            <div className="flex flex-col items-center justify-center gap-4 p-3">
              <CheckIcon className="stroke-contained" />
              <h1 className="font-bold text-black dark:text-white">
                {t("An employee has been added successfully")}
              </h1>
              <ButtonComp
                className="!w-2/3 !mb-0 "
                variant="contained"
                action={() => navigate("/dashboard/employee")}
              >
                <p className="text-white">{t("Go to Employees")}</p>
              </ButtonComp>
              <ButtonComp
                className="!w-2/3 !px-10 !mt-0"
                variant="outline"
                action={() => {
                  setSecundModal(false);
                  setOpenAddEmployee(false);
                }}
              >
                {t("Back")}
              </ButtonComp>
            </div>
          }
        />
      </div>
    </>
  );
}
