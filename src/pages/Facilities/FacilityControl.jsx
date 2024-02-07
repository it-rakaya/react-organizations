/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ModalComp from "../../components/atoms/ModalComp";
import TermsAndCondition from "../../components/molecules/TermsAndCondition";
import ButtonComp from "../../components/atoms/buttons/ButtonComp";
import { useFormikContext } from "formik";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { t } from "i18next";
import { useMutate } from "../../hooks/useMutate";
import { notify } from "../../utils/toast";
import { useNavigate } from "react-router-dom";

function FacilityControl({
  setOpen,
  open,
  update,
  idFacility,
  DetailsFacilities,
}) {
  const [checked, setChecked] = useState(update ? true : false);
  const { values } = useFormikContext();
  const { orgData } = UseOrg();
  const navigate = useNavigate();
  const endpoint = `facilities`;
  const updateEndpoint = `facilities/${idFacility}`;
  const AllAttachmentsId = DetailsFacilities?.map(
    (item) => item?.attachment_label_id
  );

  const { mutate: addFacility, isPending: loadingAddFacility } = useMutate({
    mutationKey: [`add_facilities`],
    endpoint: update ? updateEndpoint : endpoint,
    onSuccess: () => {
      notify(
        "success",
        update
          ? t("A facility has been updated successfully")
          : t("A facility has been added successfully")
      );
      navigate("/dashboard/facilities");
    },
    onError: (err) => {
      notify("error", err?.response?.data.message);
    },
    formData: true,
  });
  useEffect(() => {
    if (!open) {
      setChecked(update ?true :false);
    }
  }, [open]);

  return (
    <div>
      <ModalComp
        open={open}
        className="!max-w-[500px]  "
        onClose={() => setOpen(false)}
        Children={
          <div className="pt-10 !flex gap-3 !items-center !justify-center !flex-col">
            <TermsAndCondition
              checked={checked}
              setChecked={setChecked}
              style={{ height: "calc(100vh - 26rem)" }}
            />

            <ButtonComp
              type={"submit"}
              action={() => {
                const updatedIban = values.iban
                  .replace(/-/g, "")
                  .replace(/\s+/g, "");
                const validAttachments =
                  values?.attachments
                    ?.map((file, index) => ({ index, file }))
                    .filter(
                      (item) =>
                        typeof item?.file !== "undefined" &&
                        item.file !== "deleted"
                    ) || [];
                const attachments =
                  validAttachments?.map((item) => ({
                    [`attachments[${item?.index}]`]: item?.file,
                  })) || [];
                const attachmentsToDelete = values?.attachments
                  ?.map((file, index) => ({ file, index }))
                  ?.filter(
                    (item) =>
                      item.file == "deleted" &&
                      AllAttachmentsId.includes(item.index)
                  )
                  .map((item) => ({
                    [`del_attachments[${item?.index}]`]: item.index,
                  }));

                let combinedObject = {
                  ...values,
                  iban: updatedIban,
                  organization_id: orgData?.organizations?.id,
                  ...Object?.assign({}, ...attachments),
                };
                if (attachmentsToDelete?.length > 0) {
                  combinedObject = {
                    ...combinedObject,
                    ...Object?.assign({}, ...attachmentsToDelete),
                  };
                }
                delete combinedObject?.attachments;
                addFacility(combinedObject);
              }}
              loading={loadingAddFacility}
              className={"w-auto mt-1"}
              disabled={!checked}
              variant="contained"
            >
              {update ? t("Edit") : t("Save")}
            </ButtonComp>
          </div>
        }
      />
    </div>
  );
}

export default FacilityControl;
