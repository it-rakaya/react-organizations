/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import { t } from "i18next";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";

function DeleteEMployee({ refetch, employeeId, setModelDeleteEMployee }) {
  const { orgData } = UseOrg();

  const { mutate: DeleteEMployee, isPending } = useMutate({
    mutationKey: [`delete-employee${employeeId}`],
    endpoint: `delete-employee/${employeeId}`,
    onSuccess: () => {
      notify("success", t("employee deleted successfully"));
      setModelDeleteEMployee(false);
      refetch();
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });

  return (
    <div className="flex flex-col items-center justify-center mb-10 align-middle gap-7">
      <div>
        <TermsConditionIcon />
      </div>
      <div className="!flex flex-col items-center gap-7">
        <div className="text-center text-black dark:text-white">
          {t("Are you sure you want to delete this employee?")}
        </div>
        <Grid xs={12} sm={12} md={12} xl={12}>
          <ButtonComp
            variant="contained"
            className="!mx-1  !border-solid  !w-[120px] !h-[40px] !mt-0 text-black dark:text-white"
            action={() =>
              DeleteEMployee({
                organization_id: orgData?.organizations?.id,
              })
            }
            loading={isPending}
          >
            {t("Confirm")}
          </ButtonComp>
          <ButtonComp
            className="!mx-1  !border-solid  !w-[120px] !h-[40px] !mt-0  dark:!text-white"
            action={() => setModelDeleteEMployee(false)}
            variant="outline"
          >
            {t("cancel")}
          </ButtonComp>
        </Grid>
      </div>
    </div>
  );
}

export default DeleteEMployee;
