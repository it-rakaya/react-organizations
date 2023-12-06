/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CheckIcon from "../atoms/icons/CheckIcon";
import UploadImageIcon from "../atoms/icons/UploadImageIcon";
import PreviewImage from "./PreviewImage";
const UploadImage = ({ name, placeholder,  }) => {
  const { setFieldValue, errors  } = useFormikContext();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      // if (values[name] !== undefined) {
        setFieldValue(name, acceptedFiles[0]);
      // }
    },
  });

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
              style={{ cursor: "pointer", lineHeight: "46px" }}
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
                <div className="absolute top-[1px] right-[5px]">
                  <UploadImageIcon className={`w-[30px]`} />
                </div>
              ) : (
                <div className="absolute top-[1px] right-[5px]">
                  <CheckIcon className={`w-[25px]`} />
                </div>
              )}
            </div>
          </Box>

          {/* <div className="flex flex-col items-center gap-1 bg-[#F5F5F5]  rounded-md ">
            <h2 className="bg-[#EFEFEF] w-full text-center p-3 rounded-md">
              {label}
            </h2>
            {!files?.length ? (
              <UploadImageIcon />
            ) : (
              <img
                src={CheckUploadImageIcon}
                width={"40"}
                height={"40"}
                alt="check"
              />
              <div className="  rounded-[10px]">
                <PreviewImage files={files ? files : []} />
              </div>
            )}
            <p className="p-2 m-0 text-center">
              {files?.length
                ? "تم رفع الملف بنجاح"
                : " اختر ملف أو قم باسقاطه هنا "}
            </p>
          </div> */}
          {/* <div>
            <FormikError name={name} />
          </div> */}
        </Box>
        <div className="rounded-[10px] flex justify-start">
          <PreviewImage files={files ? files : []} />
        </div>
      </div>
    </>
  );
};

export default UploadImage;
