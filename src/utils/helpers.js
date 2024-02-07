import { toHijri } from "hijri-converter";

export const hexToRGBA = (hex, opacity) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity || 1})`;
};
export function convertArabicToEnglish(arabicNumber) {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  const englishNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  let convertedNumber = arabicNumber;

  // Replace Arabic numerals with English numerals
  for (let i = 0; i < arabicNumerals.length; i++) {
    const regex = new RegExp(arabicNumerals[i], "g");
    convertedNumber = convertedNumber?.replace(regex, englishNumerals[i]);
  }

  return convertedNumber;
}

// export function convertToHijri(valueGregorian) {
//   const gregorianDate = new Date(valueGregorian);
//   const hijriFormatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   });
//   const formattedHijriDate = hijriFormatter?.format(gregorianDate);
//   const hijriDateWithoutHeh = formattedHijriDate
//     .replace("هـ", "")
//     .replace(/\//g, "-");

//   return hijriDateWithoutHeh;
// }
export const padWithZero = (number) => {
  let numStr = number.toString();
  if (numStr.length === 1) {
    numStr = "0" + numStr;
  }
  return numStr;
};

export const convertToHijri = (date) => {
  let hijriDate = new Date(date);
  return toHijri(
     hijriDate.getFullYear(),
      hijriDate.getMonth() + 1,
    hijriDate.getDate()
  );
};

export function checkAttachments(requiredInputs, attachmentIdsUpdate, values) {
  const areAllRequiredInputsUpdated = requiredInputs?.every((id) =>
    attachmentIdsUpdate?.includes(id)
  );

  const hasDeletedRequiredAttachments = requiredInputs?.some(
    (id) => values?.attachments?.[id] === "deleted"
  );

  return areAllRequiredInputsUpdated && !hasDeletedRequiredAttachments;
}
export const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


export const  formatIban = (value) => {
  const hasSpaces = /\s/.test(value);
  if (hasSpaces) {
    return value;
  }
  return value.replace(/(.{4})/g, "$1 ").trim();
};