import React from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const btnStyles =
    "basis-1/2 py-4 rounded-lg font-bold text-lg 3xl:text-2xl shadow";
  const { i18n, t } = useTranslation();
  const language = i18n.language;
  return (
    <div className="lg:w-1/2 px-3 2xl:ps-56 2xl:px-80 xl:ps-12">
      <div dir={i18n.dir(language)}>
      {/* title */}
        <div className="flex flex-col xl:flex-row justify-between items-center w-full gap-5 xl:gap-0">
          <h1 className="font-bold text-primaryText text-2xl 3xl:text-3xl">
            {t('landing.organizationName')}
          </h1>
          <h1 className="border border-primaryText px-6 py-1 rounded-lg">
            Logo
          </h1>
        </div>
        {/* description */}
        <div className="text-primaryText font-bold text-xl mt-5 text-center md:text-start 3xl:text-2xl">
          {t('landing.description')}
        </div>
        {/* btns */}
        <div className="flex flex-col xl:flex-row gap-4 mt-10">
          <button
            className={`${btnStyles} text-white transition-shadow duration-300 hover:shadow-lg bg-primary`}
          >
            {t('landing.login')}
          </button>
          <button
            className={`${btnStyles} border-2 border-primary text-primary transition-shadow duration-300 hover:shadow-lg`}
          >
            {t('landing.register')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
