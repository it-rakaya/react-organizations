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
  const now = new Date();
  let minTimeDiff = Infinity;
  let nextPrayerTime = null;
  let nextPrayerName = "";

  PRAYERS.forEach(prayer => {
    const time = prayerTimes[prayer].split(" ")[0];
    const [hour, minute] = time.split(":").map(num => parseInt(num, 10));
    let prayerTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    
    // Adjust for next day's Fajr
    if (prayer === "Fajr" && prayerTime < now) {
      prayerTime.setDate(prayerTime.getDate() + 1);
    }

    let timeDiff = prayerTime - now;
    if (timeDiff > 0 && timeDiff < minTimeDiff) {
      minTimeDiff = timeDiff;
      nextPrayerTime = prayerTime;
      nextPrayerName = prayer;
    }
  });

  if (!nextPrayerTime) return null;

  setPrayer(nextPrayerName);

  const hours = Math.floor(minTimeDiff / (1000 * 60 * 60));
  const minutes = Math.floor((minTimeDiff % (1000 * 60 * 60)) / (1000 * 60));

  return { hours, minutes };
};



export const getPrayerTime = async (setNextPrayerTime, setPrayer, inc = 0) => {
  const now = new Date();
  now.setDate(now.getDate() + inc);
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const date = now.getDate();
  
  try {
    const response = await fetch(`https://api.aladhan.com/v1/calendarByCity?city=Makkah&country=KSA&method=4&month=${month}&year=${year}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const timings = data.data[date - 1]?.timings;

    if (!timings) {
      throw new Error("No prayer times found for the given date.");
    }

    const timeLeft = calculateTimeLeftUntilNextPrayer(timings, setPrayer);
    if (timeLeft) {
      setNextPrayerTime(timeLeft);
    } else if (inc === 0) {
      getPrayerTime(setNextPrayerTime, setPrayer, 1);
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};
