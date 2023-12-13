/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CheckIcon from "../atoms/icons/CheckIcon";
import UploadImageIcon from "../atoms/icons/UploadImageIcon";
import PreviewImage from "./PreviewImage";
import { useTheme } from "@mui/material/styles";
import IconifyIcon from "../atoms/icons/IconifyIcon";
const UploadImage = ({ name, placeholder }) => {
  const { setFieldValue, errors } = useFormikContext();
  const [files, setFiles] = useState([]);
  const theme = useTheme();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ["image/*", ".pdf"],
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      // if (values[name] !== undefined) {
      setFieldValue(name, acceptedFiles[0]);
      // }
    },
  });
  const isLargeFile = files?.length && files[0]?.size > 524288000;
  const hexToRGBA = (hex, opacity) => {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };
  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  return (
    <>
      <div className="relative items-center gap-1 mt-3 cursor-pointer">
        <Box {...getRootProps({ className: "dropzone" })} cl>
          {/* <label> {label} </label> */}

          <input {...getInputProps()} className="cursor-pointer" />

          <Box
            sx={{
              display: "flex",
              flexDirection: ["column", "column", "row"],
              alignItems: "center",
            }}
          >
            <div
              style={{ cursor: "pointer", lineHeight: "52px" }}
              className={` rounded-[10px]  relative
              cursor-pointer pr-10 h-[56px] border 
              text-[#4c4e6478]  border-[#4c4e6478)] bg-[#ebebee73] w-full ${
                !!errors[name] && "border-red-500 "
              }`}
            >
              {files.length
                ? t("The file was downloaded successfully")
                : placeholder}
              {!files.length ? (
                <div className="absolute top-[3px] right-[5px]">
                  <UploadImageIcon className={`w-[30px]`} />
                </div>
              ) : (
                <div className="absolute top-[3px] right-[5px]">
                  <CheckIcon className={`w-[25px]`} />
                </div>
              )}
            </div>
          </Box>
        </Box>
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
                className="flex items-center w-full gap-2 p-2 cursor-pointer"
                style={{
                  backgroundColor: bgMain,
                }}
              >
                <IconifyIcon icon={"prime:file-pdf"} className="text-xl" />
                <span className="text-sm">اضغط هنا لمشاهدة المرفق</span>
              </div>
            </a>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default UploadImage;
