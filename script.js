const form = document.getElementById('registrationForm');
const loginInput = document.getElementById('login');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const phoneInput = document.getElementById('phone');
const birthdateInput = document.getElementById('birthdate');

function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('valid');
    errorElement.textContent = message;
}

function clearError(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('valid');
    errorElement.textContent = '';
}

function validateLogin() {
    const login = loginInput.value.trim();
    const errorElement = document.getElementById('loginError');
    
    if (login.length < 5) {
        showError(loginInput, errorElement, 'Логін повинен містити мінімум 5 символів');
        return false;
    }
    
    clearError(loginInput, errorElement);
    return true;
}

function validateName() {
    const name = nameInput.value.trim();
    const errorElement = document.getElementById('nameError');
    const lettersOnly = /^[а-яА-ЯёЁa-zA-Z\s]+$/;
    
    if (!name) {
        showError(nameInput, errorElement, 'Ім\'я є обов\'язковим полем');
        return false;
    }
    
    if (!lettersOnly.test(name)) {
        showError(nameInput, errorElement, 'Ім\'я повинно містити лише літери');
        return false;
    }
    
    clearError(nameInput, errorElement);
    return true;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const errorElement = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showError(emailInput, errorElement, 'Електронна пошта є обов\'язковим полем');
        return false;
    }
    
    if (!email.includes('@')) {
        showError(emailInput, errorElement, 'Електронна пошта повинна містити символ @');
        return false;
    }
    
    if (!emailRegex.test(email)) {
        showError(emailInput, errorElement, 'Введіть коректну електронну пошту з доменним ім\'ям');
        return false;
    }
    
    clearError(emailInput, errorElement);
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const errorElement = document.getElementById('passwordError');
    
    if (password.length < 8) {
        showError(passwordInput, errorElement, 'Пароль повинен містити мінімум 8 символів');
        return false;
    }
    
    if (!/[A-ZА-ЯЁ]/.test(password)) {
        showError(passwordInput, errorElement, 'Пароль повинен містити хоча б одну велику літеру');
        return false;
    }
    
    if (!/[0-9]/.test(password)) {
        showError(passwordInput, errorElement, 'Пароль повинен містити хоча б одну цифру');
        return false;
    }
    
    clearError(passwordInput, errorElement);
    return true;
}

function validatePhone() {
    const phone = phoneInput.value.trim();
    const errorElement = document.getElementById('phoneError');
    
    if (!phone) {
        showError(phoneInput, errorElement, 'Номер телефону є обов\'язковим полем');
        return false;
    }
    
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.replace(/\D/g, '').length < 10) {
        showError(phoneInput, errorElement, 'Введіть коректний номер телефону');
        return false;
    }
    
    clearError(phoneInput, errorElement);
    return true;
}

function validateBirthdate() {
    const birthdate = birthdateInput.value;
    const errorElement = document.getElementById('birthdateError');
    
    if (!birthdate) {
        showError(birthdateInput, errorElement, 'Дата народження є обов\'язковим полем');
        return false;
    }
    
    const selectedDate = new Date(birthdate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(selectedDate.getTime())) {
        showError(birthdateInput, errorElement, 'Введіть коректну дату');
        return false;
    }
    
    if (selectedDate > today) {
        showError(birthdateInput, errorElement, 'Дата народження не може бути в майбутньому');
        return false;
    }
    
    clearError(birthdateInput, errorElement);
    return true;
}

loginInput.addEventListener('blur', validateLogin);
loginInput.addEventListener('input', function() {
    if (loginInput.classList.contains('error')) {
        validateLogin();
    }
});

nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', function() {
    if (nameInput.classList.contains('error')) {
        validateName();
    }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', function() {
    if (emailInput.classList.contains('error')) {
        validateEmail();
    }
});

passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', function() {
    if (passwordInput.classList.contains('error')) {
        validatePassword();
    }
});

phoneInput.addEventListener('blur', validatePhone);
phoneInput.addEventListener('input', function() {
    if (phoneInput.classList.contains('error')) {
        validatePhone();
    }
});

birthdateInput.addEventListener('blur', validateBirthdate);
birthdateInput.addEventListener('change', function() {
    if (birthdateInput.classList.contains('error')) {
        validateBirthdate();
    }
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const isLoginValid = validateLogin();
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isPhoneValid = validatePhone();
    const isBirthdateValid = validateBirthdate();
    
    if (isLoginValid && isNameValid && isEmailValid && isPasswordValid && isPhoneValid && isBirthdateValid) {
        alert('Форма успішно відправлена! Всі дані валідні.');
    } else {
        alert('Будь ласка, виправте помилки в формі перед відправкою.');
    }
});

