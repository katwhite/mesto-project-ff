export const formValidationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  };

export function enableValidation({formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass}) {
        const formList = Array.from(document.querySelectorAll(`${formSelector}`));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', function (evt) {
                evt.preventDefault();
            });
        
            const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
            const buttonElement = formElement.querySelector(`${submitButtonSelector}`);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);

            inputList.forEach((inputElement) => {
                inputElement.addEventListener('input', function () {
                    checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
                    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
                });
            });
          
        });
}

export function clearValidation(formElement, formValidationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(`${formValidationConfig.inputSelector}`));
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, formValidationConfig.inputErrorClass, formValidationConfig.errorClass);
        toggleButtonState(inputList, formElement.querySelector(`${formValidationConfig.submitButtonSelector}`), formValidationConfig.inactiveButtonClass);
    });
    
}

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(`${inputErrorClass}`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
inputElement.classList.remove(`${inputErrorClass}`);
errorElement.classList.remove(`${errorClass}`);
errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }
    else {
        inputElement.setCustomValidity("");
    } 
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

const hasInvalidInput = (inputList) => {
return inputList.some((input) => {
    return !input.validity.valid;
})
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${inactiveButtonClass}`);
    buttonElement.setAttribute('disabled', true);
}
else {
    buttonElement.classList.remove(`${inactiveButtonClass}`);
    buttonElement.removeAttribute('disabled');
};
}
  
