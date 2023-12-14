/* eslint-disable react/prop-types */
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import MainHeader from "../../atoms/MainHeader";
import PreviewImageLink from "../../molecules/PreviewImageLink";
import PreviewPdf from "../../molecules/PreviewPdf";

export default function DetailsEmployee({ data }) {
  const theme = useTheme();

  return (
    <div>
      <MainHeader title={`  ${t("Details Employee")} : ${data?.name} `} />

      <div className="grid grid-cols-2 p-4 gap-y-4">
        <div className="flex gap-2">
          <p
            className="font-bold "
            style={{ color: theme?.palette?.primary?.main }}
          >
            {t("Name")}
          </p>
          <p>{data.name}</p>
        </div>
        <div className="flex gap-2">
          <p
            className="font-bold "
            style={{ color: theme?.palette?.primary?.main }}
          >
            {t("Job title")}
          </p>
          <p>{data.position}</p>
        </div>
        {data?.attachmentUrl.map((item) => (
          <div className="flex items-center " key={item?.id}>
            <p className="font-bold text-contained"> {item?.label}:</p>
            {!item?.value?.toLowerCase().endsWith(".pdf") ? (
              <p>
                <PreviewImageLink url={item?.value} />
              </p>
            ) : (
              <PreviewPdf item={item} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
