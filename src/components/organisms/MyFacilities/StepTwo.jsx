/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import { useState } from "react";
import ModalComp from "../../atoms/ModalComp";
import UploadImage from "../../molecules/uploadImage/UploadImage";
import { Typography } from "@mui/material";

export default function StepTwo({ DetailsFacilities, attachments_facilities }) {
  const detailsFacilitiesData =
    DetailsFacilities || attachments_facilities?.attachment_labels;
  const images = [
    { path: "/nationalAddress.png" },
    { path: "/LancesWork.png" },
    { path: "/registerMain.png" },
  ];
  const { errors } = useFormikContext();
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full grid-cols-12 col-span-12 mt-3 md:gap-x-10 md:grid-cols-3 xl:grid-cols-3">
      <div className="col-span-12">
        <Typography className={`font-bold  `}>4. تحميل المستندات </Typography>
      </div>
      {detailsFacilitiesData?.map((item, index) => (
        <div
          key={index}
          className="w-full col-span-12 m-auto md:m-0 md:col-span-1 xl:col-span-1"
        >
          <UploadImage
            name={`attachments[${item?.id ? item?.id : item?.attachment_id}]`}
            label={item?.placeholder ? item?.placeholder : item?.label}
            nameValue={item?.id ? item?.id : item?.attachment_id}
            className="!justify-center"
            value={item?.value}
            isRequired={item?.is_required == 1 ? true : false}
            accept={item?.extensions || []}
            showIcon
            setShow={setShow}
            setIndex={setIndex}
            index={index}
          />
          <p>{errors[`attachments[${item.id || item.attachment_id}]`]}</p>
        </div>
      ))}
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
    </div>
  );
}
