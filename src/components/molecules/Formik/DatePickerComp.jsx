/* eslint-disable react/prop-types */
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { format } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import moment from 'moment';
// import 'moment-hijri';
// import 'moment/locale/ar-sa';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns/AdapterDateFns";
import ar from "date-fns/locale/ar-SA";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { useTranslation } from "react-i18next";
import { convertArabicToEnglish } from "../../../utils/helpers";
import CardInfo from "../CardInfo";
import Label from "../Label";
import { FormikError } from "./FormikError";
import CustomInput from "./PickersCustomInput";
import { toHijri } from "hijri-converter";
// import 'moment-jalaali';

import DatePickerWrapper from ".";
import { Box } from "@mui/material";
export default function DatePickerComp({
  name,
  name_hj,
  label,
  required,
  showIcon,
  setShow,
  setIndex,
  index,
  messageInfo,
  images,
}) {
  const { setFieldValue, values } = useFormikContext();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);
  const [date, setDate] = useState(
    values[name] ? new Date(values[name]) : null
  );
  const { t } = useTranslation();
  const { i18n } = useTranslation();
  const langObj = { ar };
  const [year, setYear] = useState(new Date());
  const [month, setMonth] = useState(new Date());
  const [monthYear, setMonthYear] = useState(new Date());

  useEffect(() => {
    if (date) {
      const hijri = toHijri(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      const formattedHijriDate = `${hijri.hy}-${hijri.hm
        .toString()
        .padStart(2, "0")}-${hijri.hd.toString().padStart(2, "0")}`;
      setFieldValue(name_hj, formattedHijriDate);
      setValueHijri(formattedHijriDate);
    }
  }, [date, setFieldValue, name_hj]);

  registerLocale(i18n.language, langObj[i18n.language]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="w-full">
          <Label>
            {label}
            <span className="mx-1 text-red-500">
              {required == "1" ? "*" : ""}
            </span>
          </Label>
          {showIcon && (
            <CardInfo
              index={index}
              setIndex={setIndex}
              messageInfo={messageInfo}
              setShow={setShow}
              images={images}
            />
          )}
          <DatePickerWrapper>
         
                <DatePicker
                  showYearDropdown
                  showMonthDropdown
                  className="bg-white dark:bg-dark-primary rounded-[10px] w-full ]"
                  selected={date}
                  id="month-year-dropdown"
                  // placeholderText="MM-DD-YYYY"
                  placeholderText="MM/DD/YYYY"
                  locale={i18n.language}
                  sx={{
                    // cursor:"pointer",
                    background: "white",
                    borderRadius: "10px",
                    "& .MuiInputBase-input::placeholder": {
                      // Adding this line
                      opacity: 1,
                    },
                  }}
                  // popperPlacement={popperPlacement}
                  onChange={(newValue) => {
                    if (newValue === null) {
                      // Clear the fields and set the date to null
                      setFieldValue(name, "");
                      setValueHijri(null);
                      setFieldValue(name_hj, null);
    
                      setDate(null);
                    } else if (values[name] !== undefined) {
                      const newDate = new Date(newValue);
                      if (isNaN(newDate)) {
                        console.error("Invalid date");
                      } else {
                        const formattedDate = format(newDate, "yyyy-MM-dd");
                        setFieldValue(name, formattedDate);
                        // setValueGregorian(formattedDate);
                        setDate(newDate);
                      }
                    }
                    // setDate(newValue ? new Date(newValue) : null);
                  }}
                  customInput={<CustomInput />}
                />
            {/* </Box> */}
          </DatePickerWrapper>
          {valueHijri && (
            <p className="flex items-center gap-2 mt-1 dark:text-white">
              <Icon path={mdiCalendarMonthOutline} size={0.8} />
              <span className="dark:text-white date_hj">
                {convertArabicToEnglish(valueHijri)}
              </span>
              {t("H")}
            </p>
          )}
          <div>
            <FormikError name={name} />
          </div>
        </div>
      </LocalizationProvider>
    </>
  );
}
