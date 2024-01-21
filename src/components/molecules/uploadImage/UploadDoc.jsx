/* eslint-disable no-unused-vars */

import { useFormikContext } from "formik";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { hexToRGBA } from "../../../utils/helpers";
import Label from "../Label";
import { t } from "i18next";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";
import UploadImageIcon from "../../atoms/icons/UploadImageIcon";
import CheckIcon from "../../atoms/icons/CheckIcon";
import PreviewPdf from "../PreviewPdf";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { Typography } from "@mui/material";
import PreviewImageLink from "../PreviewImageLink";
import PreviewImage from "../PreviewImage";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";

/* eslint-disable react/prop-types */
function UploadDoc({
  name,
  label,
  nameValue,
  className,
  value,
  accept,
  isRequired,
  dynamic = false,
}) {
  const { setFieldValue, values } = useFormikContext();
  const theme = useTheme();
  const [invalidFormat, setInvalidFormat] = useState(false);
  const updateImage = {
    value: value,
    type: value?.endsWith(".pdf") ? "application/pdf" : "image/",
    update: true,
  };
  const [files, setFiles] = useState(
    values?.attachments?.length
      ? [values?.attachments[nameValue]]
      : value
      ? [updateImage]
      : []
  );
  const modifyAccept = accept?.map((item) => `.${item}`);
  const textAccept = accept?.map((item) => ` -${item} `);
  const isLargeFile = files?.length && files[0]?.size > 5242880;
  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const isLarge = selectedFile?.size > 5242880;
    if (selectedFile) {
      setFiles([selectedFile]);
      setFieldValue(
        dynamic ? `answers${name}` : name,
        isLarge ? null : selectedFile
      );
    }
  };

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles?.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
    setFieldValue(name, null);
    document.getElementsByName(name)[0].value = '';
  };

  return (
    <div>
      <Label className={"text-center"}>
        {label}
        <span className="mx-1 text-red-500">
          {isRequired == "1" ? "*" : ""}
        </span>
      </Label>
      <div className="h-[100px] relative  border border-dashed rounded-[20px] border-[#9f968575] ">
        <input
          type="file"
          accept={modifyAccept}
          name={name}
          className="absolute w-full h-full opacity-0 cursor-pointer z-[999]"
          onChange={handleFileChange}
        />
        <div
          className="absolute w-full top-1/2 left-1/2"
          style={{ transform: `translate(-50%, -50%)` }}
        >
          {!files?.length ? (
            <div className="flex flex-col items-center justify-center ">
              <UploadImageIcon className="w-[35px]" />
            </div>
          ) : invalidFormat ? (
            <TermsConditionIcon className={"w-[35px] !fill-[#F0A44B]"} />
          ) : (
            <div className="rounded-md">
              {!isLargeFile ? (
                <div className="flex flex-col items-center justify-center ">
                  <CheckIcon />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center ">
                  <TermsConditionIcon className={"w-[47px] h-[47px] "} />
                </div>
              )}
            </div>
          )}

          <p className="flex items-end justify-center m-0 text-center text-[14px] dark:text-white mt-2 px-1">
            {isLargeFile ? (
              t("File size is large")
            ) : invalidFormat ? (
              t("Invalid file format, please choose a PDF or image file")
            ) : files?.length ? (
              <div className="flex flex-col items-center justify-center ">
                <p className=" dark:text-white">
                  {" "}
                  {t("The file has been uploaded successfully")}
                </p>
              </div>
            ) : (
              t("Choose a file or drop it here")
            )}
          </p>
        </div>
      </div>

      {!files?.length && (
        <div className="flex items-center p-2">
          <Icon
            path={mdiInformationOutline}
            // size={}
            className="!text-[#80b3f0] w-5"
          />
          <p className="text-[14px] px-1 py-0 text-[#80b3f0]">
            {t("Please upload the file in this format")}
            {textAccept ? textAccept : "png - jpg - pdf"}
          </p>
        </div>
      )}
      <div className="flex justify-start w-full rounded-md">
        {(!isLargeFile &&
          !updateImage?.value &&
          files[0]?.type?.startsWith("image/")) ||
        files[0]?.path ? (
          <div className="flex items-center justify-center w-full ">
            <PreviewImage
              files={files ? files : []}
              bgMain={bgMain}
              className={className}
              handleRemoveFile={handleRemoveFile}
            />
          </div>
        ) : !isLargeFile &&
          files[0]?.type?.startsWith("image/") &&
          updateImage?.value ? (
          <div className="mt-4 flex items-center px-5 border border-solid rounded-[12px] border-[#9f968575] w-full p-2">
            <PreviewImageLink url={files[0]?.value} />
          </div>
        ) : !isLargeFile &&
          files[0]?.type?.startsWith("application/") &&
          files[0]?.name ? (
          <div className=" border border-solid rounded-[12px] border-[#9f968575] w-full flex items-center px-5 mt-4">
            <a
              href={URL.createObjectURL(files[0])}
              download={files[0].name}
              className="w-full"
            >
              <div
                className={` flex items-center  !justify-start gap-2  py-4 cursor-pointer  `}
              >
                <IconifyIcon
                  icon={"prime:file-pdf"}
                  className="text-xl dark:text-white"
                />
                <Typography className="text-black file-name dark:text-white">
                  {files[0]?.name.slice(0, 15)}
                </Typography>
                {/* <span className="text-sm">اضغط هنا لمشاهدة المرفق</span> */}
              </div>
            </a>
            <div onClick={() => handleRemoveFile(files[0])}>
              <IconifyIcon
                icon="mdi:close"
                fontSize={20}
                className="cursor-pointer dark:text-white"
              />
            </div>
          </div>
        ) : !isLargeFile &&
          files[0]?.type?.startsWith("application/") &&
          updateImage?.value ? (
          <div className="w-full">
            <PreviewPdf item={files[0]} />
          </div>
        ) : isLargeFile ? (
          <div className="flex items-center p-2">
            <Icon
              path={mdiInformationOutline}
              size={0.7}
              className="text-[#80b3f0]"
            />
            <p className="text-[14px] px-1 py-0 text-[#80b3f0]">
              {t("Please upload a file no larger than 5MB")}
              {/* {textAccept ? textAccept : "png - jpg - pdf"} */}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default UploadDoc;
