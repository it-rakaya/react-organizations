import { useTheme } from "@mui/material/styles";
import bg2 from "../../assets/bg2.png";
import Footer from "../../components/Landing/Footer";
import Hero from "../../components/Landing/Hero";
import Navbar from "../../components/Landing/Navbar";
import News from "../../components/Landing/News";
import Loading from "../../components/molecules/Loading";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";

function Landing() {
  const { orgData, isLoading } = UseOrg();
  const theme = useTheme();

  if (isLoading) return <Loading />;
  return (
    <div className="relative w-screen overflow-x-hidden lg:h-screen" dir="ltr">
      <div className="w-screen h-full absolute flex justify-end z-[-10000]">
        <div className="relative w-full h-full ">
          {/* big */}
          <img
            alt="bg_organization"
            srcSet={bg2}
            loading="lazy"
            // src={orgData?.organizations?.background}
            className="animated-box absolute md:top-[-20%] lg:top-[-40%] xl:top-[-50%] 3xl:top-[-15%] 3xl:right-[-10%] right-[-20%] z-[-10000]"
          />
          {/* small */}
          <img
            alt="bg_organization"
            srcSet={bg2}
            loading="lazy"
            className="animated-box absolute top-[10%] xl:top-[20%] 3xl:top-[40%] right-8 pe-[10vw] z-[-10000]"
          />
        </div>
      </div>

      {/* KAABA  */}
      <div className="w-screen flex justify-end pe-[13%] xl:pe-[10%] 3xl:pe-[8%]   lg:my-32 3xl:my-64 absolute z-[-1000]">
        <div
          className="hidden lg:block !w-[15vh] !h-[15vh] lg:!w-[19vh] lg:!h-[19vh] xl:!w-[25vh] xl:!h-[25vh]  !overflow-hidden bg-landing "
          style={{ borderRadius: 30 }}
        >
          <div
            className="!w-[200%] !h-[200%] rotate-[-45deg] absolute top-[-45%] left-[-45%]"
            style={{
              // backgroundImage: `url('${orgData?.organizations?.background_image}')`,
              backgroundColor: theme?.palette?.primary?.main,
              backgroundSize: "cover",
              // backgroundPosition:'center',
              // backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      {/* page content */}
      <Navbar className="fixed bg-[#F7F7F9]" />
      {/* content */}
      <div className="pt-[13%] mt-10 md:mt-0">
        <Hero />
        <div className="my-20">
          <Footer />
        </div>
      </div>
      {/* > 1 because news is always larger than 1 since it has All rights message */}
      <News />
    </div>
  );
}

export default Landing;
