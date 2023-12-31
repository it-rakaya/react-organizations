import { useFormikContext } from "formik";
import { useDropzone } from "react-dropzone";
import UploadImageIcon from "../../atoms/icons/UploadImageIcon";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";
import Icon from "@mdi/react";
import { mdiInformationOutline } from "@mdi/js";
import { t } from "i18next";
import PreviewImage from "../PreviewImage";
import { hexToRGBA } from "../../../utils/helpers";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "../../atoms/icons/CheckIcon";
import IconifyIcon from "../../atoms/icons/IconifyIcon";
import { Typography } from "@mui/material";
import PreviewPdf from "../PreviewPdf";
import PreviewImageLink from "../PreviewImageLink";

function CardUploadImage(
  setInvalidFormat,
  modifyAccept,
  setFiles,
  dynamic,
  files,
  invalidFormat,
  textAccept,
  isLargeFile,
  className,
  updateImage,
  name
) {
  const theme = useTheme();

  const { setFieldValue } = useFormikContext();
  const bgMain = hexToRGBA(theme.palette.primary.main, 0.1);

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": modifyAccept ? modifyAccept : [".png", ".pdf", ".jpg"],
    },
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
      const isLarge = modifiedFiles[0]?.size > 5242880;

      setFiles(modifiedFiles);
      setFieldValue(
        dynamic ? `answers${name}` : name,
        isLarge ? null : modifiedFiles[0]
      );
    },
  });

  const handleRemoveFile = (file) => {
    const uploadedFiles = files;
    const filtered = uploadedFiles.filter((i) => i.name !== file.name);
    setFiles([...filtered]);
    setFieldValue(name, null);
  };
  return (
    <div className="relative w-full cursor-pointer">
      <div className="flex flex-col items-center ">
        <div
          {...getRootProps({
            className:
              "dropzone] flex flex-col items-center justify-center w-full h-[90px] gap-2 border border-dashed rounded-[20px] border-[#9f968575]",
          })}
        >
          {!files?.length ? (
            <div className="flex flex-col items-center justify-center ">
              <input {...getInputProps()} name={name} />
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
          <p className="flex items-end justify-center m-0 text-center text-[14px] ">
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

      {!files?.length && (
        <div className="flex items-center p-2">
          <Icon
            path={mdiInformationOutline}
            size={0.7}
            className="text-[#80b3f0]"
          />
          <p className="text-[14px] px-1 py-0 text-[#80b3f0]">
            يرجى رفع الملف بهذه الصيغة{" "}
            {textAccept ? textAccept : "png - jpg - pdf"}
          </p>
        </div>
      )}
      <div className="flex justify-start w-full rounded-md">
        {!isLargeFile &&
        files[0]?.type?.startsWith("image/") &&
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
          <PreviewImageLink url={files[0]?.value} />
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
        ) : !isLargeFile &&
          files[0]?.type?.startsWith("application/") &&
          updateImage?.value ? (
          <div className="w-full">
            <PreviewPdf item={files[0]} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CardUploadImage;
