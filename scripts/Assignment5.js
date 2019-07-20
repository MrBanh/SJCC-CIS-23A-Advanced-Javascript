"use strict";

const inputRegex = /\[|\]|'|"|\s*,\s*/g;

function clearDefaults() {
    this.value = "";
}

function removeClear() {
    this.removeEventListener("focus", clearDefaults);
}

// TODO: Input Page --- handle user input

// TODO: Output Page --- provide buttons to Continue or Exit

const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    const arrayInput = document.querySelector("#array");
    arrayInput.addEventListener("focus", clearDefaults);
    arrayInput.addEventListener("blur", removeClear);
};

window.addEventListener("load", createEventListeners);
