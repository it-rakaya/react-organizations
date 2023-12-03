/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";

export default function CancelOrder({ refetch, setOpenCancelOrder, orderId }) {
  const { mutate: CancelOrder } = useMutate({
    mutationKey: [`cancel_order${orderId}`],
    endpoint: `orders-cancel/${orderId}`,
    onSuccess: () => {
      refetch();
      notify("success");
      setOpenCancelOrder(false);
    },
    onError: (err) => {
      console.log("err", err);
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 p-10 align-middle">
        <div>هل انت متاكد من الغاء الطلب</div>
        <div className="flex ">
          <Grid xs={12} sm={12} md={12} xl={12}>
            <Button
              variant="contained"
              className="mx-10 bg-contained "
              onClick={() => CancelOrder({})}
            >
              موافق
            </Button>
            <Button className="mx-10 text-white bg-red-600">الغاء</Button>
          </Grid>
        </div>
      </div>
    </>
  );
}
