import { createNotification } from "../components/notification.js";

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const phoneInput = document.querySelector('#phone-input');
const passwordInput = document.querySelector('#password-input');
const matchInput = document.querySelector('#match-input');
const idNumberInput = document.querySelector('#idNumber-input')
const selectId = document.querySelector('#select-id')
const formBtn = document.querySelector('#form-btn');
const notification = document.querySelector('#notification');

// const birthdateInput = document.querySelector('#birthdate-input');
window.addEventListener('load', () => {
    document.getElementById('preloader').classList.remove('hidden'); // Mostrar el preloader
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden'); // Ocultar el preloader después de un tiempo
    }, 2000); // Ajusta el tiempo de espera según tus necesidades
  });

selectId.addEventListener('change', e => {
    const selectedOption = selectId.value;
    if (selectedOption !== '') {
      idNumberInput.disabled = false; 
      selectId.classList.add('border-2','border-green-500');
    } else {
      idNumberInput.disabled = true; // Deshabilita el input
    }
  });
  

//Regex Validations
const ID_REGEX = /^[{1}[0-9]{6,8}$/;
const NAME_REGEX = /^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+\s([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*)$/;
const PHONE_REGEX = /^[0](412|212|424|426|414|416)[0-9]{7}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-!@#*$%^&()_.,])[a-zA-Z0-9!@#$%*^&()_.,-]{6,}$/;
// const BIRTHDATE_REGEX = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(19[0-9][0-9]|20[0-9][0-9])$/;

//Validaciones

let idValidation = false;
let nameValidation = false;
let phoneValidation = false;
let emailValidation = false;
let passwordValidation = false;
let matchValidation = false;
//let birthdateValidation = false;

//Funcion de Validacion
const validateInput = (input, validation) => {
   
    formBtn.disabled = idValidation && nameValidation && phoneValidation && emailValidation && passwordValidation && matchValidation ? false : true;

    if(input.value === ''){
        input.classList.remove('border-2', 'border-red-500', 'border-green-500');
    } else if (validation){
        input.classList.add('border-2', 'border-green-500');
        input.classList.remove('border-red-500')
    } else {
            input.classList.remove('border-green-500');
            input.classList.add('border-2', 'border-red-500');
        }
}
//Eventos

idNumberInput.addEventListener('input', e => {
    idValidation = ID_REGEX.test(e.target.value);
    validateInput(idNumberInput, idValidation);
    console.log(idValidation);  
});

nameInput.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(e.target.value);
    validateInput(nameInput, nameValidation);  
});

emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_REGEX.test(e.target.value);
    validateInput(emailInput, emailValidation);  
});

phoneInput.addEventListener('input', e => {
    phoneValidation = PHONE_REGEX.test(e.target.value);
    validateInput(phoneInput, phoneValidation);  
});

passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_REGEX.test(e.target.value);
    matchValidation = e.target.value === matchInput.value;
    validateInput(passwordInput, passwordValidation);  
});

matchInput.addEventListener('input', e => {
    matchValidation = e.target.value === passwordInput.value;
    validateInput(matchInput, matchValidation);  
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    formBtn.classList.add('animate-pulse');
    formBtn.innerText = 'Registrando...';

    try {
        const newUser = {
            idNumber: idNumberInput.value,
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            password: passwordInput.value,
        }
        const { data } = await axios.post('/api/users', newUser);
        createNotification(false, data);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
        idNumberInput.value = '';
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        passwordInput.value = '';
        matchInput.value = '';
        selectId.value = '';
        formBtn.disabled = true;
        idNumberInput.disabled = true;
        idValidation = false;
        phoneValidation = false;
        nameValidation = false;
        passwordValidation = false;
        emailValidation = false;
        matchValidation = false;
        selectId.classList.remove('border-2','border-green-500');
        idNumberInput.classList.remove('border-2','border-green-500');
        nameInput.classList.remove('border-2','border-green-500');
        emailInput.classList.remove('border-2','border-green-500');
        phoneInput.classList.remove('border-2','border-green-500');
        passwordInput.classList.remove('border-2','border-green-500');
        matchInput.classList.remove('border-2','border-green-500');
        formBtn.classList.remove('animate-pulse');
        formBtn.innerText = 'Registrar';
    } catch (error) {
        createNotification(true, error.response.data.error);
        setTimeout(() => {
            notification.innerHTML = '';
        }, 3000);
        formBtn.classList.remove('animate-pulse');
        formBtn.innerText = 'Registrar';
    }
})
        




