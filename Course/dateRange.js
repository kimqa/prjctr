"use strict"
console.log("dateRange.js loaded");

function dateRange(start, end, unit) {
    const startInTimestamp = new Date(start);
    const endInTimestamp = new Date(end);
    let range = Math.abs( endInTimestamp -startInTimestamp);
}