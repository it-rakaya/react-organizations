/* eslint-disable react/prop-types */
import { mdiCalendarMonthOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { convertArabicToEnglish } from "../../../utils/helpers";
import CardInfo from "../CardInfo";
import Label from "../Label";
import { FormikError } from "./FormikError";
import i18next, { t } from "i18next";
import { useIsRTL } from "../../../hooks/useIsRTL";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { useTranslation } from "react-i18next";
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
  const [valueGregorian, setValueGregorian] = useState();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);
  const isRTL = useIsRTL();
  const locale = isRTL ? "ar" : "en";
  dayjs.locale(locale);
  const { t } = useTranslation();

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} locale={locale}>
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
        <DatePicker
          className="bg-white dark:bg-dark-primary rounded-[10px] w-full "
          name={name}
          i18nIsDynamicList={isRTL}
          defaultValue={values[name] ? dayjs(values[name]) : null}
          localeText={{
            cancelButtonLabel: t("cancel"),
            okButtonLabel: t("OK"),
            toolbarTitle: t("Select Date"),
          }}
          onChange={(newValue) => {
            if (values[name] !== undefined) {
              const newDate = dayjs(newValue);
              if (!newDate.isValid()) {
                console.error("تاريخ غير صحيح");
              } else {
                setFieldValue(name, newDate.format("YYYY-MM-DD"));
                setValueGregorian(newDate.format("YYYY-MM-DD"));
              }
            }
          }}
        />
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
  );
}
