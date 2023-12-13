/* eslint-disable react/prop-types */
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useFormikContext } from "formik";
import { useState, useEffect } from "react";
import { FormikError } from "./FormikError";

export default function DatePickerComp({ name, name_hj, label, required }) {
  const { setFieldValue, values } = useFormikContext();
  const [valueGregorian, setValueGregorian] = useState();
  const [valueHijri, setValueHijri] = useState(values[name_hj]);

  useEffect(() => {
    if (valueGregorian) {
      // Convert the Gregorian date to Hijri
      const gregorianDate = new Date(valueGregorian);
      const hijriFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
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
      <div className="w-full my-4">
        <label className="  my-[0.75rem]">
          {label}
          <span className="mx-1 text-red-500">
            {required == "1" ? "*" : ""}
          </span>
        </label>
        <DatePicker
          className="bg-white rounded-[10px] w-full mt-3"
          name={name}
          defaultValue={dayjs(values[name])}
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
          <p className="mt-1">
            الموافق بالهجري : <span className="font-bold">{valueHijri} </span>
          </p>
        )}
        <div>
          <FormikError name={name} />
        </div>
      </div>
    </LocalizationProvider>
  );
}
