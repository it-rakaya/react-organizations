import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab } from "@mui/material";
import Grid from "@mui/material/Grid";
import { t } from "i18next";
import { useState } from "react";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import DataNotFound from "../../components/molecules/NotFound";
import AddOrder from "../../components/organisms/orders/AddOrder";
import CancelOrder from "../../components/organisms/orders/CancelOrder";
import CardOrder from "../../components/organisms/orders/CardOrder";
import DetailsOrder from "../../components/organisms/orders/DetailsOrder";
import useFetch from "../../hooks/useFetch";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

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
  const { orgData } = UseOrg();
  console.log("🚀 ~ file: Orders.jsx:29 ~ Orders ~ orgData:", orgData)

  const {
    data: Orders,
    isLoading,
    isRefetching,
    refetch,
  } = useFetch({
    endpoint: `orders?organization_id=${orgData?.organizations?.id}`,
    queryKey: ["my_orders"],
    enabled:!!orgData?.organizations?.id
  });

  return (
    <div>
      <MainHeader
        title={t("Orders")}
        addTitle={t("Add order")}
        action={() => setOpenAddFaculty(true)}
      />
      <TabContext value={value} className="mr-0 overflow-hidden">
        <TabList onChange={handleChange} aria-label="nav tabs example">
          <Tab
            value="1"
            component="a"
            label={<h2 className="font-bold text-black">{t("All")} </h2>}
          />
          <Tab
            value="2"
            component="a"
            label={<h2 className="font-bold text-black">{t("Accepted")} </h2>}
          />
          <Tab
            value="3"
            component="a"
            label={
              <h2 className="font-bold text-black"> {t("In progress")} </h2>
            }
          />
          <Tab
            value="4"
            component="a"
            label={<h2 className="font-bold text-black">{t("Canceled")} </h2>}
          />
          <Tab
            value="5"
            component="a"
            label={<h2 className="font-bold text-black">{t("Waiting")} </h2>}
          />
          <Tab
            value="6"
            component="a"
            label={<h2 className="font-bold text-black">{t("Rejection")} </h2>}
          />
          <Tab
            value="7"
            component="a"
            label={<h2 className="font-bold text-black">{t("New")} </h2>}
          />
        </TabList>
        {isLoading || isRefetching ? (
          <Loading />
        ) : Orders?.all_user_orders?.length ? (
          <>
            <Grid container spacing={3} className="overflow-hidden">
              {Orders?.all_user_orders?.map((item) => (
                <>
                  {/* All */}
                  <TabPanel value="1" key={item?.id} className="mt-5 ">
                    <CardOrder
                      item={item}
                      setOpenDetailsOrder={setOpenDetailsOrder}
                      setDetailsOrder={setDetailsOrder}
                      setOpenCancelOrder={setOpenCancelOrder}
                      setOrderId={setOrderId}
                    />
                  </TabPanel>

                  {/* تم القبول */}
                  <TabPanel value="2" className="mt-5 ">
                    {item.status_id == 3 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel>

                  {/* قيد المراجعه */}
                  <TabPanel value="3" className="mt-5 ">
                    {item.status_id == 2 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel>

                  {/* تم الالغاء */}
                  <TabPanel value="4" className="mt-5 ">
                    {item.status_id == 5 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel>

                  {/*  قيد الانتظار */}
                  <TabPanel value="5" className="mt-5 ">
                    {item.status_id == 1 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel>

                  {/* تم الرفض */}
                  <TabPanel value="6" className="mt-5 ">
                    {item.status_id == 4 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel>

                  {/* جديد  */}
                  <TabPanel value="7" className="mt-5 ">
                    {item.status_id == 6 && (
                      <CardOrder
                        item={item}
                        setOpenDetailsOrder={setOpenDetailsOrder}
                        setDetailsOrder={setDetailsOrder}
                        setOpenCancelOrder={setOpenCancelOrder}
                        setOrderId={setOrderId}
                      />
                    )}
                  </TabPanel>
                </>
              ))}
            </Grid>
          </>
        ) : (
          <DataNotFound title={"لايوجد طلبات"} />
        )}
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
