/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import { useMutate } from "../../../hooks/useMutate";
import { notify } from "../../../utils/toast";
import ModalComp from "../../atoms/ModalComp";
import ButtonComp from "../../atoms/buttons/ButtonComp";
import SignatureFacility from "./SignatureFacility";

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

  const {
    mutate: addFacility,
    isPending: loadingAddFacility,
    uploadProgress,
  } = useMutate({
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
        if (key === "iban") {
          const originalIban =
            updateData?.facility?.bank_information?.iban?.replace(/\s+/g, "");
          if (updatedIban !== originalIban) {
            changedValues[key] = updatedIban;
          }
        } else if (bankInformationKeys.includes(key)) {
          // For bank information keys, directly compare with the respective field in bank_information
          if (value !== updateData?.facility?.bank_information?.[key]) {
            changedValues[key] = value;
          }
        } else {
          // For all other fields, compare with the top-level property
          if (value !== updateData?.facility?.[key]) {
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
      ? { ...changedValues, ...Object?.assign({}, ...attachments) }
      : {
          ...values,
          iban: updatedIban,
          ...Object?.assign({}, ...attachments),
        };
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
        onClose={() => (loadingAddFacility ? {} : setOpen(false))}
        Children={
          <div className=" !flex gap-3 !items-center !justify-center !flex-col">
            <SignatureFacility checked={checked} setChecked={setChecked} />
            <div
              className="flex justify-center w-full"
              style={{ padding: "0px 15px 0px 23px" }}
            >
              <ButtonComp
                type={"submit"}
                action={handleSubmit}
                loading={loadingAddFacility}
                className={"w-auto mt-1"}
                disabled={!checked || !dirty}
                variant="contained"
                status={uploadProgress}
                progress
              >
                {update ? t("Edit") : t("Save")}
              </ButtonComp>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default FacilityControl;
