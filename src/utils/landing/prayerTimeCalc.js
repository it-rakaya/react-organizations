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

  // Calculate the time difference
  const timeDifference = Math.abs(nextPrayer - now);
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};

export const getPrayerTime = async (setNextPrayerTime, setPrayer) => {
  console.log(new Date().getFullYear(), new Date().getDate());
  const response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${new Date().getFullYear()}/${new Date().getMonth()}?city=Makkah&country=KSA&method=4`
  );
  const data = (await response.json()).data;

  setNextPrayerTime(
    calculateTimeLeftUntilNextPrayer(
      data[new Date().getDate() - 1].timings,
      setPrayer
    )
  );
};
