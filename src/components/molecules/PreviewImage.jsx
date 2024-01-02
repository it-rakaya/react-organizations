/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import IconifyIcon from "../atoms/icons/IconifyIcon";
import { Typography } from "@mui/material";

export default function PreviewImage({
  files,
  bgMain,
  className,
  handleRemoveFile,
}) {
  // Extract the URLs from the files array
  const imageUrls = files?.map((file) => URL.createObjectURL(file));

  return (
    <div className="w-full">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        {imageUrls?.map((url, index) => (
          <div
            key={index}
            className="mt-4 flex items-center px-5 border border-solid rounded-[12px] border-[#9f968575]"
          >
            <a data-fancybox="gallery" href={url} className="w-full">
              <div className="flex flex-col items-center justify-center w-full">
                <div className="w-full rounded-xl">
                  <div
                    className={`flex items-center justify-start gap-2 p-2 cursor-pointer  py-4  `}
                  >
                    <IconifyIcon
                      icon={"iconamoon:file-image-light"}
                      className="text-xl dark:text-white"
                    />
                    <Typography className="file-name">
                      {files[0]?.name.slice(0, 15)}
                    </Typography>
                  </div>
                </div>
              </div>
            </a>
            <div onClick={() => handleRemoveFile(files[0])}>
              <IconifyIcon icon="mdi:close" fontSize={20} className="dark:text-white" />
            </div>
          </div>
        ))}
      </Fancybox>
    </div>
  );
}
