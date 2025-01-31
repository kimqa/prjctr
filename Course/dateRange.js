"use strict"
// подумать, как в getDaysList можно использовать эти константы вместо 3х ифов
const WORKING_DAYS = [1, 2, 3, 4, 5];
const WEEKEND_DAYS = [0, 6];
const ALL_DAYS = [1, 2, 3, 4, 5, 6, 0];
/*
return array with ALL, WORKING or WEEKEND days
 */
function getDaysList(startDay, endDay, options = "all days") {
    let days= [];
    switch (options) {
        case "working days" :
            days = WORKING_DAYS;
            break;
        case "weekend days" :
            days = WEEKEND_DAYS;
            break;
        default:
            days = ALL_DAYS;
    }
    let daysList = [];
    let startDateValue = new Date(startDay);
    let endDateValue = new Date(endDay);

    while (startDateValue <= endDateValue) {
        if (days.includes(startDateValue.getDay())) {
            daysList.push(new Date(startDateValue));
            startDateValue.setDate(startDateValue.getDate() + 1);
        } else {
            startDateValue.setDate(startDateValue.getDate() + 1);
        }
    }
    return daysList;
}

console.log(getDaysList("2025-01-27", "2025-02-02"))
console.log(getDaysList("2025-01-27", "2025-02-02", "weekend days"));
console.log(getDaysList("2025-01-27", "2025-02-02", "working days"));

/*


function dateRange(start, end, unit="days") {
    const startInTimestamp = new Date(start);
    const endInTimestamp = new Date(end);
    let range = Math.abs( endInTimestamp - startInTimestamp);
    console.log(typeof range);
    if (unit === "seconds") {
        return range / 1000;
    } else if (unit === "minutes") {
        return range / 1000 / 60;
    } else if (unit === "hours") {
        return range / 1000 / 60 / 60;
    } else if (unit === "days") {
        return range / 1000/ 60 / 60 / 24;
    }
    console.log( range);
}
console.log(dateRange("2025-01-16", "2025-01-15"))
console.log(new Date("2025-01-15").getDay())

 */