/* eslint-disable react/prop-types */
import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { t } from "i18next";
import PreviewImageLink from "./PreviewImageLink";

function CardInfo({ setShow, setIndex, messageInfo, index, images }) {
  return (
    <div className="my-1 w-fit">
      <div
        className="items-center hidden gap-1 md:flex"
        onClick={() => {
          setShow(true);
          setIndex(index);
        }}
      >
        <>
          <Icon
            path={mdiInformationOutline}
            // size={0.7}
            className="!text-[#80b3f0]  w-5"
          />
          <span className="text-[10px] text-[#80b3f0]">
            {messageInfo ? (
              messageInfo
            ) : (
              <p className="text-[10px] text-[#80b3f0] cursor-pointer">
                {t("To view the attachment, click here")}
              </p>
            )}
          </span>
        </>
      </div>
      <div className="flex items-center gap-1 cursor-pointer md:hidden">
        <>
        <Icon
            path={mdiInformationOutline}
            size={0.7}
            className="!text-[#80b3f0]"
          />
          <span className="text-[10px] text-[#80b3f0]">
            {messageInfo ? (
              messageInfo
            ) : (
              <div className="block md:hidden">
                <PreviewImageLink
                  url={images?.[index].path}
                  info={true}
                  messageInfo={messageInfo}
                />
              </div>
            )}
          </span>
         
        </>
      </div>
    </div>
  );
}

export default CardInfo;
