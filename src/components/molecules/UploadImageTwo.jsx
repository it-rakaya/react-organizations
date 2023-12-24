/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useFormikContext } from "formik";
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
      setFieldValue(name, modifiedFiles[0]);
    },
  });

  const isLargeFile = files?.length && files[0]?.size > 524288000;
  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);
  console.log("files[0]?.file", files[0]?.file);

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
  };

  return (
    <div className="relative w-[250px] h-[125px] ">
      <Box sx={files?.length ? { height: "" } : {}}>
        <h2 className="w-full px-3 py-2 font-semibold text-center rounded-md ">
          {label}
          <span className="text-red-500">{isRequired ? "*" : ""}</span>{" "}
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
                  {!isLargeFile && (
                    <div className="flex flex-col items-center justify-center py-5">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              )}
              <p className="flex items-end justify-center p-2 m-0 text-center text-[14px]">
                {isLargeFile ? (
                  "حجم الملف كبير"
                ) : invalidFormat ? (
                  "صيغة الملف غير صالحة، يرجى اختيار ملف بصيغة PDF أو صورة"
                ) : files?.length ? (
                  <div className="flex flex-col items-center justify-center ">
                    <p>تم رفع الملف بنجاح</p>
                  </div>
                ) : (
                  " اختر ملف أو قم باسقاطه هنا "
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
            ) : files[0]?.type?.startsWith("image/") && updateImage?.value ? (
              <PreviewImageLink url={files[0]?.value} />
            ) : files[0]?.type?.startsWith("application/") && files[0]?.name ? (
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
                    {/* <span className="text-sm">اضغط هنا لمشاهدة المرفق</span> */}
                  </div>
                </a>
                <div onClick={() => handleRemoveFile(files[0])}>
                  <IconifyIcon icon="mdi:close" fontSize={20} />
                </div>
              </div>
            ) : files[0]?.type?.startsWith("application/") &&
              updateImage?.value ? (
              <div className="w-full">
                <PreviewPdf item={files[0]} />
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
