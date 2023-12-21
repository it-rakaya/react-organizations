import { mdiAccount, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { t } from "i18next";
import { useState } from "react";
import { Link } from "react-router-dom";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import PreviewImageLink from "../../components/molecules/PreviewImageLink";
import PreviewPdf from "../../components/molecules/PreviewPdf";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";
import DeleteEMployee from "../../components/templates/myEmployee/DeleteEMployee";
import useFetch from "../../hooks/useFetch";
import Loading from "../../components/molecules/Loading";

export default function MyEmployees() {
  const {
    data: employees,
    refetch,
    isLoading,
    isRefetching,
  } = useFetch({
    endpoint: `facility-employees`,
    queryKey: ["facility_employees"],
  });
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState();
  const [openModelDeleteEmployee, setModelDeleteEMployee] = useState(false);

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
      // cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
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
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
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
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
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
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",

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
      minWidth: 150,
      headerName: t("attachment"),
      field: "",
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",

      renderCell: ({ row }) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              textTransform: "capitalize",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {row?.attachmentUrl.map((item) => (
              <div
                className="flex flex-wrap items-center justify-center"
                key={item?.id}
              >
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
    {
      flex: 0.15,
      minWidth: 50,
      headerName: "الاجراءات",
      field: "الاجراءات",
      cellClassName: "!flex !px-0 !justify-center !items-center",
      headerAlign: "center",

      renderCell: (row) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              textTransform: "capitalize",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              className="cursor-pointer "
              onClick={() => {
                setEmployeeId(row.id);
                setModelDeleteEMployee(true);
              }}
            >
              <Icon path={mdiTrashCanOutline} size={1} />
            </div>
          </Typography>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <MainHeader title={t("Employee")} />
        {isLoading || isRefetching ? (
          <Loading />
        ) : (
          <Table
            columns={columns || []}
            rows={employees?.employees || []}
            placeholderSearch={t("search in employee")}
            textButton={t("Add Employee")}
            actionButton={() => setOpenAddEmployee(true)}
          />
        )}
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
      <ModalComp
        open={openModelDeleteEmployee}
        className="!max-w-[450px]  "
        onClose={() => setModelDeleteEMployee(false)}
        Children={
          <DeleteEMployee
            setModelDeleteEMployee={setModelDeleteEMployee}
            employeeId={employeeId}
            refetch={refetch}
          />
        }
      />
    </>
  );
}
