import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { Alert, Box, Typography } from "@mui/material";
import { t } from "i18next";
import { useMemo, useState } from "react";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import AddOrder from "../../components/organisms/orders/AddOrder";
import CancelOrder from "../../components/organisms/orders/CancelOrder";
import DetailsOrder from "../../components/organisms/orders/DetailsOrder";
import OrderInfo from "../../components/organisms/orders/OrderInfo";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";
import { convertToHijri, padWithZero } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import { Helmet } from "react-helmet-async";
export default function Orders() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [orderId, setOrderId] = useState();
  const [detailsOrder, setDetailsOrder] = useState("");
  const isRTL = useIsRTL();

  const { orgData } = UseOrg();

  const {
    data: Orders,
    isLoading,
    isRefetching,
    refetch,
  } = useFetch({
    endpoint: `orders?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["my_orders"],
    enabled: !!orgData?.organizations?.id,
  });

  const Canceled = Orders?.all_user_orders?.filter(
    (obj) => obj.status?.name_en == "Canceled"
  );
  const Accepted = Orders?.all_user_orders?.filter(
    (obj) => obj.status?.name_en == "Accepted"
  );

  const closeRegister = orgData?.organizations?.close_order == "1";
  // const columns = [
  //   {
  //     flex: 0.2,
  //     field: "name",
  //     headerName: t("code"),
  //     cellClassName: "flex !px-0 !justify-center ",
  //     headerAlign: "center",
  //     minWidth: 130,
  //     renderCell: ({ row }) => {
  //       const { code } = row;
  //       return (
  //         <Box sx={{ display: "flex", alignItems: "center" }}>
  //           <Box
  //             sx={{
  //               display: "flex",
  //               alignItems: "flex-start",
  //               gap: "5px",
  //             }}
  //           >
  //             <Typography
  //               noWrap
  //               variant="caption"
  //               className="text-black dark:text-white"
  //             >
  //               {`#${code}`}
  //             </Typography>
  //           </Box>
  //         </Box>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.2,
  //     field: "service_name",
  //     headerName: t("service name"),
  //     cellClassName: "flex !px-0 !justify-center",
  //     headerAlign: "center",
  //     minWidth: 130,
  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           noWrap
  //           variant="body2"
  //           className="text-black dark:text-white"
  //         >
  //           {isRTL ? row.service?.name_ar : row.service?.name_en}
  //         </Typography>
  //       );
  //     },
  //   },

  //   {
  //     flex: 0.15,
  //     field: "facility_name",
  //     headerName: t("facility name"),
  //     cellClassName: "flex !px-0 !justify-center",
  //     minWidth: 130,
  //     headerAlign: "center",
  //     renderCell: ({ row }) => {
  //       return (
  //         <>
  //           <Typography
  //             noWrap
  //             sx={{ color: "text.secondary", textTransform: "capitalize" }}
  //             className="text-black dark:text-white"
  //           >
  //             {row.facility?.name}
  //           </Typography>
  //         </>
  //       );
  //     },
  //   },

  //   {
  //     flex: 0.15,
  //     headerName: t("status"),
  //     field: "status",
  //     cellClassName: "flex !px-0 !justify-center",
  //     headerAlign: "center",
  //     minWidth: 130,
  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           variant="subtitle1"
  //           noWrap
  //           sx={{
  //             textTransform: "capitalize",
  //             backgroundColor: row?.status?.color,
  //             color: "white",
  //             borderRadius: "5px",
  //             padding: "0 10px",
  //           }}
  //           className="text-white"
  //         >
  //           {isRTL ? row.status?.name_ar : row.status?.name_en}
  //         </Typography>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.15,
  //     headerName: t("create at"),
  //     field: "created_at",
  //     cellClassName: "flex !px-0 !justify-center ",
  //     headerAlign: "center",
  //     minWidth: 210,
  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           variant="subtitle1"
  //           noWrap
  //           sx={{
  //             textTransform: "capitalize",
  //           }}
  //           className="text-black dark:text-white"
  //         >
  //           <div className="flex gap-1 dark:text-white">
  //             <p className="text-[15px] dark:text-white">
  //               {row?.created_at?.slice(0, 10)}
  //             </p>
  //             /
  //             <p className="text-[15px] dark:text-white" dir="rtl">
  //               {convertToHijri(row?.created_at).hy}-
  //               {padWithZero(convertToHijri(row?.created_at).hm)}-
  //               {padWithZero(convertToHijri(row?.created_at).hd)}
  //             </p>
  //             {t("H")}
  //           </div>
  //         </Typography>
  //       );
  //     },
  //   },
  //   {
  //     flex: 0.15,
  //     headerName: t("actions"),
  //     field: t("actions"),
  //     cellClassName: "flex !px-0 !justify-center",
  //     headerAlign: "center",
  //     minWidth: 130,
  //     renderCell: ({ row }) => {
  //       return (
  //         <Typography
  //           variant="subtitle1"
  //           noWrap
  //           sx={{
  //             textTransform: "capitalize",
  //             display: "flex",
  //             gap: "20px",
  //             justifyContent: "center",
  //           }}
  //           className="items-center justify-center w-full "
  //         >
  //           {row.status?.name_en == "Canceled" ? (
  //             <Icon path={mdiDotsVertical} size={1} />
  //           ) : (
  //             <div className="flex justify-center cursor-pointer ">
  //               <OptionsMenu
  //                 iconButtonProps={{
  //                   size: "small",
  //                 }}
  //                 className={
  //                   row.status?.name_en == "Canceled"
  //                     ? "cursor-not-allowed"
  //                     : "cursor-pointer"
  //                 }
  //                 options={
  //                   row.status?.name_en == "Accepted" ||
  //                   row.status?.name_en == "Approved"
  //                     ? [
  //                         {
  //                           text: t("Details"),

  //                           details: "Additional details here",
  //                           function: () => {
  //                             if (row.status_id == Canceled) {
  //                               return notify(
  //                                 "worning",
  //                                 t("cant Canceled order")
  //                               );
  //                             } else {
  //                               setOpenDetailsOrder(true);
  //                               setDetailsOrder(row);
  //                             }
  //                           },
  //                         },
  //                       ]
  //                     : row.status?.name_en !== "Rejected"
  //                     ? [
  //                         {
  //                           text: t("Details"),

  //                           details: "Additional details here",
  //                           function: () => {
  //                             if (row.status_id == Canceled) {
  //                               return notify(
  //                                 "worning",
  //                                 t("cant Canceled order")
  //                               );
  //                             } else {
  //                               setOpenDetailsOrder(true);
  //                               setDetailsOrder(row);
  //                             }
  //                           },
  //                         },
  //                         {
  //                           text: t("Cancel"),
  //                           details: "Additional details here",
  //                           function: () => {
  //                             if (row.status_id == Canceled) {
  //                               return;
  //                             } else {
  //                               setOrderId(row.id);
  //                               setOpenCancelOrder(true);
  //                             }
  //                           },
  //                         },
  //                       ]
  //                     : [
  //                         {
  //                           text: t("Details"),

  //                           details: "Additional details here",
  //                           function: () => {
  //                             if (row.status_id == Canceled) {
  //                               return notify(
  //                                 "worning",
  //                                 t("cant Canceled order")
  //                               );
  //                             } else {
  //                               setOpenDetailsOrder(true);
  //                               setDetailsOrder(row);
  //                             }
  //                           },
  //                         },
  //                       ]
  //                 }
  //               />
  //             </div>
  //           )}
  //         </Typography>
  //       );
  //     },
  //   },
  // ];
  const columns = useMemo(
    () => [
      {
        Header: t("code"),
        Cell: (info) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            style={{ ...info.column.cellSize }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: "5px",
              }}
            >
              <Typography
                noWrap
                variant="caption"
                className="text-black dark:text-white"
              >
                {`#${info.row?.original?.code}`}
              </Typography>
            </Box>
          </Box>
        ),
        cellSize: { width: "170px", height: "50px", margin: "auto" , alignItems:"center" , display:"flex" , justifyContent:"center"  },
        accessor: "code",
      },
      {
        Header: t("service name"),
        Cell: (info) => (
          <Typography
            noWrap
            variant="body2"
            className="text-black dark:text-white"
            style={{ ...info.column.cellSize }}
          >
            {isRTL
              ? info?.row?.original?.service?.name_ar
              : info?.row?.original?.service?.name_en}
          </Typography>
        ),
        cellSize: { width: "170px", height: "50px", margin: "auto"   , alignItems:"center" , display:"flex" , justifyContent:"center" },
        accessor: "service",
      },
      {
        Header: t("facility name"),
        Cell: (info) => (
          <Typography
            noWrap
            sx={{ color: "text.secondary", textTransform: "capitalize" }}
            className="text-black dark:text-white"
            style={{ ...info.column.cellSize }}
          >
            {info?.row?.original?.facility?.name.length > 20
              ? info?.row?.original?.facility?.name.slice(0, 15)
              : info?.row?.original?.facility?.name}
          </Typography>
        ),
        cellSize: { width: "170px", height: "50px", margin: "auto"  , alignItems:"center" , display:"flex" , justifyContent:"center"  },
        accessor: "facility",
      },

      {
        Header: t("status"),
        Cell: (info) => (
          <Typography
            variant="subtitle1"
            noWrap
            style={{ ...info.column.cellSize }}
            sx={{
              textTransform: "capitalize",
              backgroundColor: info?.row?.original?.status?.color,
              color: "white",
              borderRadius: "5px",
              padding: "0 10px",
            }}
            className="text-white"
          >
            {isRTL
              ? info?.row?.original.status?.name_ar
              : info?.row?.original.status?.name_en}
          </Typography>
        ),
        cellSize: { width: "150px", height: "", margin: "auto"   , alignItems:"center" , display:"flex" , justifyContent:"center" },
        accessor: "status",
      },
      {
        Header: t("create at"),
        Cell: (info) => (
          <Typography
            variant="subtitle1"
            noWrap
            style={{ ...info.column.cellSize }}
            sx={{
              textTransform: "capitalize",
            }}
            className="text-black dark:text-white"
          >
            <div className="flex justify-center gap-1 text-center dark:text-white">
              <p className="text-[15px] dark:text-white ">
                {info?.row?.original.created_at?.slice(0, 10)}
              </p>
              /
              <p className="text-[15px] dark:text-white " dir="rtl">
                {convertToHijri(info?.row?.original.created_at).hy}-
                {padWithZero(convertToHijri(info?.row?.original.created_at).hm)}
                -
                {padWithZero(convertToHijri(info?.row?.original.created_at).hd)}
              </p>
              {t("H")}
            </div>
          </Typography>
        ),
        cellSize: { width: "17=80px", height: "50px", margin: "auto"  , alignItems:"center" , display:"flex" , justifyContent:"center"  },
        accessor: "created_at",
      },

      {
        Header: t("actions"),
        Cell: (info) => (
          <Typography
            variant="subtitle1"
            noWrap
            style={{ ...info.column.cellSize }}
            sx={{
              textTransform: "capitalize",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
            className="items-center justify-center w-full "
          >
            {info?.row?.original.status?.name_en == "Canceled" ? (
              <Icon path={mdiDotsVertical} size={1} />
            ) : (
              <div className="flex justify-center cursor-pointer ">
                <OptionsMenu
                  iconButtonProps={{
                    size: "small",
                  }}
                  className={
                    info?.row?.original.status?.name_en == "Canceled"
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  options={
                    info?.row?.original.status?.name_en == "Accepted" ||
                    info?.row?.original.status?.name_en == "Approved"
                      ? [
                          {
                            text: t("Details"),

                            details: "Additional details here",
                            function: () => {
                              if (info?.row?.original.status_id == Canceled) {
                                return notify(
                                  "worning",
                                  t("cant Canceled order")
                                );
                              } else {
                                setOpenDetailsOrder(true);
                                setDetailsOrder(info?.row?.original);
                              }
                            },
                          },
                        ]
                      : info?.row?.original.status?.name_en !== "Rejected"
                      ? [
                          {
                            text: t("Details"),

                            details: "Additional details here",
                            function: () => {
                              if (info?.row?.original.status_id == Canceled) {
                                return notify(
                                  "worning",
                                  t("cant Canceled order")
                                );
                              } else {
                                setOpenDetailsOrder(true);
                                setDetailsOrder(info?.row?.original);
                              }
                            },
                          },
                          {
                            text: t("Cancel"),
                            details: "Additional details here",
                            function: () => {
                              if (info?.row?.original.status_id == Canceled) {
                                return;
                              } else {
                                setOrderId(info?.row?.original.id);
                                setOpenCancelOrder(true);
                              }
                            },
                          },
                        ]
                      : [
                          {
                            text: t("Details"),

                            details: "Additional details here",
                            function: () => {
                              if (info?.row?.original.status_id == Canceled) {
                                return notify(
                                  "worning",
                                  t("cant Canceled order")
                                );
                              } else {
                                setOpenDetailsOrder(true);
                                setDetailsOrder(info?.row?.original);
                              }
                            },
                          },
                        ]
                  }
                />
              </div>
            )}
          </Typography>
        ),
        cellSize: { width: "100px", height: "50px", margin: "auto" },
        accessor: "d",
      },
    ],
    [isRTL]
  );
  return (
    <>
      <Helmet>
        <title>{t("Orders")}</title>
        <meta name="description" content="This home page" />
      </Helmet>
      <div>
        <MainHeader title={t("Orders")} />
        {isLoading || isRefetching ? (
          <Loading />
        ) : (
          <>
            {closeRegister && (
              <Alert
                severity="warning"
                className="flex items-center !bg-transparent mt-[-14px]"
              >
                <div className="flex items-center gap-5 ">
                  <p className="p-0 m-0 font-bold text-red-500">
                    {t("Receiving orders is closed")}
                  </p>
                </div>
              </Alert>
            )}
            <OrderInfo Orders={Orders} />

            <Table
              columns={columns || []}
              rows={Orders?.all_user_orders || []}
              textButton={t("New Order")}
              actionButton={() => setOpenAddFaculty(true)}
              placeholderSearch={t("Search in orders")}
              disabled={closeRegister}
            />
          </>
        )}

        <ModalComp
          open={openAddFaculty}
          onClose={() => setOpenAddFaculty(false)}
          Children={<AddOrder setOpenAddFaculty={setOpenAddFaculty} />}
        />
        <ModalComp
          open={openDetailsOrder}
          classNameBox={"!h-full"}
          onClose={() => setOpenDetailsOrder(false)}
          className={"max-w-[1120px]"}
          Children={
            <DetailsOrder
              data={detailsOrder}
              setDetailsOrder={setDetailsOrder}
            />
          }
        />
        <ModalComp
          open={openCancelOrder}
          className="!max-w-[450px]  "
          onClose={() => setOpenCancelOrder(false)}
          Children={
            <CancelOrder
              refetch={refetch}
              setOpenCancelOrder={setOpenCancelOrder}
              orderId={orderId}
            />
          }
        />
      </div>
    </>
  );
}
