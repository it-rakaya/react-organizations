/* eslint-disable react/prop-types */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { FormikError } from "./FormikError";
import { convertArabicToEnglish } from "../../../utils/helpers";
import { mdiCalendarMonthOutline, mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";

export default function DatePickerComp({
  name,
  name_hj,
  label,
  required,
  showIcon,
  setShow,
  setIndex,
  index,
}) {
  const { setFieldValue, values } = useFormikContext();
  const [valueGregorian, setValueGregorian] = useState();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="w-full">
        <label className="block  my-[0.75rem]">
          {label}
          <span className="mx-1 text-red-500">
            {required == "1" ? "*" : ""}
          </span>
        </label>
        {showIcon && (
          <div
            className="my-1 cursor-pointer w-fit"
            onClick={() => {
              setShow(true);
              setIndex(index);
            }}
          >
            <div className="flex items-center gap-1">
              <>
                <span className="text-[10px] text-[#80b3f0]">
                  {" "}
                  لمعرفة المرفق اضغط هنا
                </span>
                <Icon path={mdiInformationOutline} size={0.7} />
              </>
            </div>
          </div>
        )}
        <DatePicker
          className="bg-white rounded-[10px] w-full "
          name={name}
          defaultValue={values[name] ? dayjs(values[name]) : null}
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
          <p className="flex items-center gap-2 mt-1 ">
            <Icon path={mdiCalendarMonthOutline} size={0.8} />
            <span className="font- ">{convertArabicToEnglish(valueHijri)}</span>
            هـ
          </p>
        )}
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </LocalizationProvider>
  );
}
