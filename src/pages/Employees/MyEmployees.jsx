import { mdiAccount } from "@mdi/js";
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import { Link } from "react-router-dom";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import useFetch from "../../hooks/useFetch";
import PreviewImageLink from "../../components/molecules/PreviewImageLink";
import PreviewPdf from "../../components/molecules/PreviewPdf";
import ModalComp from "../../components/atoms/ModalComp";
import { useState } from "react";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";

export default function MyEmployees() {
  const { data: employees , refetch } = useFetch({
    endpoint: `facility-employees`,
    queryKey: ["facility_employees"],
  });
  const [openAddEmployee, setOpenAddEmployee] = useState(false);

  const LinkStyled = styled(Link)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.primary.main,
    },
  }));

  const columns = [
    {
      flex: 0.2,
      minWidth: 230,
      field: "name",
      headerName: t("name"),
      renderCell: ({ row }) => {
        const { name } = row;

        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "5px",
                // flexDirection: "column",
              }}
            >
              <Icon path={mdiAccount} size={1} />

              <LinkStyled href="/apps/user/view/overview/">{name}</LinkStyled>
              {/* <Typography noWrap variant='caption'>
              {`@${name}`}
            </Typography> */}
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: "facility_name",
      headerName: t("facility name"),
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant="body2">
            {row.facility_name}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      field: "national_id",
      minWidth: 150,
      headerName: t("national_id"),
      renderCell: ({ row }) => {
        return (
          <>
            <Typography
              noWrap
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
            >
              {row.national_id}
            </Typography>
          </>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("position"),
      field: "position",
      renderCell: ({ row }) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ textTransform: "capitalize" }}
          >
            {row.position}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("attachment"),
      field: "",
      renderCell: ({ row }) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ textTransform: "capitalize", display: "flex", gap: "10px" }}
          >
            {row?.attachmentUrl.map((item) => (
              <div className="flex items-center " key={item?.id}>
                {!item?.value?.toLowerCase().endsWith(".pdf") ? (
                  <p>
                    <PreviewImageLink url={item?.value} />
                  </p>
                ) : (
                  <PreviewPdf item={item} />
                )}
              </div>
            ))}
          </Typography>
        );
      },
    },
    // {
    //   flex: 0.1,
    //   minWidth: 110,
    //   field: "status",
    //   headerName: "Status",
    // },
  ];

  return (
    <>
    <div>
      <MainHeader title={t("Employee")} />
      {/* <div className="flex flex-col items-center justify-between h-[65vh]">
        {isLoading || isRefetching ? (
          <Loading />
        ) : employees?.employees.length ? (
          <>
            <Grid container spacing={6}>
              {paginateEmployee?.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  key={item?.id}
                  // style={{ height: "290px"}}
                >
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
                            // Add your custom function logic here
                            setOpen(true);
                            setDetailsItem(item);
                          },
                        },

                        // { text: "تعديل", onClick: "" },
                        // { divider: true },
                        // {
                        //   text: "حذف",
                        //   menuItemProps: { sx: { color: "error.main" } },
                        // },
                      ]}
                    />
                    <CardContent
                      onClick={() => {
                        setOpen(true);
                        setDetailsItem(item);
                      }}
                      className="cursor-pointer"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Avatar
                          src={"/images/avatars/9.png"}
                          sx={{ mb: 4, width: 80, height: 80 }}
                        />
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 900 }}
                          style={{ color: theme?.palette?.primary?.main }}
                          className="text-contained"
                        >
                          {item?.name}
                        </Typography>
                        <Typography sx={{ fontWeight: 500 }}>
                          {item?.facility_name}
                        </Typography>
                        <Typography
                          sx={{ color: "text.secondary" }}
                          className="text-center"
                        >
                          {item?.position}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <ModalComp
              open={open}
              onClose={() => setOpen(false)}
              Children={<DetailsEmployee data={detailsItem} />}
            />
            {filteredEmployee?.length > 8 && (
              <Paginate
                page={currentPage}
                totalPages={totalPages}
                handleChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <DataNotFound title={t("Not Found Employee")} />
        )}
      </div> */}
      <Table
        columns={columns || []}
        rows={employees?.employees || []}
        placeholderSearch={t("search in employee")}
        textButton={t("Add Employee")}
        actionButton={()=>setOpenAddEmployee(true)}
      />
    </div>
    <ModalComp
        open={openAddEmployee}
        className={"  "}
        onClose={() => setOpenAddEmployee(false)}
        Children={
          <AddEmployee
            refetch={refetch}
            setOpenAddEmployee={setOpenAddEmployee}
            showSelectFacility={true}
          />
        }
      />
    </>
  );
}
