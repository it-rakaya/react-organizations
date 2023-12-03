import React from "react";

const Hero = () => {
  const btnStyles = "basis-1/2 py-4 rounded-lg font-bold text-lg shadow";
  return (
    <div className="2xl:w-1/2 px-3 2xl:ps-56 2xl:px-80">
      {/* title */}
      <div className="flex flex-col xl:flex-row justify-between items-center w-full gap-5 xl:gap-0">
        <h1 className="border border-primaryText px-6 py-1 rounded-lg">Logo</h1>
        <h1 className="font-bold text-primaryText text-2xl">Organization Name</h1>
      </div>
      {/* description */}
      <div className="text-primaryText font-bold text-xl mt-5 text-center md:text-start">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, veritatis
        cupiditate! Et, suscipit nam! Ratione sunt quibusdam laudantium facere
        dolorum rerum facilis ipsum provident velit!
      </div>
      {/* btns */}
      <div className="flex flex-col xl:flex-row gap-4 mt-10">
        <button
          className={`${btnStyles} text-white transition-shadow duration-300 hover:shadow-lg bg-primary`}
        >
          Login
        </button>
        <button
          className={`${btnStyles} border-2 border-primary text-primary transition-shadow duration-300 hover:shadow-lg`}
     
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Hero;
