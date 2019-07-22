"use strict";

const browserRegex = /Edge|rv:11/g;
var isEdgeIE = browserRegex.test(navigator.userAgent);

const digitToTextHelper = nStr => {
    let n = Number(nStr);

    if (n < 20) {
        const units = [
            "zero",
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
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
        return units[n];
    } else if (n >= 20 && n < 100) {
        const tens = [
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

        return Number(nStr.slice(1)) === 0
            ? // If nStr ends with a 0 (e.g. "20" ends with zero, don't want "twenty zero")
              tens[Number(nStr[0])]
            : // If nStr ends with 1 - 9 (e.g. "59" --> take the "9" and recursively call digitToTextHelper to get "nine")
              tens[Number(nStr[0])] + " " + digitToTextHelper(nStr.slice(1));
    } else {
        return Number(nStr.slice(1)) === 0
            ? // If nStr ends with a 0 (e.g. "100" ends with zero, don't want "one hundred zero")
              digitToTextHelper(nStr[0]) + " hundred"
            : // if nStr ends with 1 - 99 (e.g. "155" --> take the "55" and recursively call digitToTextHelper to get "fifty five")
              digitToTextHelper(nStr[0]) +
                  " hundred " +
                  digitToTextHelper(nStr.slice(1));
    }
};

const digitToText = n => {
    const numRegex = /(\d{1,3})/g;
    // Since we want to start matching from the end of the number
    // Convert the number to a string (e.g. 31546413 --> "31546413")
    let nStr = n.toString();
    // Reverse order of numbers (e.g. "31546413" --> "31464513")
    let nStrReversed = nStr
        .split("")
        .reverse()
        .join("");
    // Get the group of digits (e.g. "31464513" returns ["314", "645", "13"])
    let numGroups = nStrReversed.match(numRegex);
    // Reverse each group of digits back to the original order (e.g. ["314", "645", "13"] --> ["413", "546", "31"])
    // The last .reverse() reverses the array so the numbers are in the original order (e.g. ["413", "546", "31"] --> ["31", "546", "413"])
    numGroups = numGroups
        .map(numGroup =>
            numGroup
                .split("")
                .reverse()
                .join(""),
        )
        .reverse();

    // If the numGroups contains 3 groups --> starts with "million"
    // e.g. ["31", "546", "413"].length is 3 -->  starts with "million"
    let scale = numGroups.length;
    const scales = [
        "",
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
        "decillion",
        "undecillion",
        "duodecillion",
        "tredecillion",
        "quatttuor-decillion",
        "quindecillion",
        "sexdecillion",
        "septen-decillion",
        "octodecillion",
        "novemdecillion",
        "vigintillion",
        "centillion",
    ];

    // Appends to the result array
    let result = [];
    for (let group of numGroups) {
        // Go through each group in the numGroups (e.g. ["31", "546", "413"])
        // Convert each group to the text equivalent (e.g. "thirty one")
        // Depending on the length of the numGroups, also include the scale (e.g. "million")
        result.push(`${digitToTextHelper(group)} ${scales[scale]}`);
        // Go down to the next scale (e.g. "million", then "thousand")
        scale--;
    }

    // Return Array joined together by comma and space to form a string
    return result.join(", ");
};

const dollarsAndCents = amount => {
    let amountStr = amount.toFixed(2);
    let dollars;
    let cents;
    if (amountStr.indexOf(".") > -1) {
        // Split the check amount by the .
        dollars = Number(amountStr.split(".")[0]) || 0;
        cents = Number(amountStr.split(".")[1]) || 0;
        return (
            `${digitToText(dollars)} dollars` +
            ` and ${digitToText(cents)} cents`
        );
    } else {
        dollars = Number(amountStr);
        return `${digitToText(dollars)} dollars and zero cents`;
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
    digitToTextField.textContent = dollarsAndCents(
        Number(sessionStorage.checkAmount),
    );
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
            Number(document.querySelector("#checkAmount").value),
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
