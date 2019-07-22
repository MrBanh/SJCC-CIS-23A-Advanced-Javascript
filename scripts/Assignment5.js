"use strict";

const inputRegex = /\[|\]|'|"|\+|\s*\s*/g;
var showInputPage = true;

const mostFrequentOccurrence = (inputs) => {
    const inputObj = {};
    let mostOccurrence = 0;
    let mostFrequent = [];

    for (let input of inputs) {
        if (input in inputObj) {
            inputObj[input] += 1;
            if (inputObj[input] > mostOccurrence) {
                // Keeps track of new highest occurrence count
                mostOccurrence = inputObj[input];

                // Resets the mostFrequent array since we have a new highest occurrence
                mostFrequent = [];
                mostFrequent.push(input);
            } else if (inputObj[input] === mostOccurrence) {
                // If an input has the same count as the current input with the current highest count
                mostFrequent.push(input);
            }
        } else {
            inputObj[input] = 1; // Input not yet stored in inputObj
            if (inputObj[input] > mostOccurrence) {
                mostOccurrence = inputObj[input];
                mostFrequent.push(input);
            } else if (inputObj[input] === mostOccurrence) {
                mostFrequent.push(input);
            }
        }
    }

    // Returns an object containing the array of most occurring value and count
    return {
        "mostFrequent": mostFrequent,
        "occurrence": mostOccurrence
    }
}

const toggleInputPage = () => {
    if (showInputPage) {
        // Hides the assignment description, input box, and submit button
        showInputPage = false;
        document.querySelector("#assignment-description").style.display = "none";
        document.querySelector("form").style.display = "none";
        document.querySelector("#submit-btn").style.display = "none";
    } else {
        showInputPage = true;
        document.querySelector("#assignment-description").style.display = "block";
        document.querySelector("form").style.display = "block";
        document.querySelector("#submit-btn").style.display = "block";

        // Removes the results, continue button, and exit button
        const container = document.querySelector("#inner-container");
        container.removeChild(document.querySelector("#displayResults"));
        container.removeChild(document.querySelector("#buttons"));
    }
}


const closeProgram = () => {
    document.querySelector("form").submit();
    location.search = ""; // Make sure empty query string
}

const displayResults = ({
    mostFrequent,
    occurrence
}) => {
    toggleInputPage();

    // Display the Output
    const resultEl = document.createElement('div');
    resultEl.id = "displayResults";
    resultEl.textContent = `${mostFrequent} (${occurrence} times)`;
    document.querySelector("#inner-container").appendChild(resultEl);

    // Buttons container
    const buttons = document.createElement("div");
    buttons.id = "buttons";

    // Continue Button
    const continueBtn = document.createElement("input");
    continueBtn.id = "next-btn";
    continueBtn.type = "button";
    continueBtn.value = "Continue";

    // Exit Button
    const exitBtn = continueBtn.cloneNode(true);
    exitBtn.id = "exit-btn";
    exitBtn.value = "Exit";

    buttons.appendChild(continueBtn);
    buttons.appendChild(exitBtn);

    // Appends buttons to output page
    document.querySelector("#inner-container").appendChild(buttons);

    // Add event listeners for continue and exit buttons
    continueBtn.addEventListener("click", toggleInputPage);
    exitBtn.addEventListener("click", closeProgram);
}

// Get user input
const getInput = () => {
    const form = document.querySelector("form");

    if (form.checkValidity()) {
        // Get the raw data from input
        let formData = document.querySelector("#array").value;
        // Parse to exclude spaces, [, ], ', ", and +
        formData = formData.replace(inputRegex, '');
        // Split into an array, delimited by comma
        formData = formData.split(',');

        // Get the most frequent occurring input and its count
        const result = mostFrequentOccurrence(formData);

        // Displays the result
        displayResults(result);
    } else {
        // Highlight input box for invalid input
        form.className = "submitted";
    }
}


const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    document.querySelector("#submit-btn").addEventListener("click", getInput);
};

window.addEventListener("load", createEventListeners);