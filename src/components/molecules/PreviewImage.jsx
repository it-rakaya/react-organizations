/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import PreviewIcon from "../atoms/icons/PreviewIcon";
import Fancybox from "./Fancybox";

export default function PreviewImage({ files }) {
  // Extract the URLs from the files array
  const imageUrls = files?.map((file) => URL.createObjectURL(file));

  return (
    <div>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        {imageUrls.map((url, index) => (
          <a key={index} data-fancybox="gallery" href={url}>
            {/* <img
              width={20}
              height={20}
              alt={files[index].name}
              className='w-[400px] p-2 rounded-md single-file-image'
              src={url}
            /> */}
            <div className="flex flex-col items-center justify-center mt-3">
              {/* <span className="text-[10px] p-0 m-0">{t("preview")}</span> */}
              <div className="bg-[#f6f6f7] rounded-xl">
                <div className="flex flex-col items-center justify-center p-2 cursor-pointer ">
                  <PreviewIcon stroke="#292D32" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </Fancybox>
    </div>
  );
}
