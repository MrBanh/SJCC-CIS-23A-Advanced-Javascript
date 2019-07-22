"use strict";

const validityRegex = /[^,\s\d\[\]]/g // Makes sure input is valid
const inputRegex = /\[|\]|\s*/g; // Used to remove spaces and brackets
var showInputPage = true; // Used for toggling input and output page

const bubbleSort = (inputs) => {
    // Create a copy of the input array, convert each value to Number type
    let arrCopy = inputs.map(val => parseFloat(val));
    // Get the # of values in the array
    const arrLength = arrCopy.length;

    // Loop through each value
    for (let i = 0; i < arrLength - 1; i++) {
        for (let j = i + 1; j < arrLength; j++) {
            // Compare the next value to see if it's > current value
            if (arrCopy[j] > arrCopy[i]) {
                // If >, switch the value so the current value has the higher value
                [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
            }
        }
    }

    // Returns a sorted array in descending order
    return arrCopy.filter(val => !isNaN(val));
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

const displayResults = (sortedArray) => {
    toggleInputPage();

    // Display the Output
    const resultEl = document.createElement('div');
    resultEl.id = "displayResults";
    resultEl.textContent = `[ ${sortedArray.join(', ')} ]`;
    resultEl.style.fontSize = "1.25em";
    resultEl.style.fontFamily = "sans-serif";
    resultEl.style.margin = "auto";
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
    // Get the raw data from input
    let formData = document.querySelector("#array").value;

    if (form.checkValidity() && !validityRegex.test(formData)) {
        // Parse to exclude spaces, [, and ]
        formData = formData.replace(inputRegex, '');
        // Split into an array, delimited by comma
        formData = formData.split(',');

        // Get the most frequent occurring input and its count
        const result = bubbleSort(formData);

        // Displays the result
        displayResults(result);
    } else {
        // Show invalid input message
        const invalidDiv = document.createElement("div");
        invalidDiv.id = "invalidMsg";
        invalidDiv.textContent = "Please enter an array of numbers";
        document.querySelector("#inner-container").insertBefore(invalidDiv, form);
    }
}


const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    // Removes the invalid message when user focuses on input box
    document.querySelector("#array").addEventListener("focus", () => {
        document.querySelector("#inner-container").removeChild(document.querySelector("#invalidMsg"));
    })

    // Get the input when user clicks on submit button
    document.querySelector("#submit-btn").addEventListener("click", getInput);
};

window.addEventListener("load", createEventListeners);