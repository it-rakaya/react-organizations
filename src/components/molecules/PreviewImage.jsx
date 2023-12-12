/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";
import IconifyIcon from "../atoms/icons/IconifyIcon";

export default function PreviewImage({ files , bgMain }) {
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
        {imageUrls.map((url, index) => (
          <a key={index} data-fancybox="gallery" href={url} className="w-full">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="w-full rounded-xl">
                <div
                  className="flex items-center justify-center w-full gap-2 p-2 cursor-pointer "
                  style={{
                    backgroundColor: bgMain,
                  }}
                >
                  <IconifyIcon icon={"bi:image-fill"} className="text-xl" />
                  <span className="text-sm">اضغط هنا لمشاهدة  المرفق
                  </span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </Fancybox>
    </div>
  );
}
