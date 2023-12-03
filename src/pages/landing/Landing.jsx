import Hero from "../../components/Landing/Hero";
import Navbar from "../../components/Landing/Navbar";
import Footer from "../../components/Landing/Footer";
import Marquee from "../../components/Landing/Marquee";
import backgroundImage from "../../assets/background.png";
function Landing() {
  return (
    <div className="w-screen h-screen overflow-hidden px-5 relative">
      <img
        src={backgroundImage}
        alt=""
        className="absolute overflow-hidden lg:top-[-70%] 2xl:top-[-65%] top-[-0%] right-[-40%] lg:right-[-20%] z-[-1000] 3xl:top-[-50%]"
      />
      {/* KAABA  */}
      <div className="w-screen flex justify-end lg:pe-[10%] 3xl:pe-[5%] 2xl:my-32 absolute 3xl: ">
        <div
          className="hidden 2xl:block w-[25vh] h-[25vh] rotate-45 overflow-hidden z-[-1000]"
          style={{ borderRadius: 30 }}
        >
          <div
            className="w-[200%] h-[200%] rotate-[-45deg] absolute top-[-50%] left-[-50%]"
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
      <div className="pt-[13%]">
        <Hero />
        <div className="my-20">
          <Footer />
        </div>
      </div>
      <Marquee>
        <h4 className="text-[#1d1d1d] font-semibold">
          All rights reserved &copy;
        </h4>
      </Marquee>
    </div>
  );
}

export default Landing;
