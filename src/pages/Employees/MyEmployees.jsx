import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";
import DeleteEMployee from "../../components/templates/myEmployee/DeleteEMployee";
import { generateColumns } from "../../components/templates/myEmployee/generateColumns";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";

export default function MyEmployees() {
  const isRTL = useIsRTL();

  const {
    data: employees,
    refetch,
    isLoading,
    isRefetching,
  } = useFetch({
    endpoint: `facility-employees`,
    queryKey: [`facility_employees ${isRTL}`],
  });

  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [openModelDeleteEmployee, setModelDeleteEMployee] = useState(false);
  const theme = useTheme();

  const columns = useMemo(
    () =>
      generateColumns({ isRTL, theme, setModelDeleteEMployee, setEmployeeId }),
    [theme?.palette?.primary.main, isRTL]
  );

  return (
    <>
      <Helmet>
        <title>{t("Employee")}</title>
        <meta name="description" content="This home page" />
      </Helmet>
      <div>
        <MainHeader title={t("Employees")} />
        {isLoading || isRefetching ? (
          <Loading />
        ) : (
          <Table
            columns={columns || []}
            rows={employees?.employees || []}
            placeholderSearch={t("search in employees")}
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
