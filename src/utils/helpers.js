import { toGregorian, toHijri } from "hijri-converter";

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
  const areAllRequiredInputsValid =
    values?.attachments &&
    requiredInputs.every(
      (id) =>
        // values?.attachments?.[id] !== undefined &&
        values?.attachments?.[id] !== null &&
        values?.attachments?.[id] !== "deleted"
    );

  if (areAllRequiredInputsValid == false) {
    return false;
  }

  const areAllRequiredInputsUpdated = requiredInputs.every((id) =>
    attachmentIdsUpdate?.includes(id)
  );

  const hasDeletedRequiredAttachments = requiredInputs?.some(
    (id) => values?.attachments?.[id] === "deleted"
  );

  return areAllRequiredInputsUpdated && !hasDeletedRequiredAttachments;
}

export const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export const formatIban = (value) => {
  const hasSpaces = /\s/.test(value);
  if (hasSpaces) {
    return value;
  }
  return value.replace(/(.{4})/g, "$1 ").trim();
};



export const calculateHajjRemainingTime = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed.
  const currentDate = today.getDate();
  
  const todayHijri = toHijri(currentYear, currentMonth, currentDate);
  let hajjYear = todayHijri.hy;
  
  // تقدير تاريخ الحج في 9 ذو الحجة. قد يحتاج لتعديل بناءً على الرؤية القمرية.
  let hajjHijriDate = { hy: hajjYear, hm: 12, hd: 9 }; // 9 ذو الحجة
  let hajjGregorian = toGregorian(hajjHijriDate.hy, hajjHijriDate.hm, hajjHijriDate.hd);
  let hajjDate = new Date(hajjGregorian.gy, hajjGregorian.gm - 1, hajjGregorian.gd);
  
  if (today > hajjDate) {
    hajjYear++;
    hajjHijriDate.hy = hajjYear;
    hajjGregorian = toGregorian(hajjHijriDate.hy, hajjHijriDate.hm, hajjHijriDate.hd);
    hajjDate = new Date(hajjGregorian.gy, hajjGregorian.gm - 1, hajjGregorian.gd);
  }
  
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
  const daysRemaining = Math.round((hajjDate - today) / oneDay);
  
  // Calculate months remaining, approximated by dividing days by 30
  const monthsRemaining = Math.floor(daysRemaining / 30);
  
  return { daysRemaining, monthsRemaining };
};