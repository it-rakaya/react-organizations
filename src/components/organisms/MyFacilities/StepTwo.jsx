/* eslint-disable react/prop-types */
import useFetch from "../../../hooks/useFetch";
import UploadImageTwo from "../../molecules/UploadImageTwo";

export default function StepTwo({DetailsFacilities}) {
  console.log("🚀 ~ file: StepTwo.jsx:6 ~ StepTwo ~ DetailsFacilities:", DetailsFacilities)
  const { data: attachments_facilities } = useFetch({
    endpoint: `attachments-labels/facilities`,
    queryKey: ["attachments_facilities"],
  });
  const detailsFacilitiesData = DetailsFacilities || attachments_facilities?.attachment_labels;
  console.log("🚀 ~ file: StepTwo.jsx:12 ~ StepTwo ~ detailsFacilitiesData:", detailsFacilitiesData)

  return (
    <div className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-3 xl:grid-cols-4">
      {detailsFacilitiesData?.map((item, index) => (
        <div key={index}>
          <UploadImageTwo
            name={`attachments[${item?.id}]`}
            label={item?.placeholder}
            nameValue={item?.id}
            className="!justify-center"
          />
        </div>
      ))}
    </div>
  );
}
