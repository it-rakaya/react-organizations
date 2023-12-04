import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const btnStyles = "basis-1/2 py-4 rounded-lg font-bold text-lg shadow";
  return (
    <div className="px-3 2xl:w-1/2 2xl:ps-56 2xl:px-80">
      {/* title */}
      <div className="flex flex-col items-center justify-between w-full gap-5 xl:flex-row xl:gap-0">
        <h1 className="px-6 py-1 border rounded-lg border-primaryText">Logo</h1>
        <h1 className="text-2xl font-bold text-primaryText">
          Organization Name
        </h1>
      </div>
      {/* description */}
      <div className="mt-5 text-xl font-bold text-center text-primaryText md:text-start">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, veritatis
        cupiditate! Et, suscipit nam! Ratione sunt quibusdam laudantium facere
        dolorum rerum facilis ipsum provident velit!
      </div>
      {/* btns */}
      <div className="flex flex-col gap-4 mt-10 xl:flex-row">
        <button
          onClick={() => navigate("/login")}
          className={`${btnStyles} text-white transition-shadow duration-300 hover:shadow-lg bg-primary`}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/register")}
          className={`${btnStyles} border-2 border-primary text-primary transition-shadow duration-300 hover:shadow-lg`}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Hero;
