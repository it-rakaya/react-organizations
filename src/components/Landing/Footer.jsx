/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { calculateHajjRemainingTimeFormatted } from "../../utils/helpers";
import { getPrayerTime } from "../../utils/landing/prayerTimeCalc";

const FooterComponent = ({ title, children, last = false }) => {
  const { i18n } = useTranslation();
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
              style={{ color: theme?.palette?.primary?.main }}
              className="font-bold 2xl:text-2xl"
            >
              {title}
            </h1>
            <div className="">{children}</div>
          </div>
          <hr
            className="w-1/5 border-0 lg:border-2 rounded-xl"
            style={{ borderColor: theme?.palette?.primary?.main }}
          />
        </div>
      </div>
    </>
  );
};

const textStyle = `font-semibold`;
const Footer = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    daysRemaining: 0,
    monthsRemaining: 0,
  });
  useEffect(() => {
    setTimeRemaining(calculateHajjRemainingTimeFormatted());
  }, []);
  const { t } = useTranslation();
  const { orgData } = UseOrg();
  const [nextPrayerTime, setNextPrayerTime] = useState({
    hours: null,
    minutes: null,
  });
  const [prayer, setPrayer] = useState("");
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        await getPrayerTime(setNextPrayerTime, setPrayer);
      } catch (error) {
        console.error("Failed to fetch prayer times:", error);
      }
    };

    fetchPrayerTimes();
  }, []);

  return (
    <div className="2xl:pe-[18%] 3xl:pe-[26%]">
      <div className="flex flex-col w-full gap-3 lg:flex-row">
        {orgData?.organizations?.profile_file ? (
          <FooterComponent title={t("landing.userManual")}>
            <a
              href={orgData?.organizations?.profile_file}
              download={orgData?.organizations?.profile_file}
              className="cursor-pointer"
              target="_blank"
              rel="noreferrer"
            >
              <h1
                className={`${textStyle} flex items-center gap-2 dark:text-white`}
              >
                {t("landing.downloadFile")}
                <Icon icon="ic:baseline-download" className="" />
              </h1>
            </a>
          </FooterComponent>
        ) : (
          <div></div>
        )}
        <FooterComponent title={t("landing.remainingTimeToHajj")}>
          <h1 className={`${textStyle} tracking-wider dark:text-white`}>
            {timeRemaining.monthsRemaining + " "} {t("landing.months")}{" "}
            {timeRemaining.daysAfterMonths + " "} {t("landing.days")}{" "}
            {timeRemaining.hoursRemaining + " "}
            {t("landing.hours")}
          </h1>
        </FooterComponent>
        {/* {!!nextPrayerTime.hours && ( */}
        <FooterComponent
          title={`${t("landing.timeLeftTo")} ${t(`landing.prayers.${prayer}`)}`}
          last
        >
          <h1
            className={`${textStyle} flex items-center gap-4 tracking-wider dark:text-white`}
          >
            {nextPrayerTime?.hours} {t("landing.hrs")} {nextPrayerTime?.minutes}{" "}
            {t("landing.minutes")}
          </h1>
        </FooterComponent>
        {/* )} */}
      </div>
    </div>
  );
};

export default Footer;
