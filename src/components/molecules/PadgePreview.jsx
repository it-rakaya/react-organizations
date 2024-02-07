/* eslint-disable react/prop-types */
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";

export default function PadgePreview({ url, label }) {
  return (
    <div className="">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}

      >
        <a data-fancybox="gallery" href={url} className="text-[10px] text-white px-1 py-0 flex rounded-md ">
          {label}
        </a>
      </Fancybox>
    </div>
  );
}
