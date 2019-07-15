"use strict";

// Determines if using Edge or IE
const browserRegex = /Edge|rv:11/g;
var isEdgeIE = browserRegex.test(navigator.userAgent);

/*      INPUT PAGE      */


// TODO: Validate if user exists
const validUser = () => {
    // Check if user already exists in sessionStorage
    // If SSN exists
    // Clear the SS# input
    // If email exists
    // Clear the email input

}


// Save data from input form to sessionStorage
const saveFormData = () => {
    const newPerson = {
        "fName": document.querySelector("#firstName").value,
        "lName": document.querySelector("#lastName").value,
        "dob": document.querySelector("#dob").value,
        "ssn": document.querySelector("#ssn").value,
        "email": document.querySelector("#formEmail").value
    };

    // Removes the sessionStorage entry from VSCode Live Server
    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

    // Add entry to sessionStorage for user input
    const entry = `Entry_${sessionStorage.length + 1}`;
    sessionStorage.setItem(entry, JSON.stringify(newPerson));
}


// Handle form submissions
const submitForm = (event) => {
    if (!isEdgeIE) {
        event.preventDefault();
        // Save the data to sessionStorage
        saveFormData();

        // Submits the form
        document.querySelector("#inputForm").submit();
    }
}


// Validate form data
const validateForm = (form) => {
    return function () {
        if (form.checkValidity()) {
            saveFormData();
            clearForm();
        } else {
            document.querySelector("#inputForm").className = "submitted";
        }
    }
}


// Clears the form
const clearForm = () => {
    window.location.reload();
}


/*      OUTPUT PAGE     */


// Creates a <td></td>
function createTableData(data) {
    const tableData = document.createElement("td");
    tableData.textContent = data;
    return tableData;
}


// Adds a row for each person input
function addPersonToTable() {
    const table = document.querySelector("table");

    // Create a new table row
    const tableRow = document.createElement("tr");

    // Append to the row each data: first name, last name, dob, ssn, and email
    tableRow.appendChild(createTableData(this.fName));
    tableRow.appendChild(createTableData(this.lName));
    tableRow.appendChild(createTableData(this.dob));
    tableRow.appendChild(createTableData(this.ssn));
    tableRow.appendChild(createTableData(this.email));

    // Append the row to the table
    table.appendChild(tableRow);
}


// For instantiating Person object
function Person(fName, lName, dob, ssn, email) {
    this.fName = fName;
    this.lName = lName;
    this.dob = dob;
    this.ssn = ssn;
    this.email = email;
    this.addToTable = addPersonToTable;
}


// Display data to table
const displayResult = () => {
    // Removes the sessionStorage entry from VSCode Live Server
    sessionStorage.removeItem("IsThisFirstTime_Log_From_LiveServer");

    for (let i = 1; i <= sessionStorage.length; i++) {
        // Retrieves data from sessionStorage and parses
        const retrievedObj = JSON.parse(sessionStorage.getItem(`Entry_${i}`));
        const newPerson = new Person(
            retrievedObj.fName,
            retrievedObj.lName,
            retrievedObj.dob,
            retrievedObj.ssn,
            retrievedObj.email
        );

        // Add data to the table
        newPerson.addToTable();
    }
}


// Removes all data from sessionStorage and goes back to the Online Form
const resetEverything = () => {
    sessionStorage.clear();
    document.querySelector("#outputForm").submit();
}


const createEventListeners = () => {
    // Access the selectedLi link
    const assignLinksClicked = document.querySelector("#selectedLi");

    // Move the page down the nav if an assignment link is clicked
    if (assignLinksClicked.textContent !== "Home") {
        document.querySelector("#nav").scrollIntoView();
    }

    // Input Page
    if (location.pathname === "/Assign4.html") {
        // On load, focus on the first name input
        document.querySelector("#firstName").focus();

        // Event handler for the clear button (clears the form)
        const clearBtn = document.querySelector("#reset-btn");
        clearBtn.addEventListener("click", clearForm);

        // Event handler for when the input form is submitted
        const inputForm = document.querySelector("#inputForm");
        inputForm.addEventListener("submit", submitForm);

        // Event handler for when user clicks on next on the input form
        const nextBtn = document.querySelector("#next-btn");
        nextBtn.addEventListener("click", validateForm(inputForm));

    } else if (location.pathname === "/Assign4-output.html") {
        // Output Page
        displayResult();

        // Event handler for the exit button
        const exitBtn = document.querySelector("#exit-btn");
        exitBtn.addEventListener("click", resetEverything);
    }
};

window.addEventListener("load", createEventListeners);