"use strict";


const changeMinMax = () => {
    const type = document.querySelector("input[name='tempType']:checked").value;
    if (type === "celsius") {
        document.querySelector("#temp").min = -100;
        document.querySelector("#temp").max = 100;
    } else {
        // If fahrenheit
        document.querySelector("#temp").min = -300;
        document.querySelector("#temp").max = 300;
    }
}


const calculateTemperature = (temp, type) => {
    return type === "celsius" ? (temp * (9 / 5) + 32) : ((temp - 32) * (5 / 9));
}


const displayTemperature = (event) => {
    // Prevents form from submitting and reloading
    event.preventDefault();

    // Get the temperature input
    const temp = Number(document.querySelector("#temp").value);

    // Get the radio option that was chosen
    const type = document.querySelector("input[name='tempType']:checked").value;

    // Format result
    const result = calculateTemperature(temp, type);
    const degSymbol = type === "celsius" ? "&deg;" + 'F' : "&deg;" + 'C';

    // Display the result
    document.querySelector("#displayResults").innerHTML = result.toFixed() + degSymbol;
};


const resetForm = () => {
    // Delete input
    document.querySelector("#temp").value = '';

    // Change radio button checked back to default
    document.querySelector("#celsius").checked = "checked";

    // Change the min max back to default
    changeMinMax();

    // Display no results
    document.querySelector("#displayResults").textContent = '';
}


const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    // adjust input min max when switching between "Celsius to Fahrenheit" and "Fahrenheit to Celsius"
    const radioOptions = document.querySelectorAll("input[name='tempType']");
    for (let option of radioOptions) {
        option.addEventListener("change", changeMinMax);
    }

    // When user submits the temp form
    const tempForm = document.querySelector("#tempForm");
    tempForm.addEventListener("submit", displayTemperature)

    // When user clicks on the Reset button
    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", resetForm);
};


window.addEventListener("load", createEventListeners);