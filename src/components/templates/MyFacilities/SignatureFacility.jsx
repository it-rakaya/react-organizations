/* eslint-disable react/prop-types */
import {
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import { t } from "i18next";
import TermsConditionIcon from "../../atoms/icons/TermsConditionIcon";
  
  function SignatureFacility({checked , setChecked}) {
  
    return (
      <div className="">
        <div className="flex flex-col items-center justify-center gap-5 ">
          <div className="">
            <TermsConditionIcon className={""} />
          </div>
          <h1 className="text-xl font-bold dark:text-white ">
            {t("Acknowledgment")}
          </h1>
        </div>
  
        <div className="main_content max-h-[450px] overflow-y-scroll scroll_main mt-5 px-3">
          <p className="text-center dark:text-white">
            {t(
              "The required information to be recorded is facility information and I promise to register it correctly"
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
                label={t("I agree with this acknowledgment")}
              />
            </RadioGroup>
          </FormControl>
        </div>

      </div>
    );
  }
  
  export default SignatureFacility;
  