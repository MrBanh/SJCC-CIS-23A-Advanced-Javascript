"use strict";

const browserRegex = /Edge|rv:11/g;
var isEdgeIE = browserRegex.test(navigator.userAgent);

const digitToText = n => {
    const num = [
        "",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
    ];

    const numTeen = [
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eighteen",
        "nineteen",
    ];

    const numTy = [
        "",
        "",
        "twenty",
        "thirty",
        "forty",
        "fifty",
        "sixty",
        "seventy",
        "eighty",
        "ninety",
    ];
    const numLion = [
        "",
        "thousand",
        "million",
        "billion",
        "trillion",
        "quadrillion",
        "quintillion",
        "sextillion",
        "septillion",
        "octillion",
        "nonillion",
    ];
    return n;
};

const dollarsAndCents = amount => {
    let dollars;
    let cents;
    if (amount.indexOf(".") > -1) {
        // Split the check amount by the .
        dollars = Number(amount.split(".")[0]) || 0;
        cents = Number(amount.split(".")[1]) || 0;
        return (
            `${digitToText(dollars)} dollars` +
            `and ${digitToText(cents)} cents`
        );
    } else {
        dollars = Number(amount);
        return `${digitToText(dollars)} dollars`;
    }
};

const enterUserData = () => {
    const inputs = document.querySelectorAll(
        "input[type='text'], input[type='date'], input[type='number']",
    );
    for (let input of inputs) {
        // Get data from sessionStorage
        input.value = sessionStorage.getItem(input.name);
    }

    // Get the text field where the converted digit-to-text will be displayed
    const digitToTextField = document.querySelector("#digitToText");

    // Set the digitToTextField to the converted text
    digitToTextField.textContent = dollarsAndCents(sessionStorage.checkAmount);
};

const displayResult = event => {
    // Prevents form from submitting first
    if (!isEdgeIE) {
        event.preventDefault();
        // Loop through all form inputs
        const inputs = document.querySelectorAll(
            "input[type='text'], input[type='date'], input[type='number']",
        );
        for (let input of inputs) {
            // Use sessionStorage to store user input
            sessionStorage.setItem(input.name, input.value);
        }
        // Submits the form
        document.querySelector("#checkLeafForm").submit();
    } else {
        // For Edge and IE
        event.returnValue = false;

        // Get the text field where the converted digit-to-text will be displayed
        const digitToTextField = document.querySelector("#digitToText");

        // Set the digitToTextField to the converted text
        digitToTextField.textContent = dollarsAndCents(
            document.querySelector("#checkAmount").value,
        );
    }
};

const resetForm = () => {
    if (isEdgeIE) {
        const inputs = document.querySelectorAll(
            "input[type='text'], input[type='date'], input[type='number']",
        );
        for (let input of inputs) {
            // Clear all input
            input.value = "";
        }
        // Clear converted text
        document.querySelector("#digitToText").textContent = "";
    }
    sessionStorage.clear();
    location.search = "";
};

const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    // Determines if a form was previously submitted
    if (location.search && !isEdgeIE) {
        // Form was previously submitted
        enterUserData();
    }

    // Add event listener to the form
    const checkForm = document.querySelector("#checkLeafForm");
    checkForm.addEventListener("submit", displayResult);

    // Add event listener for the reset button
    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", resetForm);
};

window.addEventListener("load", createEventListeners);
