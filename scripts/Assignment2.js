"use strict";

const randomBackgroundColor = () => {
    let red = Math.ceil(Math.random() * 255);
    let green = Math.ceil(Math.random() * 255);
    let blue = Math.ceil(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`;
};

var IS_PAUSED = true;
var INTERVAL;
const displayStopwatch = () => {
    // Get the current values of hours, minutes, and seconds from page
    let timeValues = document
        .querySelector("#display-stopwatch")
        .textContent.split(":")
        .map(t => parseInt(t, 10));

    // Hold the hours, minutes, and seconds
    let hours = timeValues[0];
    let minutes = timeValues[1];
    let seconds = timeValues[2];

    // Adding leading zeros to time if less than 10
    const addZero = n => (n < 10 ? "0" + n.toString() : n);

    // Stopwatch function (to increment to next level)
    const incrementTime = () => {
        seconds++;

        // Logic to handle incrementing minutes
        if (seconds / 60 === 1) {
            seconds = 0; // reset seconds
            minutes++;

            // Logic to handle incrementing hours
            if (minutes / 60 === 1) {
                minutes = 0;
                hours++;

                //Logic to handle reaching 24 hour limit
                if (hours / 24 === 1) {
                    hours = 0;
                }
            }
        }

        // Display time values to user
        const displayTime = document.querySelector("#display-stopwatch");

        displayTime.textContent =
            addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds);
    };

    // Handles start and stop buttons
    if (IS_PAUSED) {
        // Start the clock
        INTERVAL = setInterval(incrementTime, 1000);
        document.querySelector("#startStop-stopwatch").textContent = "Stop";
        IS_PAUSED = !IS_PAUSED;
    } else {
        clearInterval(INTERVAL);
        document.querySelector("#startStop-stopwatch").textContent = "Start";
        IS_PAUSED = !IS_PAUSED;
    }
};

const resetStopwatch = () => {
    clearInterval(INTERVAL);
    document.querySelector("#startStop-stopwatch").textContent = "Start";
    IS_PAUSED = true;
    document.querySelector("#display-stopwatch").textContent = "00:00:00";
};

const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    // Change the page background color for every click of a button using js
    const bodyTag = document.querySelector("body");
    document.addEventListener("click", () => {
        bodyTag.style.background = randomBackgroundColor();
    });

    // Event handler for starting stopwatch
    const startStopBtn = document.querySelector("#startStop-stopwatch");
    startStopBtn.addEventListener("click", displayStopwatch);

    // Event handler for resetting stopwatch
    const resetBtn = document.querySelector("#reset-stopwatch");
    resetBtn.addEventListener("click", resetStopwatch);
};

window.addEventListener("load", createEventListeners);
