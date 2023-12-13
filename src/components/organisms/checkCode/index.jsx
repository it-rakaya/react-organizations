/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useState } from "react";
import { PinInput } from "react-input-pin-code";
import ResendCode from "../../molecules/Formik/ResendCode";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import { useTheme } from "@mui/material/styles";
export default function CheckCode({
  number,
  valuesForm,
  setValueOTP,
  sendOTP,
}) {
  const [values, setValues] = useState(["", "", "", ""]);
  const [availableResetCode, setAvailableResetCode] = useState(false);
  const [timerStarted, setTimerStarted] = useState(true);
  const [colorPinInput, setColorPinInput] = useState("");
  console.log("🚀 ~ file: index.jsx:18 ~ colorPinInput:", colorPinInput)
  const theme = useTheme();
  const [btnBgColor, setBtnBgColor] = useState("transparent");

  const { orgData } = UseOrg();

  const handleSendTime = () => {
    if (availableResetCode) {
      // CheckCodeAgain({
      //   email: formData.email,
      //   type: 'FORGET',
      // });
      sendOTP({ ...valuesForm, organization_id: orgData?.organizations?.id });

      // valuesForm;
      setTimerStarted(true);
    } else {
      return;
    }
  };
  return (
    <>
      <div className="lex ">
        <div className="flex flex-col items-center justify-center   gap-5  shadow-main bg-[#FFF] rounded-xl pt-0 p-10">
          <h1 className="font-bold">أدخل رمز التحقق </h1>
          <p className="text-center">
            رقم التحقق مطلوب لإكمال العملية لقد تم إرسال رمز التحقق في رسالة
            إليكم
          </p>
          <p>{number}</p>
          <div>
            <PinInput
              values={values}
              validBorderColor={colorPinInput}
              focusBorderColor={theme?.palette?.primary.main}
              borderColor={colorPinInput}
              inputStyle={{ userSelect: "none" }}
              placeholder="x"
              onChange={(value, index, values) => {
                setValues(values);
                if (number == values.join("")) {
                  setValueOTP(values.join(""));
                  setColorPinInput(theme?.palette?.primary.main);
                } else {
                  setColorPinInput("rgb(220,53,69)");
                }
              }}
              containerStyle={{ flexDirection: "row-reverse" }}
              inputClassName="focus:border-0 focus:border-red-200 selection:outline-none"
            />
          </div>
          <ResendCode
            available={availableResetCode}
            timerStart={timerStarted}
            setAvailableResetCode={setAvailableResetCode}
            setTimerStarted={setTimerStarted}
          />
          {availableResetCode && (
            <Button
              className={`!w-2/3 !rounded-md !border !border-solid hover:shadow-lg hover:!text-white`}
              style={{
                borderColor: theme?.palette?.primary.main,
                color: theme?.palette?.primary.main,
                backgroundColor: btnBgColor,
              }}
              onClick={handleSendTime}
              onMouseEnter={() => {
                setBtnBgColor(theme?.palette?.primary.main);
              }}
              onMouseLeave={() => {
                setBtnBgColor("transparent");
              }}
            >
              إعادة الإرسال
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
