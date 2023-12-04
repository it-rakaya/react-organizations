import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

function filterPrayerTimes(prayerTimes) {
  const filteredPrayers = {};

  for (const prayer of PRAYERS) {
    if (prayerTimes.hasOwnProperty(prayer)) {
      filteredPrayers[prayer] = prayerTimes[prayer];
    }
  }

  return filteredPrayers;
}

function calculateTimeLeftUntilNextPrayer(prayerTimes) {
  prayerTimes = filterPrayerTimes(prayerTimes);
  // Get the current date and time
  const now = new Date();

  let nextPrayer = null;
  for (const key in prayerTimes) {
    const prayerHour = parseInt(prayerTimes[key].substring(0, 2));
    const prayerMin = parseInt(prayerTimes[key].substring(3, 5));
    const prayer = new Date();
    prayer.setHours(prayerHour, prayerMin);
    if (prayer >= now) {
      nextPrayer = prayer;
      break;
    }
  }

  // Calculate the time difference
  const timeDifference = Math.abs(nextPrayer - now);
  console.log(timeDifference);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
}

const getPrayerTime = async (setNextPrayerTime) => {
  console.log(new Date().getFullYear(), new Date().getDate());
  const response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${new Date().getFullYear()}/${new Date().getMonth()}?city=Makkah&country=KSA&method=4`
  );
  const data = (await response.json()).data;

  setNextPrayerTime(calculateTimeLeftUntilNextPrayer(data[new Date().getDate() - 1].timings))
};

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
  const [nextPrayerTime, setNextPrayerTime] = useState({hours:null, minutes:null})
  useEffect(() => {
    getPrayerTime(setNextPrayerTime);
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
            {nextPrayerTime.hours} {t("landing.hrs")} {nextPrayerTime.minutes} {t("landing.minutes")}
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
