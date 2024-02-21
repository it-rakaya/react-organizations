/* eslint-disable react/prop-types */
import { t } from "i18next";
import Heart from "../components/atoms/icons/Heart";

const Footer = () => {

  return (
    <div className=" w-[100%]  mt-5 rounded-md ">
      <div className="w-[98%] overflow-hidden m">
        <div
          className={` flex  justify-center  md:flex-row items-center  p-2 gap-1`}
        >
          <h2 className="text-[7px] md:text-[14px]  text-center text-black dark:text-white">
            {t(`All rights reserved`)}
          </h2>
          <span>
            <Heart />
          </span>
          <span className="text-[7px] md:text-[14px]  text-center text-black dark:text-white">
            {t("at Rakaya Management and Food Consulting Company")}
          </span>
          {/* <span>©</span> */}
          <span className="text-black dark:text-white" dangerouslySetInnerHTML={{ "__html": "&copy;" }} />
          <span className="text-[7px] md:text-[14px]  text-center text-black dark:text-white">
            {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
