/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useState } from "react";
import { PinInput } from "react-input-pin-code";
import { UseOrg } from "../../../context/organization provider/OrganizationProvider";
import { useIsRTL } from "../../../hooks/useIsRTL";
import ResendCode from "../../molecules/Formik/ResendCode";
export default function CheckCode({
  number,
  valuesForm,
  setValueOTP,
  sendOTP,
  userData,
  login,
}) {
  const [values, setValues] = useState(["", "", "", ""]);
  const [availableResetCode, setAvailableResetCode] = useState(false);
  const [timerStarted, setTimerStarted] = useState(true);
  const theme = useTheme();
  const [colorPinInput, setColorPinInput] = useState(
    theme?.palette?.primary?.main
  );
  const [btnBgColor, setBtnBgColor] = useState("transparent");
  const isRTL = useIsRTL();

  const { orgData } = UseOrg();

  const handleSendTime = () => {
    if (availableResetCode) {
      setAvailableResetCode(false)
      if (login) {
        sendOTP({
          ...valuesForm,
          organization_id: orgData?.organizations?.id,
        });
      } else {
        sendOTP({
          phone: userData?.phone,
          phone_code: userData?.phone_code,
          organization_id: orgData?.organizations?.id,
        });
      }

      setTimerStarted(true);
    } else {
      return;
    }
    setValues(["", "", "", ""]);
  };
  return (
    <>
      <div className="lex ">
        <div className="flex flex-col items-center justify-center   gap-5  shadow-main bg-[#FFF] rounded-xl  pt-5 dark:bg-inherit">
          <h1 className="text-xl font-bold dark:text-white">
            {t("Enter the verification code")}
          </h1>
          <p className="text-center dark:text-white">
            {t("The verification number is required to complete the process")}
          </p>
          <p className="text-center dark:text-white mt-[-10px]">
            {t("The verification code has been sent in a message To you")}
          </p>
          <p className="dark:text-white">{number}</p>
          <div>
            <PinInput
              values={values}
              validBorderColor={colorPinInput}
              focusBorderColor={theme?.palette?.primary.main}
              borderColor={colorPinInput}
              inputStyle={{
                userSelect: "none",
                border: `1px solid ${theme?.palette?.primary.main}`,
              }}
              placeholder="x"
              onChange={(value, index, values) => {
                setValues(values);
                if (values.join("").length == 4) {
                  setValueOTP(values.join(""));
                  setColorPinInput(theme?.palette?.primary?.main);
                } else {
                  // setColorPinInput("rgb(220,53,69)");
                }
              }}
              onComplete={(values) => {
                if (values.join("").length === 4) {
                  setColorPinInput(theme?.palette?.primary?.main);
                } else {
                  setColorPinInput("rgb(220,53,69)");
                }
              }}
              containerStyle={{
                flexDirection: "row-reverse",
                direction: isRTL ? "rtl" : "rtl",
              }}
              inputClassName={`!focus:border-1 !focus:border-[rgb(159,150,133)] selection:outline-none !border  rounded-[8px]`}
            />
          </div>
          {!availableResetCode && (
            <ResendCode
              available={availableResetCode}
              timerStart={timerStarted}
              setAvailableResetCode={setAvailableResetCode}
              setTimerStarted={setTimerStarted}
              setValues={setValues}
            />
          )} 
          {availableResetCode && (
            <Button
              className={`w-[160px] h-[40px] !rounded-md !border !border-solid hover:shadow-lg hover:!text-white dark:text-white`}
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
              {t("Resend the code")}
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
