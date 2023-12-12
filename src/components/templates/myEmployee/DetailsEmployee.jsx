/* eslint-disable react/prop-types */
import MainHeader from "../../atoms/MainHeader";
import { useTheme } from "@mui/material/styles";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import PreviewImageLink from "../../molecules/PreviewImageLink";

export default function DetailsEmployee({ data }) {
  const theme = useTheme();

  return (
    <div>
      <MainHeader title={` تفاصيل الموظف : ${data?.name} `} />

      <div className="grid grid-cols-2 p-4 gap-y-4">
        <div className="flex gap-2">
          <p
            className="font-bold "
            style={{ color: theme?.palette?.primary?.main }}
          >
            الاسم:
          </p>
          <p>{data.name}</p>
        </div>
        <div className="flex gap-2">
          <p
            className="font-bold "
            style={{ color: theme?.palette?.primary?.main }}
          >
            المسمى الوظيفي:
          </p>
          <p>{data.position}</p>
        </div>
        {data?.attachmentUrl.map((item) => (
         <div className="flex items-center " key={item?.id}>
         <p className="font-bold text-contained"> {item?.label}:</p>
         {!item?.value?.toLowerCase().endsWith(".pdf") ? (
           <p>
             {/* <img
               className="w-[200px] h-[200px] rounded-xl"
               src={item?.value}
               alt=""
             /> */}
             <PreviewImageLink url={item?.value} />
           </p>
         ) : (
           <a href={item?.value} download={item?.value} className="">
             <IconifyIcon icon={"mdi:file-pdf-box"} className="text-5xl" />
           </a>
         )}
       </div>
        ))}
      </div>
    </div>
  );
}
