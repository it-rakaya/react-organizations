/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { t } from "i18next";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";

function DeleteEMployee({ refetch, employeeId, setModelDeleteEMployee }) {
  const { mutate: DeleteEMployee , isPending } = useMutate({
    mutationKey: [`delete-employee${employeeId}`],
    endpoint: `delete-employee/${employeeId}`,
    onSuccess: () => {
      notify("success" , t("employee deleted successfully"));
      setModelDeleteEMployee(false)
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  return (
    <div className="flex flex-col items-center justify-center gap-5 p-10 align-middle">
      <div>
        <TermsConditionIcon />
      </div>
      <div className="flex flex-col items-center gap-5">
        <div>هل انت متاكد من حذف هذا الموظف ؟ </div>
        <Grid xs={12} sm={12} md={12} xl={12}>
          <ButtonComp
            variant="contained"
            className="mx-5 border-2 border-solid border-contained bg-contained w-[90px] h-[40px]"
            action={() => DeleteEMployee({})}
            loading={isPending}
          >
            موافق
          </ButtonComp>
          <ButtonComp
            className="mx-5 border-2 border-solid border-contained !text-contained w-[90px] h-[40px]"
            action={() => setModelDeleteEMployee(false)}
            variant="outline"
          >
            الغاء
          </ButtonComp>
        </Grid>
      </div>
    </div>
  );
}

export default DeleteEMployee;
