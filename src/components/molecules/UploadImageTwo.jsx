/* eslint-disable react/prop-types */
import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { hexToRGBA } from "../../utils/helpers";
import CheckIcon from "../atoms/icons/CheckIcon";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";
import UploadImageIcon from "../atoms/icons/UploadImageIcon";
import PreviewImage from "./PreviewImage";
import PreviewImageLink from "./PreviewImageLink";
import PreviewPdf from "./PreviewPdf";

const UploadImageTwo = ({
  name,
  label,
  nameValue,
  className,
  value,
  accept,
  isRequired,
  setShow,
  showIcon,
  setIndex,
  index,
}) => {
  const modifyAccept = accept?.map((item) => `.${item}`);

  const updateImage = {
    value: value,
    type: value?.endsWith(".pdf") ? "application/pdf" : "image/",
    update: true,
  };

  const { setFieldValue, values } = useFormikContext();
  const theme = useTheme();

  const [files, setFiles] = useState(
    values?.attachments
      ? [values?.attachments[nameValue]]
      : value
      ? [updateImage]
      : []
  );

  const [invalidFormat, setInvalidFormat] = useState(false);
  const isLargeFile = files?.length && files[0]?.size > 5242880;
  console.log("🚀 ~ file: UploadImageTwo.jsx:54 ~ isLargeFile:", isLargeFile);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ["image/*", modifyAccept],
    onDrop: (acceptedFiles) => {
      const modifiedFiles = acceptedFiles.map((file) => {
        if (file.type === "application/pdf" || file.type.startsWith("image/")) {
          setInvalidFormat(false);
          if (file.type === "application/pdf") {
            const modifiedFile = new File([file], `PDF_${file.name}`, {
              type: file.type,
            });
            return modifiedFile;
          }
          return file;
        } else {
          setInvalidFormat(true);
        }
        return file;
      });
      setFiles(modifiedFiles);
      if (isLargeFile) {
        setFieldValue(name, null);
      } else {
        setFieldValue(name, modifiedFiles[0]);
      }
    },
  });

  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
    setFieldValue(name, null);
  };

  return (
    <div className="relative w-[250px] h-[125px] ">
      <Box sx={files?.length ? { height: "" } : {}}>
        <h2 className="flex justify-center w-full px-3 py-2 m-auto font-semibold text-center rounded-md ">
          {label}
          <span className="text-red-500">{isRequired ? "*" : ""}</span>{" "}
          {showIcon && !files?.length &&  (
            <div
              className="mr-2 w-fit"
              onMouseEnter={() => {
                setShow(true);
                setIndex(index);
              }}
            >
              <Icon path={mdiInformationOutline} size={0.7} />
            </div>
          )}
        </h2>
        <div className="relative cursor-pointer border border-dashed rounded-[20px] border-[#9f968575] w-[250px] h-[125px]">
          <div className="flex flex-col items-center ">
            <div
              {...getRootProps({
                className:
                  "dropzone] flex flex-col items-center justify-center",
              })}
            >
              {!files?.length ? (
                <div className="flex flex-col items-center justify-center py-5">
                  <input {...getInputProps()} name={name} />
                  <UploadImageIcon />
                </div>
              ) : invalidFormat ? (
                <div className="flex flex-col items-center justify-center">
                  <TermsConditionIcon className={"w-[45px] "} />
                </div>
              ) : (
                <div className="rounded-md">
                  {!isLargeFile ? (
                    <div className="flex flex-col items-center justify-center py-5">
                      <CheckIcon />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-5">
                      <TermsConditionIcon className={"w-[47px] h-[47px] "} />
                    </div>
                  )}
                </div>
              )}
              <p className="flex items-end justify-center p-2 m-0 text-center text-[14px]">
                {isLargeFile ? (
                  t("File size is large")
                ) : invalidFormat ? (
                  t("Invalid file format, please choose a PDF or image file")
                ) : files?.length ? (
                  <div className="flex flex-col items-center justify-center ">
                    <p> {t("The file has been uploaded successfully")}</p>
                  </div>
                ) : (
                  t("Choose a file or drop it here")
                )}
              </p>
            </div>
          </div>
          <div className="flex justify-start w-full rounded-md">
            {!isLargeFile &&
            files[0]?.type?.startsWith("image/") &&
            files[0]?.path ? (
              <div className="flex items-center justify-center w-full">
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
              <PreviewImageLink url={files[0]?.value} />
            ) : !isLargeFile &&
              files[0]?.type?.startsWith("application/") &&
              files[0]?.name ? (
              <div className="mt-4 border border-solid rounded-[12px] border-[#9f968575] w-full flex items-center px-5">
                <a
                  href={URL.createObjectURL(files[0])}
                  download={files[0].name}
                  className="w-full"
                >
                  <div
                    className={` flex items-center  !justify-start gap-2  py-4 cursor-pointer  `}
                  >
                    <IconifyIcon icon={"prime:file-pdf"} className="text-xl" />
                    <Typography className="file-name">
                      {files[0]?.name.slice(0, 15)}
                    </Typography>
                  </div>
                </a>
                <div onClick={() => handleRemoveFile(files[0])}>
                  <IconifyIcon icon="mdi:close" fontSize={20} />
                </div>
              </div>
            ) : !isLargeFile &&
              files[0]?.type?.startsWith("application/") &&
              updateImage?.value ? (
              <div className="w-full">
                <PreviewPdf item={files[0]} />
              </div>
            ) : isLargeFile ? (
              <div>
                <p className="text-[14px] p-2">
                  {t("Please upload a file no larger than 5 MP")}
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default UploadImageTwo;
