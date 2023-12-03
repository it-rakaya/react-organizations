/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useState } from "react";
import { PinInput } from "react-input-pin-code";
import ResendCode from "../../molecules/Formik/ResendCode";

export default function CheckCode({ number, valuesForm, setValueOTP }) {
  console.log("🚀 ~ file: index.jsx:12 ~ CheckCode ~ valuesForm:", valuesForm);
  const [values, setValues] = useState(["", "", "", ""]);
  const [availableResetCode, setAvailableResetCode] = useState(false);
  const [timerStarted, setTimerStarted] = useState(true);

  const handleSendTime = () => {
    if (availableResetCode) {
      // CheckCodeAgain({
      //   email: formData.email,
      //   type: 'FORGET',
      // });
      valuesForm;
      setTimerStarted(true);
    } else {
      return;
    }
  };

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
              onChange={(value, index, values) => {
                setValues(values);
                setValueOTP(values.join(''));
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
