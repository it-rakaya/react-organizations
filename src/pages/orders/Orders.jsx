import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import AddOrder from "../../components/organisms/orders/AddOrder";
import DetailsOrder from "../../components/organisms/orders/DetailsOrder";
import Loading from "../../components/molecules/Loading";
import DataNotFound from "../../components/molecules/NotFound";
import useFetch from "../../hooks/useFetch";
import CancelOrder from "../../components/organisms/orders/CancelOrder";
import { t } from "i18next";

export default function Orders() {
  const [openAddFaculty, setOpenAddFaculty] = useState(false);
  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const [orderId, setOrderId] = useState();

  const [detailsOrder, setDetailsOrder] = useState("");

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
      {isLoading || isRefetching ? (
        <Loading />
      ) : Orders?.all_user_orders?.length ? (
        <>
          <Grid container spacing={6}>
            {Orders?.all_user_orders?.map((item) => (
              <Grid
                item
                xs={12}
                sm={4}
                md={3}
                key={item?.id}
                className={{ height: "290px" }}
              >
                <Card sx={{ position: "relative" }}>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        width="80"
                        height="80"
                        src="https://img.icons8.com/dotty/80/purchase-order.png"
                        alt="purchase-order"
                      />
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
                        className={`text-center font-bold px-2 py-1 rounded-md !text-white `}
                        style={{ backgroundColor: item?.status?.color }}
                      >
                        {item?.status?.name}
                      </Typography>
                      <Grid xs={12} sm={12} md={12} xl={12}>
                        <Button
                          variant="outlined"
                          className="!mx-2"
                          onClick={() => {
                            setOpenDetailsOrder(true);
                            setDetailsOrder(item);
                          }}
                        >
                          تفاصيل طلب
                        </Button>
                        <Button
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
                        </Button>
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
        className={"  "}
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
