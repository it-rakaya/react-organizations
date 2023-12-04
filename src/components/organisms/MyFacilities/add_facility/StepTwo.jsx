import useFetch from "../../../../hooks/useFetch";
import UploadImageTwo from "../../../molecules/UploadImageTwo";

export default function StepTwo() {
  const { data: attachments } = useFetch({
    endpoint: `facility-attachments-labels`,
    queryKey: ["attachments_facilities"],
    onError(e) {
      console.log("e", e);
    },
  });

  return (
    <div className="grid grid-cols-1 gap-10 mt-3 md:grid-cols-3 xl:grid-cols-4">
      {attachments?.attachment_labels?.map((item, index) => (
        <div key={index}>
          <UploadImageTwo
            name={`attachments[${item?.label}]`}
            label={item?.placeholder}
            nameValue={item?.label}
          />
        </div>
      ))}
    </div>
  );
}
