/* eslint-disable react/prop-types */
import IconifyIcon from "../atoms/icons/IconifyIcon";
import ViewICon from "../atoms/icons/ViewICon";

function PreviewPdf({ item, eyeIcon  }) {

  return (
    <div>
      <a
        href={item?.value}
        download={item?.value}
        className=""
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={` flex items-center w-full  p-2  cursor-pointer rounded-md  `}
        >
          {eyeIcon ? (
            // <Icon path={mdiEyeOutline} size={1} className="text-black dark:text-white " />
            <ViewICon className="dark:text-white" />
          ) : (
            <IconifyIcon
              icon={"prime:file-pdf"}
              className="text-3xl text-black dark:text-white "
            />
          )}
        </div>
      </a>
    </div>
  );
}

export default PreviewPdf;
