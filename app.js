const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const deadline = document.querySelector('.giveaway-deadline');
const giveaway = document.querySelector('.giveaway-countdown');
const countdown = document.querySelectorAll('.countdown div');

// set deadline
const tempDate = new Date();
const tempYear = tempDate.getFullYear();
const tempDay = tempDate.getDate();
const tempMonth = tempDate.getMonth();

const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 10, 30, 00, 00);

const weekday = weekDays[futureDate.getDay()];
const date = futureDate.getDate();
const month = months[futureDate.getMonth()];
const year = futureDate.getFullYear();
const hour = futureDate.getHours();
const minute = futureDate.getMinutes();

deadline.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hour}:${minute}am`;

// set countdown
const futureTime = futureDate.getTime();
function getRemainingTime() {
    const currentTime = new Date().getTime();

    const remainingTime = futureTime - currentTime;

    const DAY_IN_MILISECONDS = 1000 * 60 * 60 * 24;
    const HOUR_IN_MILISECONDS = 1000 * 60 * 60;
    const MINUTE_IN_MILISECONDS = 1000 * 60;

    let days = Math.floor(remainingTime / DAY_IN_MILISECONDS);
    let hours = Math.floor((remainingTime % DAY_IN_MILISECONDS) / HOUR_IN_MILISECONDS);
    let mins = Math.floor((remainingTime % HOUR_IN_MILISECONDS) / MINUTE_IN_MILISECONDS);
    let secs = Math.floor((remainingTime % MINUTE_IN_MILISECONDS) / 1000);

    const values = [days, hours, mins, secs];
    function formatValue(item) {
        if(item < 10){
            return `0${item}`;
        }
        return item;
    }

    countdown.forEach((item, index) => {
        item.textContent = formatValue(values[index]);
    });

    if(remainingTime < 0) {
        clearInterval(interval);
        giveaway.innerHTML = `<h4 class="giveaway-expired">Sorry, this giveaway has expired!</h4>`;
    }

}

let interval = setInterval(getRemainingTime, 1000);

getRemainingTime();
