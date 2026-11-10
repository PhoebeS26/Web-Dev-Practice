// references to html elements
const nameInput = document.getElementById("name")
const cardInput = document.getElementById("card")
const emailInput = document.getElementById("email")
const bookingForm = document.getElementById("booking-form");

// references to error messages
const nameError = document.getElementById("name-error")
const emailError = document.getElementById("email-error")
const cardError = document.getElementById("card-error")

// validate name using regex
function validateName(fullName) {
    const regexPattern = /^[A-Z][a-z]+ [A-Z][a-z]+(-[A-Z][a-z]+)?$/
    const isValid = regexPattern.test(fullName)
    if (!isValid) {
        console.log("name is invalid")
        nameError.textContent = "please enter at least your given and family name"
    }
    else {
        console.log("name is valid")
        nameError.textContent = ""
    }
    return isValid
}

// check whether email is valid
function validateEmail() {
    const isValid = emailInput.validity.valid
    if (!isValid) {
        console.log("email is invalid")
        emailError.textContent = "please enter a valid email address"
    }
    else {
        console.log("email is valid")
        emailError.textContent = ""
    }
    return isValid
}

// luhn algorithm to validate card number
function check(cardNo) {
    const nDigits = cardNo.length
    let nSum = 0
    let isSecond = false

    for (let i = nDigits - 1; i >= 0; i--) {
        let d = Number(cardNo[i])

        if (isSecond == true) {
            d = d * 2
        }

        nSum += Math.floor(d / 10)
        nSum += d % 10

        isSecond = !isSecond
    }
    return (nSum % 10 == 0)
}

// reject card numbers containing 0s only
function checkZeroValue(cardNo) {
    if (cardNo.split("").every(digit => digit === "0")) {
        console.log("card is invalid")
        return false
    }
    else {
        console.log("card is valid")
    }

    return true
}

// check card numbers format length and validity
function validateCard(cardNo) {
    const isDigitsOnly = /^[0-9]+$/.test(cardNo)
    const isValidLength = cardNo.length === 16

    if (isDigitsOnly && isValidLength && check(cardNo) && checkZeroValue(cardNo)) {
        console.log("card is valid")
        cardError.textContent = ""
        return true
    }
    else {
        console.log("card is invalid")
        cardError.textContent = "please enter a valid proxy credit card number"
        return false
    }
}

// validate fields when user leaves them
nameInput.addEventListener("blur", function () {
    validateName(nameInput.value)
})

emailInput.addEventListener("blur", function () {
    validateEmail()
})

cardInput.addEventListener("blur", function () {
    validateCard(cardInput.value)
})

// handle form submission
bookingForm.addEventListener("submit", function (e) {
    // stop browser from submitting the form normally
    e.preventDefault();
    console.log("submit clicked")

    const validateNameResult = validateName(nameInput.value);
    const validateCardResult = validateCard(cardInput.value)
    const validateEmailResult = validateEmail()

    console.log(validateNameResult, validateCardResult, validateEmailResult)

    // only open the email client if all three fields are valid
    if (validateNameResult && validateCardResult && validateEmailResult) {
        const emailBody = `Name: ${nameInput.value}
             Email: ${emailInput.value} 
             Card: ${cardInput.value}`
        const emailLink = "mailto:challenge@dn-uk.com?subject=Course Booking&body=" + encodeURIComponent(emailBody)
        console.log(emailLink)
        window.location.href = emailLink
    }
    else {
        console.log("invalid information not submitted")
    }
});