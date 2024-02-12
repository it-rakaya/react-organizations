/* eslint-disable react/prop-types */
import { t } from "i18next";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import Marquee from "./Marquee";
import { useEffect, useState } from "react";

function News() {
  const { orgData } = UseOrg();
  const [news, setNews] = useState(["landing.rights"]);

  const marqueeElementStyle =
    "py-3 font-semibold text-white flex flex-row gap-10";
  const organizationName = !orgData?.organizations?.name_ar
    ? t("landing.organizationName")
    : orgData?.organizations?.name_ar;
  useEffect(() => {
    setNews(["landing.rights"]);
    if (orgData?.organizations?.organization_news)
      orgData?.organizations?.organization_news.map((val) => {
        setNews((prev) => [...prev, val.new]);
      });
  }, [orgData]);
  return (
    <Marquee disabled={news.length <= 1}>
      <div
        className={`flex items-center ${
          news.length <= 1 ? "justify-center" : "justify-between"
        } w-screen`}
      >
        {news.map((val, index) => {
          return (
            <div key={index}> 
              {index != 0 && (
                <h4 className={`${marqueeElementStyle} px-2`}>|</h4>
              )}
              <h4 className={`${marqueeElementStyle} px-2`} key={index}>
                {index == 0 ? `${t("landing.rights")}` : val}{" "}
                {index == 0 && <>&copy;</>}{" "}
                {index == 0
                  ? `${t(
                      "landing.for"
                    )}${organizationName} ${new Date().getUTCFullYear()}`
                  : ""}
              </h4>
            </div>
          );
        })}
      </div>
    </Marquee>
  );
}

export default News;
