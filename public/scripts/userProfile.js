window.addEventListener('load', () => {

    const optionsLi = document.querySelectorAll('.profile-option-item')
    const fieldOptionContainer = document.querySelectorAll('.profile-selected-field-container')
    const editContentBtn = document.querySelector('.edit-content')
    const submitFormBtn = document.querySelector('.submit-form')
    const inputs = document.querySelectorAll('.profile-input input')
    const main = document.querySelector('.user-profile-main')
    const radioButtons = document.querySelectorAll('.radio-label-container input')
    let editing = false

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
        editContentBtn.addEventListener('click', (e) => {
            e.preventDefault()
            if(window.innerWidth <= 768) {
                const secondParent = document.querySelectorAll('.profile-selected-field-container')
                secondParent.forEach(div => {
                    const firstParent = div.closest('.options-selected-container')
                    const spanParent = div.querySelectorAll('.profile-field-container')
                    spanParent.forEach(span => {
                        span.querySelector('span').classList.add('span-inactive')
        
                    })
                    const inputContainers = div.querySelectorAll('.profile-input')
                    inputContainers.forEach(cont => {
                        cont.classList.remove('input-container-inactive')
                        cont.classList.add('input-container-active')
                    })
                    firstParent.style.height = `${firstParent.offsetHeight + 10}px`
                })
                main.style.height = `80vh`
                btn.classList.add('form-btn-inactive')
                submitFormBtn.classList.remove('form-btn-inactive')
                radioButtons.forEach(radio => {
                    radio.disabled = false
                })
            } else {
                const secondParent = document.querySelectorAll('.profile-data-container')
                secondParent.forEach(div => {
                    const spanParent = div.querySelectorAll('.profile-field-container')
                    spanParent.forEach(parent => {
                        parent.querySelector('span').classList.add('span-inactive')
                    })
                    const inputContainers = div.querySelectorAll('.profile-data-container .profile-input')
                    inputContainers.forEach(cont => {
                        cont.classList.remove('input-container-inactive')
                        cont.classList.add('input-container-active')
                    })
                })
                btn.classList.add('form-btn-inactive')
                submitFormBtn.classList.remove('form-btn-inactive')
                radioButtons.forEach(radio => {
                    radio.disabled = false
                })
            }
        })


    radioButtons.forEach(radio => {
        radio.disabled = true
    })

})