import { mdiEyeOutline, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import AddOrder from "../../components/organisms/orders/AddOrder";
import CancelOrder from "../../components/organisms/orders/CancelOrder";
import DetailsOrder from "../../components/organisms/orders/DetailsOrder";
import OrderInfo from "../../components/organisms/orders/OrderInfo";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import { notify } from "../../utils/toast";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
export default function Orders() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [orderId, setOrderId] = useState();
  const [detailsOrder, setDetailsOrder] = useState("");

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
    console.log("🚀 ~ file: Orders.jsx:37 ~ Orders ~ Orders:", Orders)

  const Canceled = 5;

  const columns = [
    {
      flex: 0.2,
      field: "name",
      headerName: t("code"),
      cellClassName: "flex !px-0 !justify-center ",
      headerAlign: "center",
      
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
              <Typography noWrap variant="caption">
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
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant="body2">
            {row.service?.name}
          </Typography>
        );
      },
    },

    {
      flex: 0.15,
      field: "facility_name",
      headerName: t("facility name"),
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
      renderCell: ({ row }) => {
        return (
          <>
            <Typography
              noWrap
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
            >
              {row.facility?.name}
            </Typography>
          </>
        );
      },
    },
    // {
    //   flex: 0.15,
    //   field: "facility_address",
    //   headerName: t("facility address"),
    //   cellClassName: "flex !px-0 !justify-center",
    //   headerAlign: "center",
    //   renderCell: ({ row }) => {
    //     return (
    //       <>
    //         <Typography
    //           noWrap
    //           sx={{ color: "text.secondary", textTransform: "capitalize" }}
    //         >
    //           {row.facility?.address}
    //         </Typography>
    //       </>
    //     );
    //   },
    // },
    {
      flex: 0.15,
      headerName: t("status"),
      field: "status",
      cellClassName: "flex !px-0 !justify-center",
      headerAlign: "center",
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
          >
            {row.status?.name_ar}
          </Typography>
        );
      },
    },
    {
      flex: 0.15,
      headerName: "الاجراءات",
      field: "الاجراءات",
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
              gap: "20px",
              justifyContent: "center",
            }}
            className="items-center justify-center w-full "
          >
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
                  {
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
                  },
                ]}
              />
              {/* <Icon path={mdiTrashCanOutline} size={1} /> */}
            </div>
          </Typography>
        );
      },
    },
  ];

  return (
    <div>
      <MainHeader title={t("Orders")} />
      {isLoading || isRefetching ? (
        <Loading />
      ) : (
        <>
          <OrderInfo Orders={Orders} />

          <Table
            columns={columns || []}
            rows={Orders?.all_user_orders || []}
            textButton={t("Add order")}
            actionButton={() => setOpenAddFaculty(true)}
            placeholderSearch={t("Search in orders")}
          />
        </>
      )}

      <ModalComp
        open={openAddFaculty}
        className={"  "}
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
