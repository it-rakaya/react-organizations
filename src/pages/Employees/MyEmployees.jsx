import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useState } from "react";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import PadgePreview from "../../components/molecules/PadgePreview";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import AddEmployee from "../../components/templates/myEmployee/AddEmployee";
import DeleteEMployee from "../../components/templates/myEmployee/DeleteEMployee";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";
import defaultImage from "../../../public/profile pic1.png";
import { Helmet } from "react-helmet-async";
import { useMemo } from "react";

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
  const [employeeId, setEmployeeId] = useState();
  const [openModelDeleteEmployee, setModelDeleteEMployee] = useState(false);
  const theme = useTheme();

  // const columns = [
  //   {
  //     flex: 0.2,
  //     minWidth: 180,
  //     field: "name",
  //     headerName: t("name"),
  //     cellClassName: "!bg-transparent ",

  //     headerAlign: "center",
  //     renderCell: ({ row }) => {

  //       const { name } = row;
  //       return (
  //         <Box sx={{ display: "flex", alignItems: "center" }}>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               alignItems: "flex-start",
  //               gap: "5px",
  //               // flexDirection: "column",
  //             }}
  //           >
  //             <div className="flex items-center gap-3">
  //               <img
  //                 src={
  //                   profilePictureUrl?.endsWith(".pdf")
  //                     ? "https://front-api.rmcc.sa/build/images/users/32/person.png"
  //                     : profilePictureUrl
  //                 }
  //                 className="w-[40px]  h-[40px] rounded-full border  border-solid"
  //                 style={{
  //                   borderColor: theme?.palette?.primary.main,
  //                   backgroundColor: theme?.palette?.primary.main,
  //                 }}
  //               />

  //               <p className="text-black dark:text-white">
  //                 {name?.length > 30 ? `${name?.slice(0, 20)}...` : name}
  //               </p>
  //             </div>
  //           </Box>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.2,
  //     minWidth: 180,
  //     field: "facility_name",
  //     headerName: t("facility name"),
  //     cellClassName: "flex !px-0 !justify-center",
  //     headerAlign: "center",
  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           noWrap
  //           variant="body2"
  //           className="text-black dark:text-white"
  //         >
  //           {row.facility_name}
  //         </Typography>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.15,
  //     field: "national_id",
  //     minWidth: 180,
  //     headerName: t("National ID"),
  //     cellClassName: "flex !px-0 !justify-center",

  //     headerAlign: "center",
  //     renderCell: ({ row }) => {
  //       return (
  //         <>
  //           <Typography
  //             noWrap
  //             sx={{ color: "text.secondary", textTransform: "capitalize" }}
  //             className="text-black dark:text-white"
  //           >
  //             {row.national_id}
  //           </Typography>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 180,
  //     headerName: t("position"),
  //     field: "position",
  //     cellClassName: "flex !px-0 !justify-center",
  //     headerAlign: "center",

  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           variant="subtitle1"
  //           noWrap
  //           sx={{ textTransform: "capitalize" }}
  //           className="text-black dark:text-white"
  //         >
  //           {row.position_name}
  //         </Typography>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 200,
  //     headerName: t("attachment"),
  //     field: "",
  //     cellClassName: "flex !px-0 !justify-center !h-[100px]",
  //     headerAlign: "center",

  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           variant="subtitle1"
  //           noWrap
  //           sx={{
  //             textTransform: "capitalize",
  //             display: "flex",
  //             justifyContent: "center",
  //             flexWrap: "wrap",
  //             gap: "5px",
  //             // marginTop:"50px",
  //             // marginBottom:"50px"
  //           }}
  //           className="text-black dark:text-white"
  //         >
  //           {row?.attachmentUrl.map((item) => (
  //             <div className="w-[87px] text-center" key={item?.id}>
  //               {!item?.value?.toLowerCase().endsWith(".pdf") ? (
  //                 <div
  //                   className="flex justify-center rounded-sm"
  //                   style={{ background: theme?.palette?.primary.main }}
  //                 >
  //                   <PadgePreview
  //                     url={item?.value}
  //                     label={isRTL ? item?.label_ar : item?.label_en}
  //                   />
  //                 </div>
  //               ) : (
  //                 <div
  //                   className="px-1 text-center rounded-sm bg-primary"
  //                   style={{
  //                     background: theme?.palette?.primary.main,
  //                     opacity: "0,8",
  //                   }}
  //                 >
  //                   <a
  //                     href={item?.value}
  //                     download={item?.value}
  //                     target="_blank"
  //                     className="text-center "
  //                     rel="noreferrer"
  //                   >
  //                     <p className="!text-[10px] text-white px-1 flex justify-center ">
  //                       {isRTL ? item?.label_ar : item?.label_en}
  //                     </p>
  //                   </a>
  //                 </div>
  //               )}
  //             </div>
  //           ))}
  //         </Typography>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.15,
  //     minWidth: 120,
  //     headerName: t("actions"),
  //     field: t("actions"),
  //     cellClassName: "!flex !px-0 !justify-center !items-center",
  //     headerAlign: "center",

  //     renderCell: (row) => {
  //       return (
  //         <Typography
  //           variant="subtitle1"
  //           noWrap
  //           sx={{
  //             textTransform: "capitalize",
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           <div className="flex justify-center cursor-pointer ">
  //             <OptionsMenu
  //               iconButtonProps={{
  //                 size: "small",
  //               }}
  //               options={[
  //                 {
  //                   text: t("Delete"),
  //                   details: "Additional details here",
  //                   function: () => {
  //                     setEmployeeId(row.id);
  //                     setModelDeleteEMployee(true);
  //                   },
  //                 },
  //               ]}
  //             />
  //             {/* <Icon path={mdiTrashCanOutline} size={1} /> */}
  //           </div>
  //         </Typography>
  //       );
  //     },
  //   },
  // ];
  const columns = useMemo(
    () => [
      {
        Header: t("name"),
        Cell: (info) => {
          // Logic to determine the profile picture URL
          const profilePictureAttachment = info.row.original.attachmentUrl.find(
            (attachment) =>
              attachment.label_en === "Profile Picture" ||
              attachment.label_ar === "صورة الملف الشخصي"
          );
          const profilePictureUrl = profilePictureAttachment
            ? profilePictureAttachment.value
            : "https://front-api.rmcc.sa/build/images/users/32/person.png"; // Replace with your actual default image path

          return (
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              style={{ ...info.column.cellSize }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "5px",
                }}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      profilePictureUrl?.endsWith(".pdf")
                        ? "https://front-api.rmcc.sa/build/images/users/32/person.png"
                        : profilePictureUrl
                    }
                    alt="Profile"
                    className="w-[40px] h-[40px] rounded-full border border-solid"
                    style={{
                      borderColor: theme?.palette?.primary.main,
                      backgroundColor: theme?.palette?.primary.main,
                    }}
                  />
                  <p className="text-black dark:text-white">
                    {info.row.original.name.length > 30
                      ? `${info.row.original.name.slice(0, 15)}...`
                      : info.row.original.name}
                  </p>
                </div>
              </Box>
            </Box>
          );
        },
        cellSize: { width: "170px", height: "50px", margin: "auto" },

        accessor: "name",
      },
      {
        Header: t("facility name"),
        Cell: (info) => (
          <div style={{ ...info.column.cellSize }}>
            <span>
              {info?.row?.original.facility_name.length > 30
                ? info?.row?.original.facility_name.slice(0, 15)
                : info?.row?.original.facility_name}
            </span>
          </div>
        ),
        cellSize: { width: "170px", height: "50px", margin: "auto" , alignItems:"center" , display:"flex" , justifyContent:"center" },

        accessor: "facility_name",
      },
      {
        Header: t("National ID"),
        Cell: (info) => (
          <div style={{ ...info.column.cellSize }}>
            <span>{info?.row?.original.national_id}</span>
          </div>
        ),
        cellSize: { width: "120px", height: "50px", margin: "auto"  , alignItems:"center" , display:"flex" , justifyContent:"center" },

        accessor: "national_id",
      },
      {
        Header: t("position"),
        Cell: (info) => (
          <div style={{ ...info.column.cellSize }}>
            <span>{info?.row?.original.position_name}</span>
          </div>
        ),
        cellSize: { width: "120px", height: "50px", margin: "auto" , alignItems:"center" , display:"flex" , justifyContent:"center"  },

        accessor: "position_name",
      },
      {
        Header: t("attachment"),

        Cell: (info) => (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              textTransform: "capitalize",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "5px",
              // marginTop:"50px",
              // marginBottom:"50px"
            }}
            style={{ ...info.column.cellSize }}
            className="text-black dark:text-white"
          >
            {info?.row?.original?.attachmentUrl.map((item) => (
              <div className="w-[87px] text-center" key={item?.id}>
                {!item?.value?.toLowerCase().endsWith(".pdf") ? (
                  <div
                    className="flex justify-center rounded-sm"
                    style={{ background: theme?.palette?.primary.main }}
                  >
                    <PadgePreview
                      url={item?.value}
                      label={isRTL ? item?.label_ar : item?.label_en}
                    />
                  </div>
                ) : (
                  <div
                    className="px-1 text-center rounded-sm bg-primary"
                    style={{
                      background: theme?.palette?.primary.main,
                      opacity: "0,8",
                    }}
                  >
                    <a
                      href={item?.value}
                      download={item?.value}
                      target="_blank"
                      className="text-center "
                      rel="noreferrer"
                    >
                      <p className="!text-[10px] text-white px-1 flex justify-center ">
                        {isRTL ? item?.label_ar : item?.label_en}
                      </p>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </Typography>
        ),
        cellSize: { width: "180px", height: "50px", margin: "auto" , alignItems:"center" , display:"flex" , justifyContent:"center"  },
        accessor: "attach",
      },
      {
        Header: t("actions"),
        Cell: (info) => (
          <Typography variant="subtitle1" style={{ ...info.column.cellSize }}>
            <div className="flex justify-center cursor-pointer">
              <OptionsMenu
                iconButtonProps={{
                  size: "small",
                }}
                options={[
                  {
                    text: t("Delete"),
                    details: "Additional details here",
                    function: () => {
                      setEmployeeId(info.row?.original.id);
                      setModelDeleteEMployee(true);
                    },
                  },
                ]}
              />
            </div>
          </Typography>
        ),
        cellSize: { width: "100px", height: "50px", margin: "auto" },
        accessor: "d",
      },
    ],
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
