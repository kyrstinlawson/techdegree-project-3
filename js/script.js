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

console.log(checkboxes);

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

// Hides color options
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

// Checks if all fields are valid on submit
form.addEventListener("submit", (e) => {
    if (paymentOption.children[1].selected === true) {
        if (!isCCNumValid() || !isZipValid() || !isCVVValid()) {
            e.preventDefault();
        };
    };
    if (!isNameValid() || !isEmailValid() || !isActivityChecked()) {
        e.preventDefault();
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
