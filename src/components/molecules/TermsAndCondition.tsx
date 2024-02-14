import React, { useState } from "react";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";
import { UseOrg } from "../../context/organization provider/OrganizationProvider";
import { t } from "i18next";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

function TermsAndCondition({ checked, setChecked, hidden, style }) {
  const { orgData } = UseOrg();

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="">
          <TermsConditionIcon className={""} />
        </div>
        <h1 className="text-xl font-bold dark:text-white">
          {t("Terms and Conditions")}
        </h1>
      </div>

      {orgData?.organizations?.policies ? (
        <div
          className="mt-5 overflow-y-scroll main_content scroll_main"
          style={style}
          dangerouslySetInnerHTML={{
            __html: orgData?.organizations?.policies,
          }}
        ></div>
      ) : (
        <div className="main_content max-h-[300px] md:max-h-[350px] overflow-y-scroll scroll_main mt-5">
          <p className="font-semibold text-center dark:text-white">
            {t(
              "By agreeing to register on the platform, you acknowledge and accept the following terms and conditions:"
            )}
          </p>
          <ul className="mx-4 text-start">
            <li className="my-2 text-[15px] text-black dark:text-white">
             
              {t(
                "All data and attachments entered by you are accurate and up to date, and the platform bears no responsibility if they are incorrect or not matching"
              )}
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
             
              {t(
                "If a file is attached in the wrong place for the purpose of fulfilling the requirements, it will not be considered, and you will not be accepted on the platform."
              )}
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
              {t(
                "The platform user must be providing sustenance services and be authorized to do so."
              )}
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
           
              {t(
                "The platform has the right to view the data provided by you and save it for the purpose of developing the platform."
              )}
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
          
              {t(
                "The registered user on the platform is subject to its terms, and in case of their update or amendment, you will be notified of that."
              )}
            </li>
          </ul>
        </div>
      )}
      {hidden ? (
        ""
      ) : (
        <div className="flex justify-center mt-5 ">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              className=" dark:!text-white"
            >
              <FormControlLabel
                value="female"
                className="dark:!text-white TermsAndCondition"
                control={
                  <Radio
                    onClick={() => setChecked(!checked)}
                    checked={checked}
                    className="pt-0 pb-0 dark:!text-white"
                  />
                }
                label={t("I have read all terms and conditions")}
              />
            </RadioGroup>
          </FormControl>
        </div>
      )}
    </div>
  );
}

export default TermsAndCondition;
