/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CheckIcon from "../atoms/icons/CheckIcon";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import UploadImageIcon from "../atoms/icons/UploadImageIcon";
import PreviewImage from "./PreviewImage";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";

const UploadImageTwo = ({ name, label, nameValue }) => {
  const { setFieldValue, values } = useFormikContext();
  const theme = useTheme();

  const [files, setFiles] = useState(
    values?.attachments ? [values?.attachments[nameValue]] : []
  );

  const [invalidFormat, setInvalidFormat] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ["image/*", ".pdf"],
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

  const hexToRGBA = (hex, opacity) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  const isLargeFile = files?.length && files[0]?.size > 524288000;
  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  return (
    <div className="relative ">
      <Box sx={files?.length ? { height: "" } : {}}>
        <div className="relative cursor-pointer">
          <div className="flex flex-col items-center bg-[#F5F5F5] rounded-md">
            <h2 className="bg-[#EFEFEF] w-full text-center px-3 py-2 rounded-md">
              {label}
            </h2>
            <div
              {...getRootProps({
                className:
                  "dropzone h-[150px] flex flex-col items-center justify-center",
              })}
            >
              {!files?.length ? (
                <div className="flex flex-col items-center justify-center py-5">
                  <input {...getInputProps()} name={name} />
                  <UploadImageIcon />
                </div>
              ) : invalidFormat ? (
                <TermsConditionIcon className={"w-[50px]"} />
              ) : (
                <div className="rounded-md">
                  {!isLargeFile && (
                    <div className="flex flex-col items-center justify-center py-5">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              )}
              <p className="flex items-end justify-center p-2 m-0 text-center">
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
            {!isLargeFile && files[0]?.type.startsWith("image/") ? (
              <div className="flex items-center justify-center w-full">
                <PreviewImage files={files ? files : []} bgMain={bgMain} />
              </div>
            ) : files[0]?.type.startsWith("application/") ? (
              <a
                href={URL.createObjectURL(files[0])}
                download={files[0].name}
                className="w-full"
              >
                <div
                  className="flex items-center justify-center w-full gap-2 p-2 cursor-pointer"
                  style={{
                    backgroundColor: bgMain,
                  }}
                >
                  <IconifyIcon icon={"mdi:file-pdf-box"} className="text-xl" />
                  <span className="text-sm">اضغط هنا لمشاهدة المرفق</span>
                </div>
              </a>
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
