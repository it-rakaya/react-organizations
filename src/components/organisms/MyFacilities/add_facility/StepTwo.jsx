import useFetch from "../../../../hooks/useFetch";
import UploadImageTwo from "../../../molecules/UploadImageTwo";

export default function StepTwo() {
  const { data: attachments_facilities } = useFetch({
    endpoint: `attachments-labels/facilities`,
    queryKey: ["attachments_facilities"],
    onError(e) {
      console.log("e", e);
    },
  });

  return (
    <div className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-3 xl:grid-cols-4">
      {attachments_facilities?.attachment_labels?.map((item, index) => (
        <div key={index}>
          <UploadImageTwo
            name={`attachments[${item?.id}]`}
            label={item?.placeholder}
            nameValue={item?.id}
          />
        </div>
      ))}
    </div>
  );
}
