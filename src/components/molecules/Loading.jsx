/* eslint-disable react/prop-types */

import { Oval } from "react-loader-spinner";
import { useTheme } from '@mui/material/styles'

function Loading({ title }) {
  const theme = useTheme()

  return (
    <div
      className="absolute flex flex-col items-center justify-center z-[999999999999] loading"
      style={{ left: "calc(50% - 100px )" , top:"calc(50% - 50px)" }}
    >
      <div>
        <Oval
          height="80"
          width="80"
          secondaryColor={theme?.palette?.primary?.main ||"#9F9685" }
          color={theme?.palette?.primary?.main ||"#9F9685" }

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
