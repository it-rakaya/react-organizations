import React from "react";
import { Icon } from "@iconify/react";

const FooterComponent = ({ title, children, last=false }) => {
  return (
    <>
      <div className={`w-full h-28 ${!last?'lg:border-r-2':""}`}>
        <div className="flex flex-col lg:justify-between items-center lg:h-full lg:px-20">
          <div className="text-center flex flex-col items-center gap-4">
            <h1 className="text-secondaryText font-bold">{title}</h1>
            <div className="">{children}</div>
          </div>
          <hr className="border-secondary border-0 lg:border-2 rounded-xl w-1/5" />
        </div>
      </div>
    </>
  );
};

//todo: make it one place !

const textStyle = `text-primaryText font-semibold`;
const Footer = () => {
  return (
    <div className="xl:pe-[18%]">
      <div className="flex flex-col lg:flex-row w-full gap-3">
        <FooterComponent title={"User Manual"}>
          <a href="">
            <h1 className={`${textStyle} flex items-center gap-2`}>
              Download file{" "}
              <Icon icon="ic:baseline-download" className="text-primaryText" />
            </h1>
          </a>
        </FooterComponent>
        <FooterComponent title={"Remaining Time to Hajj"}>
          <h1 className={textStyle}>7 Months 100 Days 50 Hours</h1>
        </FooterComponent>
        <FooterComponent title={"Time left to Dhuhur Prayer"} last>
          <h1 className={`${textStyle} flex items-center gap-4`}>02 Hours 38 min 30 sec <Icon icon="mi:sunrise-alt"  color="#CAB272" fontSize={28} fontWeight={1000} /></h1>
        </FooterComponent>
      </div>
    </div>
  );
};

export default Footer;
