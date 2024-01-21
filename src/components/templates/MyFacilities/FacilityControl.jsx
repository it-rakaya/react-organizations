/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ModalComp from "../../atoms/ModalComp";
import TermsAndCondition from "../../molecules/TermsAndCondition";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import { useFormikContext } from "formik";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import { t } from "i18next";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import { useNavigate } from "react-router-dom";

function FacilityControl({ setOpen, open, update, idFacility  }) {

  const [checked, setChecked] = useState(false);
  const { values } = useFormikContext();
  const { orgData } = UseOrg();
  const navigate = useNavigate();
  const endpoint = `facilities`;
  const updateEndpoint = `facilities/${idFacility}`;

  const { mutate: addFacility, isPending: loadingAddFacility } = useMutate({
    mutationKey: [`add_facilities`],
    endpoint: update ? updateEndpoint : endpoint,
    onSuccess: () => {
      notify("success", t("A facility has been added successfully"));
      navigate("/dashboard/facilities");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  useEffect(() => {
    if(!open){
      setChecked(false)
    }
   
  }, [open])
  
  return (
    <div>
      <ModalComp
        open={open}
        className="!max-w-[500px]  "
        onClose={() => setOpen(false)}
        Children={
          <div className="pt-10 !flex gap-3 !items-center !justify-center !flex-col">
            <TermsAndCondition checked={checked} setChecked={setChecked} />

            <ButtonComp
              type={"submit"}
              action={() => {
                const validAttachments = values?.attachments
                  ?.map((file, index) => ({ index, file }))
                  .filter((item) => typeof item?.file !== "undefined") || [];
                const attachments = validAttachments?.map((item) => ({
                  [`attachments[${item?.index}]`]: item?.file,
                })) || [];

                const combinedObject = {
                  ...values,
                  organization_id: orgData?.organizations?.id,
                  ...Object?.assign({}, ...attachments ),
                };
                delete combinedObject?.attachments;
                addFacility(combinedObject);
              }}
              loading={loadingAddFacility}
              className={"w-auto mt-1"}
              disabled={!checked}
              variant="contained"
            >
              {t("Save")}
            </ButtonComp>
          </div>
        }
      />
    </div>
  );
}

export default FacilityControl;
