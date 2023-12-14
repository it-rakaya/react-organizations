/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const ResendCode = ({
  available,
  timerStart,
  setAvailableResetCode,
  setTimerStarted,
}) => {
  const [remainingTime, setRemainingTime] = useState(60);

  useEffect(() => {
    if (timerStart) {
      const countdownInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime > 0) {
            setAvailableResetCode(false);

            return prevTime - 1;
          } else {
            clearInterval(countdownInterval);
            setAvailableResetCode(true);
            setTimerStarted(false);

            return prevTime;
          }
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    } else {
      setRemainingTime(60);
    }
  }, [setAvailableResetCode, timerStart, setTimerStarted]);

  return (
    <>
      <div className="flex justify-center gap-2 ">
        <button
          className={`font-[futuraMed,sans-serif] ${
            !available ? "text-[#777]" : "text-mainColorLand"
          } ${available ? "cursor-pointer" : "cursor-not-allowed"}`}
        >
          <p>إعادة إرسال الرمز بعد </p>
        </button>

        <span
          className={`text-center font-bold ${
            !available ? "text-[#777]" : "text-mainColorLand"
          }`}
        >
          {`${Math.floor(remainingTime / 60)}:${
            remainingTime % 60 < 10 ? "0" : ""
          }${remainingTime % 60}`}
        </span>
      </div>
    </>
  );
};

export default ResendCode;
