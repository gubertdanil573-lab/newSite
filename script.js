const form = document.getElementById("registerForm");
const formBlock = document.getElementById("formBlock");
const successBlock = document.getElementById("successBlock");
const submitBtn = document.getElementById("submitBtn");
const backBtn = document.getElementById("backBtn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const specialtySelect = document.getElementById("specialty");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const agreeCheckbox = document.getElementById("agree");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const specialtyError = document.getElementById("specialtyError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const agreeError = document.getElementById("agreeError");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const rulesLink = document.getElementById("rulesLink");
const rulesModal = document.getElementById("rulesModal");
const closeModal = document.getElementById("closeModal");
const modalOk = document.getElementById("modalOk");


function setupToggle(btn, input) {
    btn.addEventListener("click", () => {
        if (input.type === "password") {
            input.type = "text";
            btn.textContent = "Скрыть";
        } else {
            input.type = "password";
            btn.textContent = "Показать";
        }
    });
}

setupToggle(togglePassword, passwordInput);
setupToggle(toggleConfirmPassword, confirmPasswordInput);

function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-ZА-Я]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-zА-Яа-я0-9]/.test(password)) score++;

    strengthBar.className = "strength-bar";
    strengthText.className = "strength-text";

    if (password.length === 0) {
        strengthBar.style.width = "0%";
        strengthText.textContent = "";
        return;
    }

    if (score <= 2) {
        strengthBar.classList.add("weak");
        strengthText.classList.add("weak");
        strengthText.textContent = "Слабый пароль";
    } else if (score <= 3) {
        strengthBar.classList.add("medium");
        strengthText.classList.add("medium");
        strengthText.textContent = "Средний пароль";
    } else {
        strengthBar.classList.add("strong");
        strengthText.classList.add("strong");
        strengthText.textContent = "Надёжный пароль";
    }
}

passwordInput.addEventListener("input", () => {
    checkPasswordStrength(passwordInput.value);
    validateField(passwordInput, passwordError, validatePassword);
    // Также проверяем совпадение, если подтверждение уже заполнено
    if (confirmPasswordInput.value) {
        validateField(confirmPasswordInput, confirmPasswordError, validateConfirm);
    }
});


function validateName() {
    const value = nameInput.value.trim();
    if (!value) return "Введите имя";
    if (value.length < 2) return "Имя слишком короткое";
    return "";
}

function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) return "Введите электронную почту";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return "Некорректный email";
    return "";
}

function validateSpecialty() {
    if (!specialtySelect.value) return "Выберите специальность";
    return "";
}

function validatePassword() {
    if (passwordInput.value.length < 6) {
        return "Пароль должен быть не менее 6 символов";
    }
    return "";
}

function validateConfirm() {
    if (confirmPasswordInput.value !== passwordInput.value) {
        return "Пароли не совпадают";
    }
    return "";
}

function validateAgree() {
    if (!agreeCheckbox.checked) return "Необходимо согласиться с правилами";
    return "";
}


function validateField(input, errorEl, validator) {
    const error = validator();
    errorEl.textContent = error;

    if (error) {
        input.classList.add("invalid");
        input.classList.remove("valid");
        return false;
    } else {
        input.classList.remove("invalid");
        if (input.value.trim() || input.tagName === "SELECT") {
            input.classList.add("valid");
        }
        return true;
    }
}


nameInput.addEventListener("input", () => validateField(nameInput, nameError, validateName));
emailInput.addEventListener("input", () => validateField(emailInput, emailError, validateEmail));
specialtySelect.addEventListener("change", () => validateField(specialtySelect, specialtyError, validateSpecialty));
confirmPasswordInput.addEventListener("input", () => validateField(confirmPasswordInput, confirmPasswordError, validateConfirm));
agreeCheckbox.addEventListener("change", () => {
    agreeError.textContent = validateAgree();
});


rulesLink.addEventListener("click", (e) => {
    e.preventDefault();
    rulesModal.classList.add("active");
});

function closeRulesModal() {
    rulesModal.classList.remove("active");
}

closeModal.addEventListener("click", closeRulesModal);
modalOk.addEventListener("click", closeRulesModal);

rulesModal.addEventListener("click", (e) => {
    if (e.target === rulesModal) closeRulesModal();
});

// ===== Отправка формы =====
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Очистка ошибок
    nameError.textContent = "";
    emailError.textContent = "";
    specialtyError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    agreeError.textContent = "";

    let valid = true;

    if (!validateField(nameInput, nameError, validateName)) valid = false;
    if (!validateField(emailInput, emailError, validateEmail)) valid = false;
    if (!validateField(specialtySelect, specialtyError, validateSpecialty)) valid = false;
    if (!validateField(passwordInput, passwordError, validatePassword)) valid = false;
    if (!validateField(confirmPasswordInput, confirmPasswordError, validateConfirm)) valid = false;

    const agreeMsg = validateAgree();
    if (agreeMsg) {
        agreeError.textContent = agreeMsg;
        valid = false;
    }

    if (!valid) return;

    
    submitBtn.classList.add("loading");
    submitBtn.disabled = true;

   
    setTimeout(() => {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;

        // Показываем экран успеха
        formBlock.classList.add("hidden");
        successBlock.classList.add("active");
    }, 1400);
});


backBtn.addEventListener("click", () => {
    successBlock.classList.remove("active");
    formBlock.classList.remove("hidden");
    form.reset();

  
    [nameInput, emailInput, specialtySelect, passwordInput, confirmPasswordInput].forEach(el => {
        el.classList.remove("valid", "invalid");
    });

    strengthBar.className = "strength-bar";
    strengthBar.style.width = "0%";
    strengthText.textContent = "";
    strengthText.className = "strength-text";
});