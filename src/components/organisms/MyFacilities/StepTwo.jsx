/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";
import UploadImageTwo from "../../molecules/UploadImageTwo";
import ModalComp from "../../atoms/ModalComp";
import { useState } from "react";
import UploadImage from "../../molecules/UploadImage";

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
    <div className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-2 xl:grid-cols-3">
      {detailsFacilitiesData?.map((item, index) => (
        <div key={index} className="m-auto md:m-0">
          {/* <UploadImageTwo
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
          /> */}
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
