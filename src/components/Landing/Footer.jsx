import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import { getPrayerTime } from "../../utils/landing/prayerTimeCalc";
import { getTimeLeftToHajj } from "../../utils/landing/HajjTimeCalc";

const FooterComponent = ({ title, children, last = false }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <>
      <div
        className={`w-full h-28 ${!last ? "lg:border-r-2" : ""}`}
        dir={i18n.dir(lang)}
      >
        <div className="flex flex-col lg:justify-between items-center lg:h-full xl:px-20">
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="text-secondaryText font-bold 2xl:text-2xl">
              {title}
            </h1>
            <div className="">{children}</div>
          </div>
          <hr className="border-secondary border-0 lg:border-2 rounded-xl w-1/5" />
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
  const [timeLeft, setTimeLeft] = useState({months:'', days:'', hours:''})
  useEffect(() => {
    getPrayerTime(setNextPrayerTime, setPrayer);
    
    getTimeLeftToHajj(setTimeLeft)
  }, []);
  return (
    <div className="2xl:pe-[18%] 3xl:pe-[26%]">
      <div className="flex flex-col lg:flex-row w-full gap-3">
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
            {timeLeft.months+ " "} {t("landing.months")} {timeLeft.days+ " "} {t("landing.days")} {timeLeft.hours+" "}
            {t("landing.hours")}
          </h1>
        </FooterComponent>
        <FooterComponent
          title={`${t("landing.timeLeftTo")} ${t(`landing.prayers.${prayer}`)}`}
          last
        >
          <h1 className={`${textStyle} flex items-center gap-4 tracking-wider`}>
            {nextPrayerTime.hours} {t("landing.hrs")} {nextPrayerTime.minutes}{" "}
            {t("landing.minutes")}
            <Icon
              icon="mi:sunrise-alt"
              color="#CAB272"
              fontSize={32}
              fontWeight={1000}
            />
          </h1>
        </FooterComponent>
      </div>
    </div>
  );
};

export default Footer;
