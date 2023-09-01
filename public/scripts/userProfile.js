import { checkForNumericInputs, isLetter } from "./utils.js";

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

    inputs.forEach(inp => {
        inp.addEventListener('change', (e) => {
            inp.value = e.target.value
        })
    })

    // si el valor del param es true, pongo para completar formulario
    if (param) {
        if (window.innerWidth <= 768) { //Mobile
            const secondParent = document.querySelectorAll('.profile-selected-field-container')
            secondParent.forEach(div => {
                const firstParent = div.closest('.options-selected-container')
                const spanParent = div.querySelectorAll('.profile-field-container')
                spanParent.forEach(span => {
                    if (span?.classList.contains('unique-email-field')) return
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
                    if (span?.classList.contains('unique-email-field')) return
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
            const requiredInputs = document.querySelectorAll('.desktop-required');
            requiredInputs.forEach(input => {
                let div = document.createElement('div');
                div.classList.add('error-msg-container');
                input.closest('.profile-field-container').appendChild(div);
                // Armo el mensaje de error
                // Crear el mensaje adiciónal
                const additionalMessage = document.createElement('span');
                additionalMessage.classList.add('error-msg');
                additionalMessage.innerHTML = 'Campo requerido'
                // Insertar el mensaje adiciónal después del input
                div.appendChild(additionalMessage)
            });
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

    const handleMobileClickBtn = (btn, method) => {
        const secondParent = document.querySelectorAll('.profile-selected-field-container')
        secondParent.forEach(div => {
            const firstParent = div.closest('.options-selected-container')
            const spanParent = div.querySelectorAll('.profile-field-container')
            spanParent.forEach(parent => {
                if (parent?.classList.contains('unique-email-field')) return
                let spanTrue;
                if (parent && method == 'add') {
                    spanTrue = parent?.querySelector('span').classList.add('span-inactive')
                } else {
                    spanTrue = parent?.querySelector('span').classList.remove('span-inactive')
                }
            })
            const inputContainers = div.querySelectorAll('.profile-input')
            inputContainers.forEach(cont => {
                if (method == 'add') {
                    cont?.classList.remove('input-container-inactive')
                    cont?.classList.add('input-container-active')
                } else {
                    cont?.classList.add('input-container-inactive')
                    cont?.classList.remove('input-container-active')
                }
            })
            firstParent.style.height = `${firstParent.offsetHeight + 10}px`
        })

        if (method == 'add' && btn) {
            btn.classList.add('form-btn-inactive')
            btn.nextElementSibling.classList.remove('form-btn-inactive')
        } else {
            const saveChangesBtn = document.querySelector('.mobile-profile-content-wrapper .send-user-info-form-btn')
            saveChangesBtn.classList.add('form-btn-inactive')
            saveChangesBtn.previousElementSibling.classList.remove('form-btn-inactive')
            saveChangesBtn.nextElementSibling.remove()
        }

        radioButtons.forEach(radio => {
            method == 'add' ? radio.disabled = false : radio.disabled = true
        })
    }

    const handleDesktopClickBtn = (btn, method) => {
        const secondParent = document.querySelectorAll('.profile-data-container')
        secondParent.forEach(div => {
            const spanParent = div.querySelectorAll('.profile-field-container')
            spanParent.forEach(span => {
                if (span?.classList.contains('unique-email-field')) return
                if (method == 'add') {
                    span?.querySelector('span')?.classList.add('span-inactive')
                } else {
                    span?.querySelector('span')?.classList.remove('span-inactive')
                }
            })
            const inputContainers = div.querySelectorAll('.profile-data-container .profile-input')
            inputContainers.forEach(cont => {
                if (method == 'add') {
                    cont?.classList.remove('input-container-inactive')
                    cont?.classList.add('input-container-active')
                } else {
                    cont?.classList.add('input-container-inactive')
                    cont?.classList.remove('input-container-active')
                }
            })
        })
        if (method == 'add' && btn) {
            btn.classList.add('form-btn-inactive')
            btn.nextElementSibling?.classList.remove('form-btn-inactive')
        } else {
            const saveChangesBtn = document.querySelector('.desktop-profile-content-wrapper .send-user-info-form-btn')
            saveChangesBtn.classList.add('form-btn-inactive')
            saveChangesBtn.previousElementSibling.classList.remove('form-btn-inactive')
            saveChangesBtn.nextElementSibling.remove()
        }
        radioButtons.forEach(radio => {
            method == 'add' ? radio.disabled = false : radio.disabled = true
        })
    }

    const listenToDiscardChangesBtn = () => {
        let btn = document.querySelector('.discard-changes-btn');
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            let method = 'remove';
            if (window.innerWidth <= 768) {
                handleMobileClickBtn(null, method);
            } else {
                handleDesktopClickBtn(null, method);
            }

            const profileFieldContainer = document.querySelectorAll('.profile-field-container')
            if (profileFieldContainer) {
                profileFieldContainer.forEach(profile => {
                    let errorMsg = profile.querySelector('.error-msg-container');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                })
            }
        })
    }

    // veo cual edit content btn toca el usuario para hacer el display del form y los inputs
    editContentBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            if (window.innerWidth <= 768) {
                console.log('entro mob')
                let editContentContainer = document.querySelector('.mobile-edit-content-container');
                let discardChangesBtn = document.createElement('button');
                discardChangesBtn.classList.add('discard-changes-btn');
                discardChangesBtn.textContent = "Descartar cambios";
                editContentContainer.appendChild(discardChangesBtn);
                const method = 'add';
                handleMobileClickBtn(btn, method)

            } else {
                let editContentContainer = document.querySelector('.desktop-edit-content-container');
                let discardChangesBtn = document.createElement('button');
                discardChangesBtn.classList.add('discard-changes-btn');
                discardChangesBtn.textContent = "Descartar cambios";
                editContentContainer.appendChild(discardChangesBtn);
                const method = 'add';
                handleDesktopClickBtn(btn, method);
            }
            listenToDiscardChangesBtn()
        })
    });
    // Logica para que todos los inputs numericos no acepten letras
    checkForNumericInputs();

    // Logica para que todos los input de solo letras no acepten numeros
    let letterInputs = document.querySelectorAll('.letter-only-input');
    letterInputs.forEach(input => {
        // Tomo el ultimo valor
        let lastInputValue = input.value;
        input.addEventListener("input", function (e) {
            var inputValue = e.target.value;
            if (isLetter(inputValue) || inputValue == '') {
                lastInputValue = inputValue; // Almacenar el último valor válido
            } else {// Si no es letra, borra el contenido del campo
                e.target.value = lastInputValue;
            }
        });
    });

    // Logica para no permitir envio de formulario si no se completa lo requerido
    const sendFormBtns = document.querySelectorAll('.send-user-info-form-btn');
    //Agarro los inputs requeridos

    sendFormBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Agarro el formulario que envio
            const form = btn.closest('.user-info-form');
            let errorsElements = form.querySelectorAll('.error-msg');
            if (errorsElements) {
                errorsElements.forEach(err => {
                    err.remove()
                })
            }

            // Bandera para saber si se completo lo necesario
            let flag = true;

            let requiredInputs;
            let dniInput;
            let phoneInp;
            if (window.innerWidth <= 768) {
                requiredInputs = document.querySelectorAll('.required');
                dniInput = document.querySelector('.mobile-dni');
                phoneInp = document.querySelector('.mobile-phone')
            } else {
                requiredInputs = document.querySelectorAll('.desktop-required');
                dniInput = document.querySelector('.desktop-dni');
                phoneInp = document.querySelector('.desktop-phone')
            }


            requiredInputs.forEach(input => {
                if (!input.value) {
                    flag = false;
                    let div = document.createElement('div');
                    div.classList.add('error-msg-container');
                    input.closest('.profile-field-container').appendChild(div);
                    const additionalMessage = document.createElement('span');
                    additionalMessage.classList.add('error-msg');
                    additionalMessage.innerHTML = 'Campo requerido'
                    div.appendChild(additionalMessage)
                }
            });
            if (Number(dniInput.value.length) != 8) {
                flag = false;
                console.log(dniInput)
                let div = document.createElement('div');
                div.classList.add('error-msg-container');
                dniInput.closest('.profile-field-container').appendChild(div);
                const additionalMessage = document.createElement('span');
                additionalMessage.classList.add('error-msg');
                additionalMessage.innerHTML = 'DNI debe tener 8 numeros'
                div.appendChild(additionalMessage)
            }

            if (Number(phoneInp.value.length) > 11) {
                flag = false;
                let div = document.createElement('div');
                div.classList.add('error-msg-container');
                phoneInp.closest('.profile-field-container').appendChild(div);
                const additionalMessage = document.createElement('span');
                additionalMessage.classList.add('error-msg');
                additionalMessage.innerHTML = 'Longitud incorrecta'
                div.appendChild(additionalMessage)
            }
            if (flag) {
                form.submit()
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