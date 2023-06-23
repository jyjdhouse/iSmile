window.addEventListener('load', () => {

    const optionsLi = document.querySelectorAll('.profile-option-item')
    const fieldOptionContainer = document.querySelectorAll('.profile-selected-field-container')


    optionsLi.forEach((li, indexLi) => {
        li.addEventListener('click', () => {

            if(!li.classList.contains('profile-option-item-active')){

                const parent = li.closest('.profile-options-list')
                const liActive = parent.querySelector('.profile-option-item-active')
                liActive.classList.remove('profile-option-item-active')

                for(let fieldIndex = 0; fieldIndex < fieldOptionContainer.length; fieldIndex++){
                    if(fieldIndex == indexLi){
                        optionsLi[indexLi].classList.add('profile-option-item-active')
                        fieldOptionContainer[fieldIndex].classList.add('profile-selected-field-container-active')
                    } else {
                        fieldOptionContainer[fieldIndex].classList.remove('profile-selected-field-container-active')
                    }
                }
            }

            
        })
    })


})