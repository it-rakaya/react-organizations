import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import { Alert, Box, Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
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
import { convertArabicToEnglish, convertToHijri } from "../../utils/helpers";
import { notify } from "../../utils/toast";
import { useIsRTL } from "../../hooks/useIsRTL";
export default function Orders() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [orderId, setOrderId] = useState();
  const [detailsOrder, setDetailsOrder] = useState("");
  const isRTL= useIsRTL()

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
    console.log("🚀 ~ Orders ~ Orders:", Orders)

  const Canceled = 7;
  const Rejected = 5;

  const columns = [
    {
      flex: 0.2,
      field: "name",
      headerName: t("code"),
      cellClassName: "flex !px-0 !justify-center ",
      headerAlign: "center",
      minWidth: 130,
      renderCell: ({ row }) => {
        const { code } = row;
        return (
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                {`#${code}`}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      flex: 0.2,
      field: "service_name",
      headerName: t("service name"),
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
      minWidth: 130,
      renderCell: ({ row }) => {
        return (
          <Typography
            noWrap
            variant="body2"
            className="text-black dark:text-white"
          >
            {isRTL ? row.service?.name_ar : row.service?.name_en}
          </Typography>
        );
      },
    },

    {
      flex: 0.15,
      field: "facility_name",
      headerName: t("facility name"),
      cellClassName: "flex !px-0 !justify-center",
      minWidth: 130,
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <Typography
              noWrap
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
              className="text-black dark:text-white"
            >
              {row.facility?.name}
            </Typography>
          </>
        );
      },
    },

    {
      flex: 0.15,
      headerName: t("status"),
      field: "status",
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
      minWidth: 130,
      renderCell: ({ row }) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              textTransform: "capitalize",
              backgroundColor: row?.status?.color,
              color: "white",
              borderRadius: "5px",
              padding: "0 10px",
            }}
            className="text-white"
          >
            {isRTL ? row.status?.name_ar :row.status?.name_en}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      headerName: t("create at"),
      field: "created_at",
      cellClassName: "flex !px-0 !justify-center ",
      headerAlign: "center",
      minWidth: 210,
      renderCell: ({ row }) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              textTransform: "capitalize",
              // backgroundColor: row?.status?.color,
              // color: "white",
              // borderRadius: "5px",
              // padding: "0 10px",
            }}
            className="text-black dark:text-white"
          >
            <div className="flex gap-1 dark:text-white">
              <p className="text-[15px] dark:text-white">
                {row?.created_at?.slice(0, 10)}
              </p>
              /
              <p className="text-[15px] dark:text-white">
                {convertArabicToEnglish(
                  convertToHijri(row?.created_at?.slice(0, 10))
                )}
              </p>
              {t("H")}
            </div>
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      headerName: t("actions"),
      field: t("actions"),
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
      minWidth: 130,
      renderCell: ({ row }) => {
        return (
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              textTransform: "capitalize",
              display: "flex",
              gap: "20px",
              justifyContent: "center",
            }}
            className="items-center justify-center w-full "
          >
            {row.status_id == Canceled ? (
              <Icon path={mdiDotsVertical} size={1} />
            ) : (
              <div className="flex justify-center cursor-pointer ">
                <OptionsMenu
                  iconButtonProps={{
                    size: "small",
                  }}
                  className={
                    row.status_id == Canceled
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }
                  options={[
                    {
                      text: t("Details"),

                      details: "Additional details here",
                      function: () => {
                        if (row.status_id == Canceled) {
                          return notify("worning", t("cant Canceled order"));
                        } else {
                          setOpenDetailsOrder(true);
                          setDetailsOrder(row);
                        }
                      },
                    },
                    row.status_id !== Rejected
                      ? {
                          text: t("Cancel"),
                          details: "Additional details here",
                          function: () => {
                            if (row.status_id == Canceled) {
                              return console.log("ddd");
                            } else {
                              setOrderId(row.id);
                              setOpenCancelOrder(true);
                            }
                          },
                        }
                      : "",
                  ]}
                />
              </div>
            )}
          </Typography>
        );
      },
    },
  ];
  const closeRegister = orgData?.organizations?.close_registeration == "1";

  return (
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
            textButton={t("NEW ORDER")}
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
          <DetailsOrder data={detailsOrder} setDetailsOrder={setDetailsOrder} />
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
  );
}
