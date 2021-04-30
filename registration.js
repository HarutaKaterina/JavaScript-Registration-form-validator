const form = document.getElementById("form");
const userName = document.getElementById("username");
const email = document.getElementById("email");
const passwordFirst = document.getElementById("password");
const passwordSecond = document.getElementById("passwordConfirm");

function checkEmail(input) {
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.value.trim().match(pattern)) {
        showSuccess(input);
    }
    else {
        showError(input, `Email is not valid`);
    }
}


function showError(input, message) {
    const formControler = input.parentElement;
    const small = formControler.querySelector("small");
    formControler.classList.remove("success");
    formControler.classList.add("error");
    small.innerHTML = message;
}


function showSuccess(input) {
    const formControler = input.parentElement;
    formControler.classList.remove("error");
    formControler.classList.add("success");
}


function getFieldName(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
}

function checkRequired(input) {
    input.forEach(function (input) {
        if (input.value.trim() === "") {
            showError(input, `${getFieldName(input.id)} is required`);
        }
        else {
            showSuccess(input);
        }
    });
}


function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input.id)} must be at least ${min} characters`);
    }
    else if (input.value.length > max) {
        showError(input, `${getFieldName(input.id)} must be less than ${max} characters`);
    }
    else {
        showSuccess(input);
    }
}


function checkPasswordMatch(input1, input2) {
    if (input2.value !== input1.value) {
        showError(input2, `Passwords do not match`);
    }
}


form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkRequired([userName, email, passwordFirst, passwordSecond]);
    checkEmail(email);
    checkLength(userName, 3, 15);
    checkLength(passwordFirst, 6, 25);
    checkPasswordMatch(passwordFirst, passwordSecond);
    
});