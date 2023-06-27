window.addEventListener('load', () => {

    const paragraphs = document.querySelectorAll('service-info-p')
    const seeMoreAction = document.querySelectorAll('.see-more-action')
    const closeCard = document.querySelectorAll('.close-card')

    seeMoreAction.forEach(act => {
        act.addEventListener('click', () => {

            let parent = act.closest('.service-detail-card')
            let paragraphDropdown = parent.querySelector('.service-info-p-container')
            let extraInfoDropdown = parent.querySelector('.service-card-first-column-dropdown-container')
            let seeMoreAct = parent.querySelector('.see-more-action')
            let closeCardBtn = parent.querySelector('.close-card')

            paragraphDropdown.classList.add('service-info-p-container-active')
            extraInfoDropdown.classList.add('service-card-first-column-dropdown-container-active')
            parent.classList.add('service-detail-card-active')
            seeMoreAct.classList.add('see-more-action-inactive')
            closeCardBtn.classList.add('close-card-active')

        })

    })

    closeCard.forEach(item => {
        item.addEventListener('click', () => {

            let parent = item.closest('.service-detail-card')
            let paragraphDropdown = parent.querySelector('.service-info-p-container')
            let extraInfoDropdown = parent.querySelector('.service-card-first-column-dropdown-container')
            let seeMoreAct = parent.querySelector('.see-more-action')
            let closeCardBtn = parent.querySelector('.close-card')

            paragraphDropdown.classList.remove('service-info-p-container-active')
            extraInfoDropdown.classList.remove('service-card-first-column-dropdown-container-active')
            parent.classList.remove('service-detail-card-active')
            seeMoreAct.classList.remove('see-more-action-inactive')
            closeCardBtn.classList.remove('close-card-active')

        })
    })

})