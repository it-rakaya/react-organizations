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
    <div>
      <div className="relative w-screen lg:h-screen" dir="ltr">
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
        <div className="w-screen flex justify-end pe-[13%] xl:pe-[10%] 3xl:pe-[8%] my-18 xl:my-40 3xl:my-68 absolute z-[-1000]">
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
      </div>
      <News/>
    </div>
  );
}

export default Landing;
