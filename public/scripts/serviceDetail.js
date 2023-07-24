window.addEventListener('load', () => {

    const paragraphs = document.querySelectorAll('service-info-p')
    const openDropdown = document.querySelectorAll('.open-dropdown')
    const closeCard = document.querySelectorAll('.close-dropdown')

    openDropdown.forEach(act => {
        act.addEventListener('click', () => {

            let parent = act.closest('.service-detail-card')
            let dropdown = parent.querySelector('.servicio-dropdown')
            let minusBtn = parent.querySelector('.close-dropdown')

            dropdown.classList.add('servicio-dropdown-active')
            parent.classList.add('service-detail-card-active')
            minusBtn.classList.remove('icon-inactive')
            minusBtn.classList.add('icon-active')
            act.classList.add('icon-inactive')
            act.classList.remove('icon-active')

        })

    })

    closeCard.forEach(item => {
        item.addEventListener('click', () => {
            let parent = item.closest('.service-detail-card')
            let dropdown = parent.querySelector('.servicio-dropdown')
            let plusBtn = parent.querySelector('.open-dropdown')

            dropdown.classList.remove('servicio-dropdown-active')
            parent.classList.remove('service-detail-card-active')
            plusBtn.classList.add('icon-active')
            plusBtn.classList.remove('icon-inactive')
            item.classList.add('icon-inactive')
            item.classList.remove('icon-active')

        })
    })

})