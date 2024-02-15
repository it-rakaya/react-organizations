const PRAYERS = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const filterPrayerTimes = (prayerTimes) => {
  const filteredPrayers = {};

  for (const prayer of PRAYERS) {
    if (prayerTimes.hasOwnProperty(prayer)) {
      filteredPrayers[prayer] = prayerTimes[prayer];
    }
  }

  return filteredPrayers;
};

const calculateTimeLeftUntilNextPrayer = (prayerTimes, setPrayer) => {
  prayerTimes = filterPrayerTimes(prayerTimes);
  // Get the current date and time
  const now = new Date();

  let nextPrayer = null;
  for (const key in prayerTimes) {
    const prayerHour = parseInt(prayerTimes[key].substring(0, 2));
    const prayerMin = parseInt(prayerTimes[key].substring(3, 5));
    const prayer = new Date();
    prayer.setHours(prayerHour, prayerMin);
    if (prayer >= now) {
      nextPrayer = prayer;
      setPrayer(key);
      break;
    }
  }
  //   no prayers left today
  if (nextPrayer == null) {
    return null;
  }

  // Calculate the time difference
  const timeDifference = Math.abs(nextPrayer - now);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

export const getPrayerTime = async (setNextPrayerTime, setPrayer, inc = 0) => {
  const now = new Date();
  now.setDate(now.getDate() + inc);
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const date = now.getDate();
  const response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Makkah&country=KSA&method=4`
  );
  const data = (await response.json()).data;
  const timeLeft = calculateTimeLeftUntilNextPrayer(
    data[date - 1].timings, // تأكد من مطابقة المؤشر مع تاريخ اليوم الصحيح بعد التعديل
    setPrayer
  );

  if (timeLeft == null) {
    if (inc < 1) { // تجنب الحلقة اللانهائية بوضع حد لعدد المحاولات
      getPrayerTime(setNextPrayerTime, setPrayer, inc + 1);
    }
  } else {
    setNextPrayerTime(timeLeft);
  }
};
