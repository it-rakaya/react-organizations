/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";

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
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-5 p-10 align-middle">
        <div>
          <TermsConditionIcon />
        </div>
        <div className="flex flex-col items-center gap-5">
          <div>هل انت متاكد من الغاء الطلب</div>
          <Grid xs={12} sm={12} md={12} xl={12}>
            <Button
              variant="contained"
              className="mx-5 bg-contained w-[90px]"
              onClick={() => CancelOrder({})}
            >
              موافق
            </Button>
            <Button
              className="mx-5 border-2 border-solid border-contained text-contained w-[90px]"
              onClick={() => setOpenCancelOrder(false)}
            >
              الغاء
            </Button>
          </Grid>
        </div>
      </div>
    </>
  );
}
