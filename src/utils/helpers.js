export const hexToRGBA = (hex, opacity) => {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${opacity})`;
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

export function convertToHijri(valueGregorian) {
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

  return hijriDateWithoutHeh;
}
