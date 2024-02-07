/* eslint-disable react/prop-types */
import Icon from "@mdi/react";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import PreviewImageLink from "../../molecules/PreviewImageLink";
import { mdiTrayArrowDown } from "@mdi/js";
import PreviewPdf from "../../molecules/PreviewPdf";
import { t } from "i18next";
import { useIsRTL } from "../../../hooks/useIsRTL";

function AttachmentsData({ data, colorHead }) {
  const isRTL = useIsRTL()
  return (
    <div className="pt-5 md:pt-7">
          <div className="block col-span-2 md:hidden">
        <h2 className="text-black dark:text-white" >{t("attachment")}</h2>
      </div>
      {data?.attachmentUrl?.map((item) => (
        <div className="m-auto md:ml-10 " key={item?.id}>
          <div className="flex items-center justify-between w-full py-1 my-3 border-b border-[#e6e6e991]">
            <div className="flex items-center gap-2">
              {!item?.value?.toLowerCase()?.endsWith(".pdf") ? (
                <div className="mr-[2px]">
                  <IconifyIcon
                    icon={"iconamoon:file-image-light"}
                    className="text-[1.6rem] text-black  dark:text-white "
                  />
                </div>
              ) : (
                <div>
                  <IconifyIcon
                    icon={"prime:file-pdf"}
                    className="text-3xl text-black dark:text-white "
                  />
                </div>
              )}
              <p
                className="font-medium text-[16px] "
                style={{ color: colorHead }}
              >
                {isRTL ? item?.label_ar :item?.label_en}{" "}
              </p>
            </div>

            <div>
              {!item?.value?.toLowerCase()?.endsWith(".pdf") ? (
                <div className="flex items-center gap-2">
                  <PreviewImageLink url={item?.value} eyeIcon={true} />
                  <a
                    href={item?.value}
                    download={item?.value}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer "
                  >
                    <Icon path={mdiTrayArrowDown} size={1} className="text-black dark:text-white " />
                  </a>
                </div>
              ) : (
                <div className="flex items-center gap-2 ">
                  <PreviewPdf item={item} eyeIcon={true} />
                  <a
                    href={item?.value}
                    download={item?.value}
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-pointer"
                  >
                    <Icon path={mdiTrayArrowDown} size={1} className="text-black dark:text-white "  />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttachmentsData;
