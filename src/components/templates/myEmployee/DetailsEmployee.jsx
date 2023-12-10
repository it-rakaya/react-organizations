/* eslint-disable react/prop-types */
import { t } from "i18next";
import MainHeader from "../../atoms/MainHeader";
import { useTheme } from "@mui/material/styles";

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
          <div className="flex flex-col gap-2" key={item?.id}>
            <p
              className="font-bold "
              style={{ color: theme?.palette?.primary?.main }}
            >
              {t(item?.label)}:
            </p>
            <p>
              <img
                className="w-[200px] h-[200px] rounded-xl"
                src={item?.value}
                alt=""
              />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
