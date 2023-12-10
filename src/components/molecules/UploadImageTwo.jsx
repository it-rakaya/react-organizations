/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import CheckIcon from "../atoms/icons/CheckIcon";
import PdfIcon from "../atoms/icons/PdfIcon";
import UploadImageIcon from "../atoms/icons/UploadImageIcon";
import PreviewImage from "./PreviewImage";

const UploadImageTwo = ({ name, label, nameValue }) => {
  const { setFieldValue, values } = useFormikContext();

  const [files, setFiles] = useState(
    values?.attachments ? [values?.attachments[nameValue]] : []
  );
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: ["image/*", ".pdf"],
    onDrop: (acceptedFiles) => {
      const modifiedFiles = acceptedFiles.map((file) => {
        if (file.type === "application/pdf") {
          const modifiedFile = new File([file], `PDF_${file.name}`, {
            type: file.type,
          });
          return modifiedFile;
        }
        return file;
      });

      setFiles(modifiedFiles);
      setFieldValue(name, modifiedFiles[0]);
    },
  });

  const isLargeFile = files?.length && files[0]?.size > 524288000;

  return (
    <div className="relative ">
      <Box sx={files?.length ? { height: "" } : {}}>
        <div className="relative cursor-pointer">
          <div className="flex flex-col items-center bg-[#F5F5F5] rounded-md">
            <h2 className="bg-[#EFEFEF] w-full text-center px-3 pt-2 rounded-md">
              {label}
            </h2>
            <div {...getRootProps({ className: "dropzone h-[150px]" })}>
              {!files?.length ? (
                <div className="flex flex-col items-center justify-center py-5">
                  <input {...getInputProps()} name={name} />
                  <UploadImageIcon />
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
              <p className="flex items-end justify-center p-2 m-0 text-center">
                {isLargeFile ? (
                  "حجم الملف كبير"
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
          <div className="flex justify-start w-full rounded-md ">
            {!isLargeFile && files[0]?.type.startsWith("image/")? (
              <div className="flex justify-start">
                <PreviewImage files={files ? files : []} />
              </div>
            ) : files[0]?.type.startsWith("application/") ? (
              <a
                href={URL.createObjectURL(files[0])}
                download={files[0].name}
                className=""
              >
                <PdfIcon />
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
