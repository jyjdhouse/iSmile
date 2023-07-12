import { isLetter, isNumeric } from "./utils.js";

window.addEventListener('load', () => {

    const optionsLi = document.querySelectorAll('.profile-option-item')
    const fieldOptionContainer = document.querySelectorAll('.profile-selected-field-container')
    const editContentBtn = document.querySelectorAll('.edit-content')
    const submitFormBtn = document.querySelectorAll('.submit-form')
    const inputs = document.querySelectorAll('.profile-input input')
    const radioButtons = document.querySelectorAll('.radio-label-container input')
    const urlString = window.location.search;
    const urlParams = new URLSearchParams(urlString);
    const param = urlParams.get('completeForm');
    // disableo los radios
    radioButtons.forEach(radio => {
        radio.disabled = true
    })


    // si el valor del param es true, pongo para completar formulario
    if (param) {
        if (window.innerWidth <= 768) { //Mobile
            const secondParent = document.querySelectorAll('.profile-selected-field-container')
            secondParent.forEach(div => {
                const firstParent = div.closest('.options-selected-container')
                const spanParent = div.querySelectorAll('.profile-field-container')
                spanParent.forEach(span => {
                    if(span?.classList.contains('unique-email-field'))return
                    span?.querySelector('span').classList.add('span-inactive')
                })
                const inputContainers = div.querySelectorAll('.profile-input')
                inputContainers.forEach(cont => { 
                    cont?.classList.remove('input-container-inactive')
                    cont?.classList.add('input-container-active');
                })
                firstParent.style.height = `${firstParent.offsetHeight + 10}px`
            })

            editContentBtn.forEach(btn => {
                btn.classList.add('form-btn-inactive')
                btn.nextElementSibling.classList.remove('form-btn-inactive')
            })

            radioButtons.forEach(radio => {
                radio.disabled = false
            })
        } else {
            const secondParent = document.querySelectorAll('.profile-data-container')
            secondParent.forEach(div => {
                const spanParent = div.querySelectorAll('.profile-field-container')
                spanParent.forEach(span => {
                    if(span?.classList.contains('unique-email-field'))return
                    span?.querySelector('span')?.classList.add('span-inactive')
                })
                const inputContainers = div.querySelectorAll('.profile-data-container .profile-input')
                inputContainers.forEach(cont => { 
                    cont?.classList.remove('input-container-inactive')
                    cont?.classList.add('input-container-active')
                })
            })
            editContentBtn.forEach(btn => {
                btn?.classList.add('form-btn-inactive')
                btn?.nextElementSibling.classList.remove('form-btn-inactive')
            })
            radioButtons.forEach(radio => {
                radio.disabled = false
            })
        }
    }


    // permito que el input cambie el valor asignado por el usuario
    inputs.forEach(input => {
        input.addEventListener('change', (e) => {
            input.value = e.target.value
        })
    })

    // cambio las clases de los contenedores para que se active el que es requerido
    optionsLi.forEach((li, indexLi) => {
        li.addEventListener('click', () => {

            if (!li.classList.contains('profile-option-item-active')) {

                const parent = li.closest('.profile-options-list')
                const liActive = parent.querySelector('.profile-option-item-active')
                liActive.classList.remove('profile-option-item-active')

                for (let fieldIndex = 0; fieldIndex < fieldOptionContainer.length; fieldIndex++) {
                    if (fieldIndex == indexLi) {
                        optionsLi[indexLi].classList.add('profile-option-item-active')
                        fieldOptionContainer[fieldIndex].classList.add('profile-selected-field-container-active')
                    } else {
                        fieldOptionContainer[fieldIndex].classList.remove('profile-selected-field-container-active')
                    }
                }
            }


        })
    })


    // veo cual edit content btn toca el usuario para hacer el display del form y los inputs
    editContentBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            if (window.innerWidth <= 768) {
                const secondParent = document.querySelectorAll('.profile-selected-field-container')
                secondParent.forEach(div => {
                    const firstParent = div.closest('.options-selected-container')
                    const spanParent = div.querySelectorAll('.profile-field-container')
                    spanParent.forEach(span => {
                        if(span?.classList.contains('unique-email-field'))return
                        span?.querySelector('span').classList.add('span-inactive')

                    })
                    const inputContainers = div.querySelectorAll('.profile-input')
                    inputContainers.forEach(cont => { 
                        cont?.classList.remove('input-container-inactive')
                        cont?.classList.add('input-container-active')
                    })
                    firstParent.style.height = `${firstParent.offsetHeight + 10}px`
                })

                btn.classList.add('form-btn-inactive')
                btn.nextElementSibling.classList.remove('form-btn-inactive')

                radioButtons.forEach(radio => {
                    radio.disabled = false
                })
            } else {
                const secondParent = document.querySelectorAll('.profile-data-container')
                secondParent.forEach(div => {
                    const spanParent = div.querySelectorAll('.profile-field-container')
                    spanParent.forEach(span => {
                        if(span?.classList.contains('unique-email-field'))return
                        span?.querySelector('span')?.classList.add('span-inactive')
                    })
                    const inputContainers = div.querySelectorAll('.profile-data-container .profile-input')
                    inputContainers.forEach(cont => { 
                        cont?.classList.remove('input-container-inactive')
                        cont?.classList.add('input-container-active')
                    })
                })
                btn.classList.add('form-btn-inactive')
                btn.nextElementSibling?.classList.remove('form-btn-inactive')
                radioButtons.forEach(radio => {
                    radio.disabled = false
                })
            }
        })
    });
    // Logica para que todos los inputs numericos no acepten letras
    let numericInputs = document.querySelectorAll('.numeric-only-input');
    numericInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (!isNumeric(inputValue)) { // Si no es un número, borra el contenido del campo
                e.target.value = lastInputValue;
            } else {
                lastInputValue = inputValue; // Almacenar el último valor válido
            }
        });
    });

    // Logica para que todos los input de solo letras no acepten numeros
    let letterInputs = document.querySelectorAll('.letter-only-input');
    letterInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (!isLetter(inputValue)) { // Si no es letra, borra el contenido del campo
                e.target.value = lastInputValue;
            } else {
                lastInputValue = inputValue; // Almacenar el último valor válido
            }
        });
    });

    // Logica para no permitir envio de formulario si no se completa lo requerido
    const sendFormBtns = document.querySelectorAll('.send-user-info-form-btn');
    sendFormBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Agarro el formulario que envio
            const form = btn.closest('.user-info-form');
            // Bandera para saber si se completo lo necesario
            let flag = true;
            //Agarro los inputs requeridos
            const requiredInputs = form.querySelectorAll('.required');
            requiredInputs.forEach(input => {
                if (!input.value) {
                    flag = false;
                    // Armo el mensaje de error
                    // Crear el mensaje adicional
                    const additionalMessage = document.createElement('span');
                    additionalMessage.classList.add('error-msg');
                    additionalMessage.innerHTML = 'Debes completar el campo'
                    // Insertar el mensaje adicional después del input
                    input.closest('div').appendChild(additionalMessage);
                }
            });
            if (!flag) {
                e.preventDefault();
            }
        })
    });

    // Logica para que los sin especificar en gris
    let formSpans = document.querySelectorAll('.profile-field-container span');
    formSpans.forEach(span => {
        if (span.innerHTML.includes('Sin especificar')) {
            span.classList.add('grey')
        }
    });

    // Logica para boton "Cambiar password"
    let changePassBtns = document.querySelectorAll('.change-password-btn');
    changePassBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            let response = (await (await fetch('/api/user/change-password')).json());
            console.log(response);
            if (response.ok) {
                alert(response.msg)
            }
        });
    })



})