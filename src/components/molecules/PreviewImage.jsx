/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import IconifyIcon from "../atoms/icons/IconifyIcon";

export default function PreviewImage({ files , bgMain }) {
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
          <a key={index} data-fancybox="gallery" href={url} className="w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full rounded-xl">
                <div
                  className="flex items-center justify-center gap-2 p-2 cursor-pointer jus -full "
                  style={{
                    backgroundColor: bgMain,
                  }}
                >
                  {/* <PreviewIcon stroke="#292D32" /> */}
                  <IconifyIcon icon={"iconamoon:file-image-light"} className="text-xl" />

                  <span className="text-sm">اضغط هنا لمشاهدة  المرفق</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </Fancybox>
    </div>
  );
}
