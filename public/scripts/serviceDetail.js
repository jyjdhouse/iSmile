window.addEventListener('load', () => {

    const paragraphs = document.querySelectorAll('service-info-p');
    const openDropdown = document.querySelectorAll('.open-dropdown');
    const closeCard = document.querySelectorAll('.close-dropdown');
    const mainImageInfoContainer = document.querySelector('.service-title-info-container')
    const serviceDetailCardsContainer = document.querySelector('.service-detail-cards-container');

    // hago la función de los que se remueven generales
    function removeClasses(item) {
        let dropdown = item.querySelector('.servicio-dropdown');
        let plusBtn = item.querySelector('.open-dropdown');
        let minusBtn = item.querySelector('.close-dropdown');
        dropdown.classList.remove('servicio-dropdown-active');
        item.classList.remove('service-detail-card-active');
        plusBtn.classList.add('icon-active');
        plusBtn.classList.remove('icon-inactive');
        minusBtn.classList.add('icon-inactive');
        minusBtn.classList.remove('icon-active');
    }

    function addClasses(item) {
        let dropdown = item.querySelector('.servicio-dropdown');
        let minusBtn = item.querySelector('.close-dropdown');
        let plusBtn = item.querySelector('.open-dropdown');

        dropdown.classList.add('servicio-dropdown-active');
        item.classList.add('service-detail-card-active');
        minusBtn.classList.remove('icon-inactive');
        minusBtn.classList.add('icon-active');
        plusBtn.classList.add('icon-inactive');
        plusBtn.classList.remove('icon-active');
    }

    openDropdown.forEach(act => {
        act.addEventListener('click', () => {
            let activeCard = document.querySelector('.service-detail-card-active');
            if (activeCard !== null) {
                activeCard.classList.remove('service-detail-card-active');
                removeClasses(activeCard);
                let minusBtn = activeCard.querySelector('.close-dropdown');
                minusBtn.classList.add('icon-inactive');
                minusBtn.classList.remove('icon-active');
            } else {

            }
            let parent = act.closest('.service-detail-card');
            addClasses(parent);

        })

    })

    closeCard.forEach(btn => {
        btn.addEventListener('click', () => {
            let parent = btn.closest('.service-detail-card');
            removeClasses(parent);

        })
    })


    const timeoutId = setTimeout(() => {
        console.log('entro')
        mainImageInfoContainer.classList.add('service-title-info-container-active');
        serviceDetailCardsContainer.classList.add('service-detail-cards-container-active')
        return clearTimeout(timeoutId)
    }, 1000)
 



})