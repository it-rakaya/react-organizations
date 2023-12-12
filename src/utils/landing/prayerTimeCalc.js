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

export const getPrayerTime = async (setNextPrayerTime, setPrayer, inc=false) => {
  const now = new Date();
  const [month, year] = [new Date().getMonth()+1,now.getFullYear()]
  const response = await fetch(
    `https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=Makkah&country=KSA&method=4`
  );
  const data = (await response.json()).data;
  const timeLeft = calculateTimeLeftUntilNextPrayer(
    data[new Date().getDate() + (inc?0:-1)].timings,
    setPrayer
  );

  if(timeLeft == null){
    // rerun the method but increase the 
    getPrayerTime(setNextPrayerTime, setPrayer, true);
  }
  setNextPrayerTime(timeLeft);
};
