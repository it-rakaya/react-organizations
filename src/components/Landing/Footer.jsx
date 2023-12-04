import React, { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const getPrayerTime = async ()=>{
  const response = await fetch('https://api.aladhan.com/v1/calendarByCity/2023/12?city=Makkah&country=Saudi%Arabia&method=04');
  const data =  (await response.json()).data;

  console.log(data[new Date().getDate()-1].timings.Dhuhur);
}

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
  
  useEffect(() => {
getPrayerTime()
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
            7 {t("landing.months")} 100 {t("landing.days")} 50{" "}
            {t("landing.hours")}
          </h1>
        </FooterComponent>
        <FooterComponent title={`${t("landing.timeLeftTo")}`} last>
          <h1 className={`${textStyle} flex items-center gap-4 tracking-wider`}>
            02 {t("landing.hrs")} 38 {t("landing.minutes")} 30{" "}
            {t("landing.seconds")}
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
