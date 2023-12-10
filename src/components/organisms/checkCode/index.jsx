/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useState } from "react";
import { PinInput } from "react-input-pin-code";
import ResendCode from "../../molecules/Formik/ResendCode";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";

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
  const { orgData } = UseOrg();


  const handleSendTime = () => {
    if (availableResetCode) {
      // CheckCodeAgain({
      //   email: formData.email,
      //   type: 'FORGET',
      // });
      sendOTP({ ...valuesForm, organization_id:orgData?.organization?.id });

      // valuesForm;
      setTimerStarted(true);
    } else {
      return;
    }
  };
  console.log("number == values.join()", number == values.join(""));
  return (
    <>
      <div className="lex ">
        <div className="flex flex-col items-center justify-center   gap-5  shadow-main bg-[#FFF] rounded-xl p-10">
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
              focusBorderColor={"rgb(159,150,133 ,1)"}
              borderColor={colorPinInput}
              onChange={(value, index, values) => {
                console.log("🚀 ~ file: index.jsx:52 ~ values:", values)
                setValues(values);
                if (number == values.join("")) {
                  setValueOTP(values.join(""));
                  setColorPinInput("rgb(159,150,133 ,1)");
                } else {
                  console.log("false");
                  setColorPinInput("rgb(220,53,69)");
                }
              }}
              containerStyle={{ flexDirection: "row-reverse" }}
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
              className="!w-2/3 !text-primary !rounded-md !border !border-solid !border-primary hover:!bg-gold"
              onClick={handleSendTime}
            >
              إعادة الإرسال
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
