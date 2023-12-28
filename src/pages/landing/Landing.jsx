import { useTheme } from "@mui/material/styles";
import { t } from "i18next";
import { useEffect, useState } from "react";
import bg2 from "../../assets/bg2.png";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/Landing/Hero";
import Marquee from "../../components/Landing/Marquee";
import Navbar from "../../components/Landing/Navbar";
import Loading from "../../components/molecules/Loading";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

function Landing() {
  const { orgData, isLoading } = UseOrg();
  const [news, setNews] = useState(["landing.rights"]);
  const theme = useTheme();

  useEffect(() => {
    setNews(["landing.rights"]);
    if (orgData?.organizations?.organization_news)
      orgData?.organizations?.organization_news.map((val) => {
        setNews((prev) => [...prev, val.new]);
      });
  }, [orgData]);

  const marqueeElementStyle =
    "py-3 font-semibold text-white flex flex-row gap-10";
  const organizationName = !orgData?.organizations?.name_ar
    ? t("landing.organizationName")
    : orgData?.organizations?.name_ar;
    if (isLoading) return <Loading/> 
  return (
    <div className="relative w-screen overflow-hidden lg:h-screen" dir="ltr">
      <div className="w-screen h-full absolute flex justify-end z-[-10000]">
        <div className="relative w-full h-full ">
          {/* big */}
          <img
            alt=""
            srcSet={bg2}
            // src={orgData?.organizations?.background}
            className="animated-box absolute md:top-[-20%] lg:top-[-40%] xl:top-[-50%] 3xl:top-[-15%] 3xl:right-[-10%] right-[-20%] z-[-10000]"
          />
          {/* small */}
          <img
            alt=""
            srcSet={bg2}
            className="animated-box absolute top-[10%] xl:top-[20%] 3xl:top-[40%] right-8 pe-[10vw] z-[-10000]"
          />
        </div>
      </div>

      {/* KAABA  */}
      <div className="w-screen flex justify-end pe-[13%] xl:pe-[10%] 3xl:pe-[8%] my-12 xl:my-32 3xl:my-64 absolute z-[-1000]">
        <div
          className="hidden lg:block w-[15vh] h-[15vh] xl:w-[25vh] xl:h-[25vh] rotate-45 overflow-hidden z-[-1000]"
          style={{ borderRadius: 30 }}
        >
          <div
            className="w-[200%] h-[200%] rotate-[-45deg] absolute top-[-45%] left-[-45%]"
            style={{
              backgroundImage: `url('${orgData?.organizations?.background_image}')`,
              backgroundColor: theme?.palette?.primary?.main,
              backgroundSize: "cover",
              // backgroundPosition:'center',
              // backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      {/* page content */}
      <Navbar />
      {/* content */}
      <div className="pt-[13%]">
        <Hero />
        <div className="my-20">
          <Footer />
        </div>
      </div>
      {/* > 1 because news is always larger than 1 since it has All rights message */}
      <Marquee disabled={news.length <= 1}>
        <div
          className={`flex items-center ${
            news.length <= 1 ? "justify-center" : "justify-between"
          } w-screen`}
        >
          {news.map((val, index) => {
            return (
              <>
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
              </>
            );
          })}
        </div>
      </Marquee>
    </div>
    
  ) 
}

export default Landing;
