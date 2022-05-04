let nameField = document.getElementById("name");
let jobSelect = document.getElementById("title");
let otherJobField = document.getElementById("other-job-role");
let shirtColor = document.getElementById("color");
let shirtDesign = document.getElementById("design");
let shirtOptions = shirtColor.children;
let activities = document.getElementById("activities");
let displayCost = document.getElementById("activities-cost");


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

