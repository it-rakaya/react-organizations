import { Alert } from "@mui/material";
import { t } from "i18next";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Table from "../../components/Table/Table";
import MainHeader from "../../components/atoms/MainHeader";
import ModalComp from "../../components/atoms/ModalComp";
import Loading from "../../components/molecules/Loading";
import AddOrder from "../../components/organisms/orders/AddOrder";
import CancelOrder from "../../components/organisms/orders/CancelOrder";
import DetailsOrder from "../../components/organisms/orders/DetailsOrder";
import OrderInfo from "../../components/organisms/orders/OrderInfo";
import { generateColumns } from "../../components/templates/Order/generateColumns";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import useFetch from "../../hooks/useFetch";
import { useIsRTL } from "../../hooks/useIsRTL";
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

  const closeRegister = orgData?.organizations?.close_order == "1";

  const columns = useMemo(
    () =>
      generateColumns({
        isRTL,
        Canceled,
        setDetailsOrder,
        setOpenDetailsOrder,
        setOpenCancelOrder,
        setOrderId,
      }),
    [Orders, isRTL]
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
