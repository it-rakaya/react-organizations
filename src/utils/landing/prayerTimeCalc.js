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

  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/calendarByCity?city=Makkah&country=KSA&method=4&month=${month}&year=${year}`
    );
    const data = await response.json();
    const dayData = data.data.find((d) =>
      d.date.gregorian.date.startsWith(
        `${year}-${month.toString().padStart(2, "0")}-${date
          .toString()
          .padStart(2, "0")}`
      )
    );
    if (dayData) {
      const timings = dayData.timings;
      const timeLeft = calculateTimeLeftUntilNextPrayer(timings, setPrayer);

      if (timeLeft == null && inc === 0) {
        getPrayerTime(setNextPrayerTime, setPrayer, 1);
      } else {
        setNextPrayerTime(timeLeft);
      }
    }
  } catch (error) {
    console.error("Error fetching prayer times: ", error);
  }
};
