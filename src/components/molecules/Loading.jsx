/* eslint-disable react/prop-types */

import { Bars } from "react-loader-spinner";

function Loading({ title }) {
  return (
    <div
      className="absolute flex flex-col items-center justify-center "
      style={{ left: "calc(50% - 100px )" , top:"calc(50% - 50px)" }}
    >
      <div>
        <Bars
          height="80"
          width="80"
          color="#5A5FE0"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      <div> {title ? title : "جاري التحميل ..."} </div>
    </div>
  );
}

export default Loading;
