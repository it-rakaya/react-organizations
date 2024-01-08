/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import { t } from "i18next";

export default function CancelOrder({ refetch, setOpenCancelOrder, orderId }) {
  const { mutate: CancelOrder  , isPending } = useMutate({
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
        <div className="flex flex-col items-center g">
          <div className="text-black dark:text-white">{t("Are you sure you want to cancel the order?")}</div>
          <Grid xs={12} sm={12} md={12} xl={12}>
            <ButtonComp
              variant="contained"
              className="mx-2 bg-contained w-[90px] h-[40px]"
              action={() => CancelOrder({})}
              loading={isPending}
            >
              {t("Agree")}
            </ButtonComp>
            <ButtonComp
              className="mx-2 border-2 border-solid border-contained !text-contained w-[90px] h-[40px]"
              action={() => setOpenCancelOrder(false)}
              variant="outlined"
            >
              {t("cancel")}
            </ButtonComp>
          </Grid>
        </div>
      </div>
    </>
  );
}
