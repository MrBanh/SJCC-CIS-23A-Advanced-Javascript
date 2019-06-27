"use strict";

const setUpPage = async () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Depending on assignment, get the rel path to script
    let assignmentScript;
    switch (assignLinksClicked.textContent) {
        case "Assignment 1":
            assignmentScript = "./Assignment1.js"
            break;
        case "Assignment 2":
            assignmentScript = "./Assignment2.js"
            break;
        case "Assignment 3":
            assignmentScript = "./Assignment3.js"
            break;
        case "Assignment 4":
            assignmentScript = "./Assignment4.js"
            break;
        case "Assignment 5":
            assignmentScript = "./Assignment5.js"
            break;
        case "Assignment 6":
            assignmentScript = "./Assignment6.js"
            break;
    }

    // Only import if one of the assignment links was clicked
    if (assignmentScript) {
        const {
            createEventListeners
        } = await import(assignmentScript);
        createEventListeners();
    }

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

}

window.addEventListener("load", setUpPage, false);