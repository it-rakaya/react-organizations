/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadImageIcon from "../atoms/icons/UploadImageIcon";
import PreviewImage from "./PreviewImage";
import { t } from "i18next";
const UploadImage = ({ name, label , placeholder }) => {
  const { setFieldValue , errors } = useFormikContext();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles.map((file) => Object.assign(file)));
      setFieldValue(name, acceptedFiles[0]);
    },
  });

  return (
    <>
      <div className="relative my-4 cursor-pointer">
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
              style={{ cursor: "pointer", lineHeight: "40px" }}
              className={`bg-white rounded-[10px] mt-3 relative
              cursor-pointer pr-2 h-[50px] border 
              text-[#4c4e6478]  border-[#4c4e6478)] w-full ${
                !!errors[name] && "border-red-500 "
              }`}
            >
              {files.length ? t("The file was downloaded successfully")  :placeholder}
              {!files.length && (
                <div className="absolute top-[10px] left-[10px]">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABnElEQVR4nO3Wv0/CQBQHcAYSI/6Ii5MaExxkMDFxckA6gXf3XotLdZAE7oc1QhyKC5v/unmVH2dp+dFSBsNLLmlayqf9vrtLS6Vd7aroYk/BFUczEKhHRQyOZgAgq3NwkehsvPXn4OJRHY1CYQDte546oiFc87w1mMDp3GGvx/8fpngJj9AsUTNUrWazc+D4/UM63srkYijr8d8w19wXCiMGc+gUR1lPj1h3AOQtY/KUsc89x/kut9vdEwB1w1G/LIXT0DQcXP0hhLpceh8z57lgGwdXd+nt6BxiUBGeanDUkoP+igZqKYRq0LXEP1oXHkN3vh/uj49rHM0wrQ0czRCxW9sIbD1AbdXJhXE8K0wRJr0pwPsZ9TQBD//EnhWmni5aNknXAMxDbhhAqXVhjlomwqsMx3HKdJ8dM8Wb9oDMip3uyfwhMFlCNpy4TsfVavcu7D5bkcnqOjjtTr+wlrmizlq0OeSaXFkrbTlR7LF4R5OYJ5tO7qJNYdUWPXrqeiNoDA8XoOHG0RkeVKh/wjU9ij9qgWt6dC4e7w84Oo2lZWHGCAAAAABJRU5ErkJggg==" />
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
              // <img
              //   src={CheckUploadImageIcon}
              //   width={"40"}
              //   height={"40"}
              //   alt="check"
              // />
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
      </div>
    </>
  );
};

export default UploadImage;
