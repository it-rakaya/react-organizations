import Hero from "../../components/Landing/Hero";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";
import Marquee from "../../components/Landing/Marquee";
import bg1 from "../../assets/bg1.png";
import bg2 from "../../assets/bg2.png";

function Landing() {
  return (
    <div className="relative w-screen overflow-hidden lg:h-screen" dir="ltr">
      <div className="w-screen h-full absolute flex justify-end z-[-10000]">
        <div className="relative w-full h-full">
          {/* big */}
          <img
            alt=""
            srcset={bg1}
            className="animated-box fixed md:absolute md:top-[-20%] lg:top-[-40%] xl:top-[-50%] 3xl:top-[-15%] 3xl:right-[-10%] right-[-20%] z-[-10000]"
          />
          {/* small */}
          <img
            alt=""
            srcset={bg2}
            className="animated-box fixed md:absolute top-[10%] xl:top-[20%] 3xl:top-[40%] right-8 pe-[10vw] z-[-10000]"
          />
        </div>
      </div>

      {/* KAABA  */}
      <div className="w-screen flex justify-end pe-[13%] xl:pe-[10%] 3xl:pe-[8%] my-12 xl:my-32 3xl:my-64 absolute">
        <div
          className="hidden lg:block w-[15vh] h-[15vh] xl:w-[25vh] xl:h-[25vh] rotate-45 overflow-hidden z-[-1000]"
          style={{ borderRadius: 30 }}
        >
          <div
            className="w-[200%] h-[200%] rotate-[-45deg] absolute top-[-45%] left-[-45%]"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1565019001609-0e34a6a22189?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
              // backgroundPosition:'center',
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>
      </div>
      {/* page content */}
      <Navbar />
      {/* content */}
      <div className="mt-[13%]">
        <Hero />
        <div className="my-20">
          <Footer />
        </div>
      </div>
      <Marquee>
        <h4 className="py-3 font-semibold text-white">
          All rights reserved &copy;
        </h4>
      </Marquee>
    </div>
  );
}

export default Landing;
