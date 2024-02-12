/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import ModalComp from "../../atoms/ModalComp";
import TermsAndCondition from "../../molecules/TermsAndCondition";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";

function FacilityControl({
  setOpen,
  open,
  update,
  idFacility,
  DetailsFacilities,
  updateData,
}) {
  const [checked, setChecked] = useState(update ? true : false);
  const { values, dirty } = useFormikContext();
 
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
      setChecked(update ? true : false);
    }
  }, [open]);

  const handleSubmit = () => {
    const updatedIban = values.iban.replace(/-/g, "").replace(/\s+/g, "");
    const changedValues = {};
    const bankInformationKeys = ["account_name", "bank_id", "iban"];
    if (update) {
      Object.entries(values).forEach(([key, value]) => {
        if (!bankInformationKeys.includes(key)) {
          if (value !== updateData?.facility[key]) {
            changedValues[key] = value;
          }
        }
      });

      const originalIban =
        updateData?.facility?.bank_information?.iban?.replace(/\s+/g, "");
      if (updatedIban !== originalIban) {
        changedValues.iban = updatedIban;
      }
    }
    const validAttachments =
      values?.attachments
        ?.map((file, index) => ({ index, file }))
        .filter(
          (item) => typeof item?.file !== "undefined" && item.file !== "deleted"
        ) || [];

    const attachments =
      validAttachments?.map((item) => ({
        [`attachments[${item?.index}]`]: item?.file,
      })) || [];
    const attachmentsToDelete = values?.attachments
      ?.map((file, index) => ({ file, index }))
      ?.filter(
        (item) =>
          item.file === "deleted" && AllAttachmentsId?.includes(item.index)
      )
      .map((item) => ({
        [`del_attachments[${item.index}]`]: item.index,
      }));

    let combinedObject = update
      ? { ...changedValues , ...Object?.assign({}, ...attachments) }
      : { ...values, iban: updatedIban, ...Object?.assign({}, ...attachments) };
    combinedObject.organization_id = orgData?.organizations?.id;

    if (attachmentsToDelete?.length > 0) {
      combinedObject = {
        ...combinedObject,
        ...Object.assign({}, ...attachmentsToDelete),
      };
    }
    delete combinedObject?.attachments;


    addFacility(combinedObject);
  };

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
              action={handleSubmit}
              loading={loadingAddFacility}
              className={"w-auto mt-1"}
              disabled={!checked || !dirty}
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
