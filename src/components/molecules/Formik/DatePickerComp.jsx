/* eslint-disable react/prop-types */
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { format } from "date-fns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
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

import DatePickerWrapper from ".";
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
  console.log("🚀 ~ values:", values)
  const [valueGregorian, setValueGregorian] = useState();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);
  const [date, setDate] = useState(
    values[name] ? new Date(values[name]) : null
  );
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  const langObj = { ar };
  function convertHijriToEnglishNumbers(hijriDate) {
    const arabicNumbers = '٠١٢٣٤٥٦٧٨٩';
    const englishNumbers = '0123456789';
  
    let convertedDate = '';
    for (let i = 0; i < hijriDate.length; i++) {
      const char = hijriDate[i];
      const indexOfChar = arabicNumbers.indexOf(char);
      if (indexOfChar !== -1) {
        // If the character is an Arabic number, replace it with the corresponding English number
        convertedDate += englishNumbers[indexOfChar];
      } else {
        // If the character is not an Arabic number, keep it as is
        convertedDate += char;
      }
    }
  
    return convertedDate;
  }
  useEffect(() => {
    if (valueGregorian) {
      // Convert the Gregorian date to Hijri
      const gregorianDate = new Date(valueGregorian);
      const hijriFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        day: "2-digit",
        year: "numeric",
        month: "2-digit",
      });
      const formattedHijriDate = hijriFormatter.format(gregorianDate);
      const hijriDateWithoutHeh = formattedHijriDate
        .replace("هـ", "")
        .replace(/\//g, "-");

      setValueHijri(hijriDateWithoutHeh);
      setFieldValue(name_hj, hijriDateWithoutHeh);
    }
  }, [name_hj, setFieldValue, valueGregorian]);
  registerLocale(i18n.language, langObj[i18n.language]);

  return (
    <>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        // locale={arSA}
        // localeText={
        //   deDE.components.MuiLocalizationProvider.defaultProps.localeText
        // }
        // key={localizationKey}
      >
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
              className="bg-white dark:bg-dark-primary rounded-[10px] w-full dark:border dark:!border-solid dark:!border-1 dark:!border-[#555d64]"
              name={name}
              selected={date}
              // locale="ar-SA"
              placeholderText="MM/DD/YYYY"
              // isClearable
              locale={i18n.language}
              // localeText={{
              //   cancelButtonLabel: t("cancel"),
              //   okButtonLabel: t("OK"),
              //   toolbarTitle: t("Select Date"),
              // }}
              sx={{
                // cursor:"pointer",
                background: "white",
                borderRadius: "10px",
                "& .MuiInputBase-input::placeholder": {
                  // Adding this line
                  opacity: 1,
                },
              }}
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
                    setValueGregorian(formattedDate);
                    setDate(newDate);
                  }
                }
              }}
              customInput={<CustomInput />}
            />
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
