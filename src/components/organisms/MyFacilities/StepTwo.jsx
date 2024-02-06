/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import ModalComp from "../../atoms/ModalComp";
import UploadDoc from "../../molecules/uploadImage/UploadDoc";
import { useIsRTL } from "../../../hooks/useIsRTL";

export default function StepTwo({ DetailsFacilities, attachments_facilities }) {
  const detailsFacilitiesData = attachments_facilities?.attachment_labels;
  console.log("🚀 ~ StepTwo ~ detailsFacilitiesData:", detailsFacilitiesData)
  const images = [
    { path: "/nationalAddress.png" },
    { path: "/LancesWork.png" },
    { path: "/registerMain.png" },
  ];
  const [show, setShow] = useState(false);
  const [index] = useState(0);
  const isRTL = useIsRTL()

  return (
    <>
      <div className="grid w-full grid-cols-12 col-span-12 mt-3 md:gap-x-10 ">
        <div className="col-span-12">
          <Typography className={`font-bold  !text-black dark:!text-white`}>
            4.{t("Upload Files")}
          </Typography>
        </div>
        {detailsFacilitiesData?.map((attachmentLabel) => {
          const userAttachment = DetailsFacilities?.find(
            (ua) => ua.attachment_label_id === attachmentLabel.id
          );
          return (
            <div
              key={index}
              className="w-full col-span-12 m-auto md:m-0 md:col-span-6 xl:col-span-4 2xl:col-span-4"
            >
              <UploadDoc
                key={attachmentLabel.id}
                name={`attachments[${attachmentLabel.id}]`}
                label={isRTL ?attachmentLabel.placeholder_ar : attachmentLabel.placeholder_en}
                nameValue={attachmentLabel?.id}
                id={attachmentLabel.id}
                accept={attachmentLabel.extensions}
                placeholder={isRTL ?attachmentLabel.placeholder_ar : attachmentLabel.placeholder_en}
                isRequired={attachmentLabel.is_required == "1"}
                value={userAttachment ? userAttachment.value : null}
                nameLabel={userAttachment?.name}
              />
            </div>
          );
        })}

      </div>
      {images[index]?.path && (
        <ModalComp
          open={show}
          className="!max-w-[850px]  "
          onClose={() => setShow(false)}
          hidden={true}
          Children={
            <div className="">
              <img
                className="w-full h-[38rem] object-contain"
                src={images[index]?.path}
              />
            </div>
          }
        />
      )}
    </>
  );
}
