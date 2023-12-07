import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
const Hero = () => {
  const navigate = useNavigate();
  const btnStyles =
    "basis-1/2 py-4 rounded-lg font-bold text-lg 3xl:text-2xl shadow";
  const { i18n, t } = useTranslation();
  const {orgData} = UseOrg()
  const language = i18n.language;
  return (
    <div className="px-3 lg:w-1/2 2xl:ps-56 2xl:px-80 xl:ps-12">
      <div dir={i18n.dir(language)}>
        {/* title */}
        <div className="flex flex-col items-center justify-between w-full gap-5 xl:flex-row-reverse xl:gap-0">
          <h1 className="px-6 py-1 border rounded-lg border-primaryText">
            Logo
          </h1>
          <h1 className="text-2xl font-bold text-primaryText 3xl:text-3xl">
            {orgData?.organizations?.name_ar}
          </h1>
        </div>
        {/* description */}
        <div className="mt-5 text-xl font-bold text-center text-primaryText md:text-start 3xl:text-2xl">
          {t("landing.description")}
        </div>
        <div className="flex flex-col gap-4 mt-10 xl:flex-row">
          <button
            onClick={() => navigate("/login")}
            className={`${btnStyles} text-white transition-shadow duration-300 hover:shadow-lg bg-primary`}
          >
            {t("landing.login")}
          </button>

          <button
            onClick={() => navigate("/register")}
            className={`${btnStyles} border-2 border-primary text-primary transition-shadow duration-300 hover:shadow-lg`}
          >
            {t("landing.register")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
