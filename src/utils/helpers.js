/* eslint-disable no-prototype-builtins */
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
  const areAllRequiredInputsValid = requiredInputs.every((id) => {
    const isCurrentValid =
      values?.attachments?.[id] !== null &&
      values?.attachments?.[id] !== "deleted";
    const isUpdatedButMissing =
      attachmentIdsUpdate?.includes(id) &&
      !values.attachments?.hasOwnProperty(id);
    return isCurrentValid || isUpdatedButMissing;
  });

  if (!areAllRequiredInputsValid) {
    return false;
  }

  const areAllRequiredInputsUpdated = requiredInputs.every(
    (id) =>
      values?.attachments?.hasOwnProperty(id) ||
      attachmentIdsUpdate?.includes(id)
  );

  const hasDeletedRequiredAttachments = requiredInputs.some(
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
  return value?.replace(/(.{4})/g, "$1 ").trim();
};
export const calculateHajjRemainingTimeFormatted = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed.
  const currentDate = today.getDate();
  const todayHijri = toHijri(currentYear, currentMonth, currentDate);
  let hajjYear = todayHijri.hy;
  const hajjHijriDate = { hy: hajjYear, hm: 12, hd: 8 };
  let hajjGregorian = toGregorian(
    hajjHijriDate.hy,
    hajjHijriDate.hm,
    hajjHijriDate.hd
  );
  let hajjDate = new Date(
    hajjGregorian.gy,
    hajjGregorian.gm - 1,
    hajjGregorian.gd
  );
  if (today > hajjDate) {
    hajjYear++;
    const nextHajjHijriDate = { hy: hajjYear, hm: 12, hd: 8 };
    const nextHajjGregorian = toGregorian(
      nextHajjHijriDate.hy,
      nextHajjHijriDate.hm,
      nextHajjHijriDate.hd
    );
    hajjDate = new Date(
      nextHajjGregorian.gy,
      nextHajjGregorian.gm - 1,
      nextHajjGregorian.gd
    );
  }

  const diff = hajjDate - today;
  const daysRemaining = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const monthsRemaining = Math.floor(daysRemaining / 29.53); 
  const daysAfterMonths = daysRemaining % 29.53;

  return {
    monthsRemaining,
    daysAfterMonths: Math.round(daysAfterMonths),
    hoursRemaining,
  };
};

export function autoReadSMS(cb) {
  const signal = new AbortController();
  setTimeout(() => {
    signal.abort();
  }, 1 * 60 * 1000);
  async function main() {
    if ("OTPCredential" in window) {
      try {
        if (navigator.credentials) {
          try {
            await navigator.credentials
              .get({ abort: signal, otp: { transport: ["sms"] } })
              .then((content) => {
                if (content && content.code) {
                  cb(content.code);
                }
              })
              .catch(() => console.log("e"));
          } catch (e) {
            return;
          }
        }
      } catch (err) {
        // console.log("err");
      }
    }
  }
  main();
}

export const convertToFavicon = (logoUrl) => {
  const link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = logoUrl;
  document.getElementsByTagName("head")[0].appendChild(link);
};
export const numberFormatter = (code, phone) => {
  return code + phone?.slice(0, 2) + "*****" + phone?.slice(-2);
};
