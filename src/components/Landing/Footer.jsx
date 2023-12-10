/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import  { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTimeLeftToHajj } from "../../utils/landing/HajjTimeCalc";
import { getPrayerTime } from "../../utils/landing/prayerTimeCalc";

const FooterComponent = ({ title, children, last = false }) => {
  const {  i18n } = useTranslation();
  const lang = i18n.language;
  const theme = useTheme();

  return (
    <>
      <div
        className={`w-full h-28 ${!last ? "lg:border-r-2" : ""}`}
        dir={i18n.dir(lang)}
      >
        <div className="flex flex-col items-center lg:justify-between lg:h-full xl:px-20">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 
            style={{color:theme?.palette?.primary?.main}}
            className="font-bold 2xl:text-2xl">
              {title}
            </h1>
            <div className="">{children}</div>
          </div>
          <hr className="w-1/5 border-0 border-secondary lg:border-2 rounded-xl" />
        </div>
      </div>
    </>
  );
};

const textStyle = `text-primaryText font-semibold`;
const Footer = () => {
  const { t } = useTranslation();
  const [nextPrayerTime, setNextPrayerTime] = useState({
    hours: null,
    minutes: null,
  });
  const [prayer, setPrayer] = useState("");
  const [timeLeft, setTimeLeft] = useState({ months: "", days: "", hours: "" });
  useEffect(() => {
    getPrayerTime(setNextPrayerTime, setPrayer);

    getTimeLeftToHajj(setTimeLeft);
  }, []);
  return (
    <div className="2xl:pe-[18%] 3xl:pe-[26%]">
      <div className="flex flex-col w-full gap-3 lg:flex-row">
        <FooterComponent title={t("landing.userManual")}>
          <a href="">
            <h1 className={`${textStyle} flex items-center gap-2`}>
              {t("landing.downloadFile")}
              <Icon icon="ic:baseline-download" className="text-primaryText" />
            </h1>
          </a>
        </FooterComponent>
        <FooterComponent title={t("landing.remainingTimeToHajj")}>
          <h1 className={`${textStyle} tracking-wider`}>
            {timeLeft.months + " "} {t("landing.months")} {timeLeft.days + " "}{" "}
            {t("landing.days")} {timeLeft.hours + " "}
            {t("landing.hours")}
          </h1>
        </FooterComponent>
        <FooterComponent
          title={`${t("landing.timeLeftTo")} ${t(`landing.prayers.${prayer}`)}`}
          last
        >
          <h1 className={`${textStyle} flex items-center gap-4 tracking-wider`}>
            {nextPrayerTime?.hours} {t("landing.hrs")} {nextPrayerTime?.minutes}{" "}
            {t("landing.minutes")}
          </h1>
        </FooterComponent>
      </div>
    </div>
  );
};

export default Footer;
