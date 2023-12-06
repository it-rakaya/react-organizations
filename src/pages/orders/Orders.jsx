import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { t } from "i18next";
import { useState } from "react";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import OrderIcon from "../../components/atoms/icons/OrderIcon";
import Loading from "../../components/molecules/Loading";
import DataNotFound from "../../components/molecules/NotFound";
import OptionsMenu from "../../components/organisms/Navbar/option-menu/OptionsMenu";
import AddOrder from "../../components/organisms/orders/AddOrder";
import CancelOrder from "../../components/organisms/orders/CancelOrder";
import DetailsOrder from "../../components/organisms/orders/DetailsOrder";
import useFetch from "../../hooks/useFetch";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";

export default function Orders() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [orderId, setOrderId] = useState();
  const [detailsOrder, setDetailsOrder] = useState("");
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const {
    data: Orders,
    isLoading,
    isRefetching,
    refetch,
  } = useFetch({
    endpoint: `orders`,
    queryKey: ["my_orders"],
    onError(e) {
      console.log("e", e);
    },
  });

  console.log("🚀 ~ file: Orders.jsx:27 ~ Orders ~ Orders:", Orders);
  return (
    <div>
      <MainHeader
        title={t("Orders")}
        addTitle={t("Add order")}
        action={() => setOpenAddFaculty(true)}
      />
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="nav tabs example" >
          <Tab
            value="1"
            component="a"
            // className="mx-2 bg-contained rounded-t-md"
            
            label={<h2 className="font-bold text-black">{t("All")} </h2>}
          />
          <Tab
            value="2"
            component="a"
            // className="bg-[#23ab46]  rounded-t-md mx-2"
            label={<h2 className="font-bold text-black">{t("Accepted")} </h2>}
          />
          <Tab
            value="3"
            component="a"
            // className="bg-[#1ba9b7]  rounded-t-md mx-2"
            label={
              <h2 className="font-bold text-black"> {t("In progress")} </h2>
            }
          />
          <Tab
            value="4"
            component="a"
            // className="bg-[#f31515]  rounded-t-md mx-2"
            label={<h2 className="font-bold text-black">{t("Canceled")} </h2>}
          />
        </TabList>

        <TabPanel value="1">
          {isLoading || isRefetching ? (
            <Loading />
          ) : Orders?.all_user_orders?.length ? (
            <>
              <Grid container spacing={10}>
                {Orders?.all_user_orders?.map((item) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    md={3}
                    xl={2}
                    key={item?.id}

                    // className={{ height: "3500px" }}
                  >
                    <Card
                      sx={{ position: "relative" }}
                      style={{
                        height: "220px",
                        maxHeight: "220px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
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
                              setOpenDetailsOrder(true);
                              setDetailsOrder(item);
                            },
                          },

                          { divider: true },
                          {
                            text: t("Cancel"),
                            menuItemProps: {
                              sx:
                                item.status.name !== "تم الالغاء"
                                  ? { color: "error.main" }
                                  : {
                                      color: "#ff87878f",
                                      cursor: "not-allowed",
                                    },
                            },
                            function: () => {
                              if (item.status.name !== "تم الالغاء") {
                                setOpenCancelOrder(true);
                                setOrderId(item?.id);
                              }
                            },
                          },
                        ]}
                      />
                      <CardContent>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          {/* <img
                        width="80"
                        height="80"
                        src="https://img.icons8.com/dotty/80/purchase-order.png"
                        alt="purchase-order"
                      /> */}

                          <OrderIcon />
                          <Typography variant="h6" sx={{ fontWeight: 500 }}>
                            {item?.name_ar}
                          </Typography>
                          <Typography
                            sx={{ mb: 4, color: "text.secondary" }}
                            className="text-center"
                          >
                            {item?.source_registration}
                          </Typography>
                          <Typography
                            sx={{ mb: 4, color: "text.secondary" }}
                            className={`text-center font-bold px-2 py-1 rounded-md !text-black `}
                            // style={{ backgroundColor: item?.status?.color }}
                          >
                            {item?.status?.name}
                          </Typography>
                          <Grid xs={12} sm={12} md={12} xl={12}>
                            {item.status.name !== "تم الالغاء" && (
                              <ButtonComp
                                variant="contained"
                                action={() => {
                                  setOpenDetailsOrder(true);
                                  setDetailsOrder(item);
                                }}
                              >
                                تفاصيل طلب
                              </ButtonComp>
                            )}
                            {/* <Button
                          disabled={
                            item.status.name == "تم الالغاء" ||
                            item.status.name == "تم القبول " ||
                            item.status.name == "تم الرفض"
                          }
                          className={`marker:text-white hover:!bg-inherit  ${
                            item.status.name == "تم الالغاء" ||
                            item.status.name == "تم القبول " ||
                            item.status.name == "تم الرفض"
                              ? "bg-[#bcbcbc] disabled:text-white cursor-not-allowed"
                              : "!bg-red-600 !text-white hover:!bg-red-600"
                          }`}
                          onClick={() => {
                            setOpenCancelOrder(true);
                            setOrderId(item?.id);
                          }}
                        >
                          الغاء طلب
                        </Button> */}
                          </Grid>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <DataNotFound title={"لايوجد طلبات"} />
          )}
        </TabPanel>
        <TabPanel value="2"></TabPanel>
        <TabPanel value="3"></TabPanel>
        <TabPanel value="4"></TabPanel>
      </TabContext>

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
        className="!max-w-[500px]  "
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
