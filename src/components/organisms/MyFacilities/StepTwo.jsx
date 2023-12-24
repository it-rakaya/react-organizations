/* eslint-disable react/prop-types */
import useFetch from "../../../hooks/useFetch";
import UploadImageTwo from "../../molecules/UploadImageTwo";

export default function StepTwo({ DetailsFacilities }) {

  const { data: attachments_facilities } = useFetch({
    endpoint: `attachments-labels/facilities`,
    queryKey: ["attachments_facilities"],
  });
  const detailsFacilitiesData =
  DetailsFacilities || attachments_facilities?.attachment_labels;
  
  return (
    <div className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-3 xl:grid-cols-4">
      {detailsFacilitiesData?.map((item, index) => (
        <div key={index}>
          <UploadImageTwo
            name={`attachments[${item?.id ? item?.id : item?.attachment_id}]`}
            label={item?.placeholder ? item?.placeholder : item?.label}
            nameValue={item?.id ? item?.id : item?.attachment_id}
            className="!justify-center"
            value={item?.value}
            accept={item?.extensions || []}
          />
        </div>
      ))}
    </div>
  );
}
