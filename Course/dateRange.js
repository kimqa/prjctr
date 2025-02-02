"use strict"

document.addEventListener("DOMContentLoaded", () => {

    // подумать, как в getDaysList можно использовать эти константы вместо 3х ифов
    const WORKING_DAYS = [1, 2, 3, 4, 5];
    const WEEKEND_DAYS = [0, 6];
    const ALL_DAYS = [1, 2, 3, 4, 5, 6, 0];
//return array with ALL, WORKING or WEEKEND days

    let startDay;
    let endDay ;
    let options;
    let unit;
    const buttonDOM = document.querySelector(".button");
    const startDayDOM = document.querySelector(".start-date");
    const endDayDOM = document.querySelector(".end-date");
    const unitDOM = document.querySelector(".units");
    const optionsDOM = document.querySelector(".options");
    const tableDOM = document.querySelector(".table");

// слушаем инпут date а так же селекторы с единицами измерения и раб/выходными днями
    startDayDOM.addEventListener("change", () => {
        startDay = startDayDOM.value;
    })
    endDayDOM.addEventListener("change", () => {
        endDay = endDayDOM.value;
    });
    unitDOM.addEventListener("change", () => {
        unit = unitDOM.value;
    })
    optionsDOM.addEventListener("change", () => {
        options = optionsDOM.value;
    })



    document.querySelector("button").addEventListener("click", function (event) {
        if(!startDayDOM.value || !endDayDOM.value) {
            alert("Please enter date");
        }
        addItemToStorage();


        console.log("button clicked");
        console.log(startDay);
        console.log(endDay);
        console.log(unit);
        console.log(options);

    })
    function getDaysList( ) {
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
// add days to array daysList
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

    function returnDuration(dayList) {
        switch (unit) {
            case "days": return dayList.length;
            case "hours": return dayList.length * 24;
            case "minutes": return dayList.length * 24 * 60;
            case "seconds": return dayList.length * 24 * 60 * 60;
        }
    }
    console.log(returnDuration(getDaysList("2025-01-27", "2025-02-02"), "hours"))
    console.log(getDaysList("2025-01-27", "2025-02-02"))
    console.log(getDaysList("2025-01-27", "2025-02-02", "weekend days"));
    console.log(getDaysList("2025-01-27", "2025-02-02", "working days"));

    function addItemToStorage() {
        let count = returnDuration(getDaysList(startDay, endDay), unit)
        let item = {
            start : startDay,
            end : endDay,
            count : count,
            units: unit,
        }
        let storage = JSON.parse(localStorage.getItem("dateHistory"));
        storage.unshift(item);
        storage = storage.slice(0, 10);
        localStorage.setItem("dateHistory", JSON.stringify(storage));

        loadHistory()
    }
// Функция загрузки истории
    function loadHistory() {
        let history = JSON.parse(localStorage.getItem("dateHistory")) || [];
        // заголовки
        tableDOM.innerHTML = `<li class="table-header"><span>Start Date</span><span>End Date</span><span>Range</span></li>`;

        history.forEach((entry) => {
            let li = document.createElement("li");
            li.classList.add("table-row");
            li.innerHTML = `<span>${entry.start}</span><span>${entry.end}</span><span>${entry.count} ${entry.unit}</span>`;
            tableDOM.appendChild(li);
        });
    }
})