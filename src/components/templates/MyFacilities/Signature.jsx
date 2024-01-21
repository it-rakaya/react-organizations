/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { GridDeleteIcon } from "@mui/x-data-grid";
import { useFormikContext } from "formik";
import { t } from "i18next";
import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import ButtonComp from "../../atoms/buttons/ButtonComp";

function Signature({ name }) {
  const { setFieldValue , values } = useFormikContext();
  const [trimmedDataURL, setTrimmedDataURL] = useState(values[name]);
  const sigPad = useRef(null);

  const clear = () => {
    sigPad.current.clear();
  };

  const trim = () => {
    const trimmedCanvas = sigPad.current.getTrimmedCanvas();
    const dataURL = trimmedCanvas.toDataURL("image/png");
    const blob = dataURLtoBlob(dataURL);
    const file = new File([blob], "signature.png", { type: "image/png" });
    setFieldValue(name, file);
    setTrimmedDataURL(dataURL);
  };
  const dataURLtoBlob = (dataURL) => {
    const byteString = atob(dataURL.split(",")[1]);
    const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className={"  w-full p-5 rounded-2xl"}>
      <div className={"w-full flex "}>
        <SignaturePad
          canvasProps={{ className: "w-full h-full border" }}
          ref={sigPad}
        />
      </div>
      <div className="flex justify-end w-full">
        <div className="flex items-center my-3 ">
          <Button  onClick={clear}>
            {/* {t("Clear")} */}
            <GridDeleteIcon  />
          </Button>
          <ButtonComp className={"m-0"} variant="contained"  action={trim}>
            {t("Done")}
          </ButtonComp>
        </div>
      </div>
      <div className="border">
        {trimmedDataURL ? (
          <img className={""} src={trimmedDataURL} alt="Signature" />
        ) : null}
      </div>
    </div>
  );
}

export default Signature;
