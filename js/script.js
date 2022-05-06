let nameField = document.getElementById("name");
let emailField = document.getElementById("email");
let ccNumField = document.getElementById("cc-num");
let zipField = document.getElementById("zip");
let cvvField = document.getElementById("cvv");
let jobSelect = document.getElementById("title");
let otherJobField = document.getElementById("other-job-role");
let shirtColor = document.getElementById("color");
let shirtDesign = document.getElementById("design");
let shirtOptions = shirtColor.children;
let activities = document.getElementById("activities");
let displayCost = document.getElementById("activities-cost");
let paymentOption = document.getElementById("payment");
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
let bitcoin = document.getElementById("bitcoin");
let form = document.querySelector("form");
let checkboxes = document.querySelectorAll('input[type="checkbox"]');
let activityOptions = document.getElementById("activities-box");
let emailHint = document.getElementById("email-hint");

// Focuses on name field on load
nameField.focus();
// Hides "other job" field on load
otherJobField.style.display = "none";

// Looks for change in job selection, if "other" then gives text input option
jobSelect.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        otherJobField.style.display = "initial";
    } else {
        otherJobField.style.display = "none";
    }
});

// Hides color options on load
shirtColor.disabled = true;

// Shows only the shirt colors that are available for the selected design
shirtDesign.addEventListener("change", (e) => {
    shirtColor.disabled = false;
    for (let i = 0; i < shirtOptions.length; i++) {
        let value = e.target.value;
        let dataTheme = shirtOptions[i].getAttribute("data-theme");
        if (value === dataTheme) {
            shirtOptions[i].hidden = false;
            shirtOptions[i].setAttribute("selected", true);
        } else {
            shirtOptions[i].hidden = true;
            shirtOptions[i].removeAttribute("selected");
        }
    }
})

// Updates cost for activites based on selections
let totalCost = 0;
activities.addEventListener("change", (e) => {
    let activityCost = +e.target.getAttribute("data-cost");
    if (e.target.checked) {
        totalCost += activityCost;
    } else {
        totalCost -= activityCost;
    } 
    displayCost.innerHTML = `Total: $${totalCost}`;
});

// Disables conflicting classes so user cannot select both
activities.addEventListener("change", (e) => {
    for (let i = 0; i < activityOptions.children.length; i++) {
        if (e.target.getAttribute("data-day-and-time") === activityOptions.children[i].children[2].textContent) {
            if (e.target.checked) {
                activityOptions.children[i].classList.add("disabled");
                activityOptions.children[i].children[0].disabled = true;
                e.target.parentNode.classList.remove("disabled");
                e.target.disabled = false;
            } else {
                activityOptions.children[i].classList.remove("disabled");
                activityOptions.children[i].children[0].disabled = false;
            }
        }
        }
})

// if selected check time is equal to other time
// for all activity 

// Hides paypal and bitcoin options on load and selects the credit card option
paypal.hidden = true;
bitcoin.hidden = true;
paymentOption.children[1].setAttribute("selected", true);

// Changes payment info needed depending on payment option selected
paymentOption.addEventListener("change", (e) => {
    if (e.target.value === "paypal") {
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;
    } else if (e.target.value === "bitcoin") {
        paypal.hidden = true;
        bitcoin.hidden = false;
        creditCard.hidden = true;
    } else {
        paypal.hidden = true;
        bitcoin.hidden = true;
        creditCard.hidden = false;
    }
});

// Below set of functions tests each required field to make sure the input is valid
function isNameValid() {
    let name = nameField.value;
    return regexName = /\w+/.test(name);
};
function isEmailValid() {
    let email = emailField.value;
    return regexEmail = /[^@]+@[^@.]+\.com$/i.test(email);
};
function isActivityChecked() {
    if (totalCost === 0) {
        return false;
    } else {
        return true;
    }
};
function isCCNumValid() {
    let ccNum = ccNumField.value;
    return regexCCNum = /^\d{13,16}$/.test(ccNum);
};
function isZipValid() {
    let zip = zipField.value;
    return regexZip = /^\d{5}$/.test(zip);
};
function isCVVValid() {
    let cvv = cvvField.value;
    return regexCVV = /^\d{3}$/.test(cvv);
};

// shows error message when there is missing information
function notValid(field) {
    field.parentNode.classList.add("not-valid");
    field.parentNode.classList.remove("valid");
    field.parentNode.lastElementChild.style.display = "inherit";
}
// removes error message when fixed
function isValid(field) {
    field.parentNode.classList.add("valid");
    field.parentNode.classList.remove("not-valid");
    field.parentNode.lastElementChild.style.display = "none";
}

// Makes sure name is valid as typed
form.addEventListener("keyup", (e) => {
    if (!isNameValid()) {
        e.preventDefault();
        notValid(nameField);
    } else {
        isValid(nameField);
    }
});
// Checks if all fields are valid on submit and provides error messages for missing information
form.addEventListener("submit", (e) => {
    if (!isNameValid()) {
        e.preventDefault();
        notValid(nameField);
    } else {
        isValid(nameField);
    }
    if (!isEmailValid()) {
        e.preventDefault();
        let email = emailField.value
        notValid(emailField);
        if (email === "") {
            emailHint.textContent = `Email field is empty, please enter email address`;
        } else if (/^\w+@\w+.\w+$/.test(email) === false) {
            emailHint.textContent = `Email address is missing "@" symbol`;
        } else {
            emailHint.textContent = "Email address must be formatted correctly";
        }
    } else {
        isValid(emailField);
    }
    if (!isActivityChecked()) {
        e.preventDefault();
        notValid(activityOptions);
    } else {
        isValid(activityOptions);
    }
    if (paymentOption.children[1].selected === true) {
        if (!isCCNumValid()) {
            e.preventDefault();
            notValid(ccNumField);
        } else {
            isValid(ccNumField);
        };
        if (!isZipValid()) {
            e.preventDefault();
            notValid(zipField);
        } else {
            isValid(zipField);
        };
        if (!isCVVValid()) {
            e.preventDefault();
            notValid(cvvField);
        } else {
            isValid(cvvField);
        };
    }
});

// Focuses on checkbox elements depending on which one is selected when tabbing
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("focus", (e) => {
        checkboxes[i].parentNode.classList.add("focus");
    });
    checkboxes[i].addEventListener("blur", (e) => {
        checkboxes[i].parentNode.classList.remove("focus");
    });
};
