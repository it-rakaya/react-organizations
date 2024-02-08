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

function TermsAndCondition({ checked, setChecked, hidden , style }) {
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
              جميع البيانات والمرفقات المدخلة من قبلكم صحيحة ومحدثة ولا تتحمل
              المنصة أدنى مسؤولية في حالة كونها غير صحيحة أو غير مطابقة.
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
              في حالة إرفاق ملف في غير محله لغرض مِلء المتطلبات لن يتم النظر
              إليه ولن يتم قبولكم في المنصة.
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
              يجب أن يكون مستخدم المنصة يقدم خدمات الإعاشة ومصرح له بذلك.
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
              يحق للمنصة الإطلاع على البيانات المرفقة من قبلكم وحفظها لديها
              لأغراض تطوير المنصة.
            </li>
            <li className="my-2 text-[15px] text-black dark:text-white">
              يخضع المسجل في المنصة لأحكامها وفي حالة تحديثها أو تعديلها سيتم
              إشعارك بذلك.
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
