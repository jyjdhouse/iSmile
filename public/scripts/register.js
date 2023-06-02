import { activateClass } from './utils.js';

window.addEventListener('load', () => {

    const form = document.querySelector('.registration-form')
    const formInputRequired = document.querySelectorAll('.required-input')
    const addressInputs = document.querySelectorAll('.address-inputs-container input')
    const password = document.getElementById('first-password');
    const passwordRepeated = document.getElementById('repeat-password');
    const passwordInputs = document.querySelectorAll('.register-password-inp');
    const body = document.querySelector('body');
    const addAddressBtn = document.querySelector('.add-address-btn')
    const addressInputsContainer = document.querySelector('.address-inputs-container')

    const registrationFormContainer = 'registration-form-container';
    const blackScreen = 'black-screen';
    let classesToActivate = []

    let submitFormFlag = true
    let isAddAddressOpen = false

    addAddressBtn?.addEventListener('click', (e) => {
        e.preventDefault()
        addressInputsContainer.classList.toggle('address-inputs-container-active')
        isAddAddressOpen = !isAddAddressOpen
    })

    form?.addEventListener('submit', (e) => {
        e.preventDefault()
        formInputRequired.forEach(input => {
            console.log(input)
            if (!input.value) {
                const inputParent = input.closest('.registration-input-field')
                const errorFrontContainer = inputParent.querySelector('.error-front')
                errorFrontContainer.innerHTML = `
                    <p class='front-error'>Este campo no puede estar vacío</p>
                `
                submitFormFlag = false
            }
        })

        if (isAddAddressOpen) {
            addressInputs.forEach(input => {
                if (!input.value) {
                    const inputParent = input.closest('.registration-input-field')

                    const errorFrontContainer = inputParent.querySelector('.error-front')
                    errorFrontContainer.innerHTML = `
                        <p class='front-error'>Este campo no puede estar vacío si agregar dirección está activo</p>
                    `
                    submitFormFlag = false
                }
            })
        }


        if (password.value != passwordRepeated.value) {

            passwordInputs.forEach(input => {
                const inputParent = input.closest('.registration-input-field')
                const errorFrontContainer = inputParent.querySelector('.error-front')
                if (!input.value) {
                    errorFrontContainer.innerHTML = `
                    <p class='front-error'>Este campo no puede estar vacío</p>
                `
                }

                errorFrontContainer.innerHTML = `
                    <p class='front-error'>Las contraseñas no coinciden</p>
                `
            })
            submitFormFlag = false
        }

        console.log(submitFormFlag)
        if (submitFormFlag) {
            form.submit()
        }

    })

    const queryString = window.location.search; //obtener la cadena de consulta
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get('errors')) { //Si vienen errores
        body.classList.add('noScroll');
        classesToActivate = [registrationFormContainer, blackScreen];
        activateClass(classesToActivate);
    }

    // LOGICA PARA SELECT DE PHONE_CODE
    // const countryCodesSelect = document.querySelector('.prefix-phone');
    // countryCodesSelect.addEventListener('click', () => {
    //     countryCodesSelect.size = 5;
    // });
    // countryCodesSelect.addEventListener('blur', () => {
    //     countryCodesSelect.size = 1;
    // })
})
