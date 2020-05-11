// этот скрипт отвечает за поведение placeholder

let inputs = document.querySelectorAll('.form__input');

for (let i = 0; i < inputs.length; i++) {
    inputs[i].onfocus = function() {
        inputs[i].classList.add('form__input--active')
    };

    inputs[i].onblur = function() {

        if (inputs[i].value === "") {
            inputs[i].classList.remove("form__input--active")
        };
    }
}

// валидация данных формы


let form = document.querySelector(".form");
let email = document.querySelector('#form__email');
let password = document.querySelector('#form__password');
let checkbox = document.querySelector('#form__checkbox');
let formButton = document.querySelector('.form__submit');
let notification = document.querySelector('.form-notification');
let notificationText = document.querySelector('.form-notification__textcontent');

var xhr = new XMLHttpRequest();

email.oninput = function() {

    email.classList.remove('form__input--invalid');
    notification.classList.remove('form-notification--error');
}

password.oninput = function() {
    password.classList.remove('form__input--invalid');
    notification.classList.remove('form-notification--error');


}

emailValidation = function() {
    if (email.checkValidity()) {

        return true;
    } else {
        email.classList.add('form__input--invalid');
        return false
    }
}

passwordValidation = function() {
    if (password.checkValidity()) {

        return true;
    } else {
        password.classList.add('form__input--invalid');
        return false
    }

}

checkboxValidation = function() {
    if (checkbox.checkValidity()) {
        return true;
    } else {
        notification.classList.add('form-notification--error');
        notificationText.textContent = 'Необходимо ознакомиться и принять соглашение об оказании услуг'
    }
}


formValidation = function() {
    if (emailValidation() && passwordValidation() && checkboxValidation()) {
        return true
    } else return false
}

//работа с запросами

formButton.addEventListener('click', function(e) {
    e.preventDefault();
    if (formValidation()) {

        let currency = document.querySelector('.radio-buttons__hidden-button:checked');
        const data = { mail: email.value, password: password.value, currency: currency.value };
        console.log(data); //для проверки того, что данные обработаны верно
        xhr.open('get', './emails.json');
        xhr.send();
        xhr.responseType = "json";
        notification.classList.remove('form-notification--error');
    }

})


xhr.addEventListener('load', function() {
    let response = xhr.response;
    checkResponse = function() {
        for (let i = 0; i < response.length; i++) {
            console.log(response[i]);
            if (response[i].mail === email.value) {

                return true

            }
        }
    };
    if (checkResponse()) {

        notification.classList.add('form-notification--error');

        notificationText.textContent = 'Учетная запись с таким e-mail уже существует';

    } else {
        notification.classList.add('form-notification--ok');
        notificationText.textContent = 'Регистрация прошла успешно';

        setTimeout(() => notification.classList.remove('form-notification--ok'), 1500)
    }










})