/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types, no-unused-vars
import Icon from "@mdi/react";
import { mdiFileSearchOutline } from "@mdi/js";

function DataNotFound({ title }) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center gap-5"
      style={{ left: "calc(50% - 100px )", top: "calc(50% - 50px)" }}
    >
      <Icon path={mdiFileSearchOutline} className="dark:text-white" size={4} />
      <div className="mt-20 text-3xl font-bold md:m-0">{title}</div>
    </div>
  );
}

export default DataNotFound;
