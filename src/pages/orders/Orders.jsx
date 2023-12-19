import { mdiEyeOutline, mdiTrashCanOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { TabContext } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
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
export default function Orders() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [orderId, setOrderId] = useState();
  const [detailsOrder, setDetailsOrder] = useState("");
  console.log(
    "🚀 ~ file: Orders.jsx:25 ~ Orders ~ detailsOrder:",
    detailsOrder
  );
  const [value, setValue] = useState("1");

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

  const Canceled = 5;

  const columns = [
    {
      flex: 0.2,
      field: "name",
      headerName: t("code"),
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
      renderCell: ({ row }) => {
        return (
          <Typography noWrap variant="body2">
            {row.service?.name}
          </Typography>
        );
      },
    },
    // {
    //   flex: 0.15,
    //   field: "national_id",
    //   headerName: t("price"),
    //   renderCell: ({ row }) => {
    //     return (
    //       <>
    //         <Typography
    //           noWrap
    //           sx={{ color: "text.secondary", textTransform: "capitalize" }}
    //         >
    //           {row.service?.price}
    //         </Typography>
    //       </>
    //     );
    //   },
    // },
    {
      flex: 0.15,
      field: "facility_name",
      headerName: t("facility name"),
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
    {
      flex: 0.15,
      field: "facility_address",
      headerName: t("facility address"),
      renderCell: ({ row }) => {
        return (
          <>
            <Typography
              noWrap
              sx={{ color: "text.secondary", textTransform: "capitalize" }}
            >
              {row.facility?.address}
            </Typography>
          </>
        );
      },
    },
    {
      flex: 0.15,
      headerName: t("status"),
      field: "status",
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
      headerName: "",
      field: "",
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
            <div
              className="cursor-pointer"
              onClick={() => {
                if (row.status_id == Canceled) {
                  return notify("worning", t("cant Canceled order"));
                } else {
                  setOpenDetailsOrder(true);
                  setDetailsOrder(row);
                }
              }}
            >
              <Icon path={mdiEyeOutline} size={1} />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                if (row.status_id == Canceled) {
                  return console.log("ddd");
                } else {
                  setOrderId(row.id);
                  setOpenCancelOrder(true);
                }
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
    <div>
      <MainHeader title={t("Orders")} />
      <TabContext value={value} className="mr-0 overflow-hidden">
        {/* <TabList onChange={handleChange} aria-label="nav tabs example">
          <Tab
            value="1"
            component="a"
            label={<h2 className="font-bold !text-black dark:text-white">{t("All")} </h2>}
          />
          <Tab
            value="2"
            component="a"
            label={<h2 className="font-bold !text-black dark:text-white">{t("Accepted")} </h2>}
          />
          <Tab
            value="3"
            component="a"
            label={
              <h2 className="font-bold !text-black dark:text-white"> {t("In progress")} </h2>
            }
          />
          <Tab
            value="4"
            component="a"
            label={<h2 className="font-bold !text-black dark:text-white">{t("Canceled")} </h2>}
          />
          <Tab
            value="5"
            component="a"
            label={<h2 className="font-bold !text-black dark:text-white">{t("Waiting")} </h2>}
          />
          <Tab
            value="6"
            component="a"
            label={<h2 className="font-bold !text-black dark:text-white">{t("Rejection")} </h2>}
          />
          <Tab
            value="7"
            component="a"
            label={<h2 className="font-bold !text-black dark:text-white">{t("New")} </h2>}
          />
        </TabList> */}
        {isLoading || isRefetching ? (
          <Loading />
        ) : Orders?.all_user_orders?.length ? (
          <>
            <Grid container spacing={3} className="overflow-hidden">
              {Orders?.all_user_orders?.map((item) => (
                <>
                  {/* All */}
                  {/* <TabPanel value="1" key={item?.id} className="mt-5 ">
                    <CardOrder
                      item={item}
                      setOpenDetailsOrder={setOpenDetailsOrder}
                      setDetailsOrder={setDetailsOrder}
                      setOpenCancelOrder={setOpenCancelOrder}
                      setOrderId={setOrderId}
                    />
                  </TabPanel> */}

                  {/* تم القبول */}
                  {/* <TabPanel value="2" className="mt-5 ">
                    {item.status_id == 3 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel> */}

                  {/* قيد المراجعه */}
                  {/* <TabPanel value="3" className="mt-5 ">
                    {item.status_id == 2 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel> */}

                  {/* تم الالغاء */}
                  {/* <TabPanel value="4" className="mt-5 ">
                    {item.status_id == 5 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel> */}

                  {/*  قيد الانتظار */}
                  {/* <TabPanel value="5" className="mt-5 ">
                    {item.status_id == 1 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel> */}

                  {/* تم الرفض */}
                  {/* <TabPanel value="6" className="mt-5 ">
                    {item.status_id == 4 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel> */}

                  {/* جديد  */}
                  {/* <TabPanel value="7" className="mt-5 ">
                    {item.status_id == 6 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel> */}
                </>
              ))}
            </Grid>
          </>
        ) : (
          ""
          // <DataNotFound title={t("Data not Found")} />
        )}
      </TabContext>
      <OrderInfo Orders={Orders} />

      <Table
        columns={columns || []}
        rows={Orders?.all_user_orders || []}
        textButton={t("Add order")}
        actionButton={() => setOpenAddFaculty(true)}
        placeholderSearch={t("Search in orders")}
      />

      <ModalComp
        open={openAddFaculty}
        className={"  "}
        onClose={() => setOpenAddFaculty(false)}
        Children={<AddOrder setOpenAddFaculty={setOpenAddFaculty} />}
      />
      <ModalComp
        open={openDetailsOrder}
        className={"  "}
        onClose={() => setOpenDetailsOrder(false)}
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
