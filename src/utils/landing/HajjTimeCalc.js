
// we need to know what year in hijri are we
const getYear = async (inc=false)=>{
    const now = new Date()
    const request = await fetch(`http://api.aladhan.com/v1/gToH/${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`);
    const response = (await request.json()).data
    return response.hijri.year;
}

// copied from stackoverflow
// https://stackoverflow.com/questions/2536379/difference-in-months-between-two-dates-in-javascript
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

const getHajjDate = async (inc=false)=>{
    const request = await fetch(`http://api.aladhan.com/v1/hToG/01-12-${await getYear()}`);
    let georgianDate = (await request.json()).data.gregorian.date
    const [day, month, year] = georgianDate.split('-');
    return new Date(year,month-1, day);

}

export const getTimeLeftToHajj = async (setTimeLeft)=>{
    let hajjDate = await getHajjDate(false);
    const now = new Date();
    let diff = hajjDate - now 
    if(diff <= 0){
        //increase the year so we can get next year if we e.g. 12-10-144x
        hajjDate = await getHajjDate(true)
        diff = hajjDate - now
    }
    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) / 30 );
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    setTimeLeft({months, days, hours})


}
