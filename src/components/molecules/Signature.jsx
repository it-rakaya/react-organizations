/* eslint-disable react/prop-types */
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { t } from "i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ButtonComp from "../atoms/buttons/ButtonComp";
import TermsConditionIcon from "../atoms/icons/TermsConditionIcon";

function Signature() {
  //   const { orgData } = UseOrg();
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="">
          <TermsConditionIcon className={""} />
        </div>
        <h1 className="text-xl font-bold dark:text-white ">
          {t("Endorsement")}
        </h1>
      </div>

      <div className="main_content max-h-[450px] overflow-y-scroll scroll_main mt-5">
        <p className="text-center dark:text-white">
          {t(
            "The data required to be recorded is the information of the facility owner and I promise Register it correctly"
          )}
        </p>
      </div>

      <div className="flex justify-center mt-5 ">
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              className="Signature"
              control={
                <Radio
                  onClick={() => setChecked(!checked)}
                  checked={checked}
                  className="pt-0 pb-0"
                />
              }
              label={t("I agree with this statement")}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="flex justify-center">
        <ButtonComp disabled={!checked} action={() => navigate("/register")} className={"!w-[173px]"}>
          {t("landing.register")}
        </ButtonComp>
      </div>
    </div>
  );
}

export default Signature;
