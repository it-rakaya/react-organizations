/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import TermsAndCondition from "../../components/molecules/TermsAndCondition";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import { useFormikContext } from "formik";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { t } from "i18next";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

function FacilityControl({ setOpen , open }) {
  const [checked, setChecked] = useState(false);
  const { values } = useFormikContext();
  const { orgData } = UseOrg();
  const navigate = useNavigate();

  const { mutate: addFacility, isPending: loadingAddFacility } = useMutate({
    mutationKey: [`add_facilities`],
    endpoint: `facilities`,
    onSuccess: () => {
      notify("success", t("A facility has been added successfully"));
      navigate("/dashboard/facilities");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
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
                  .map((file, index) => ({ index, file }))
                  .filter((item) => typeof item.file !== "undefined");
                const attachments = validAttachments.map((item) => ({
                  [`attachments[${item?.index}]`]: item?.file,
                }));

                const combinedObject = {
                    ...values,
                    organization_id: orgData?.organizations?.id,
                  ...Object.assign({}, ...attachments),
                };
                delete combinedObject.attachments;
                console.log("🚀 ~ file: FacilityControl.jsx:52 ~ FacilityControl ~ combinedObject:", combinedObject)
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