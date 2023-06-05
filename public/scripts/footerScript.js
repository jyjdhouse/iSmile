window.addEventListener('load', () => {

    const footerIconsContainer = document.querySelectorAll('.footer-icon-container')
    const footerDataIconsContainer = document.querySelectorAll('.mobile-footer-data-icon-container')
    const dataXContainer = document.querySelectorAll('.x-container')
    
    // logica para clickear iconos en footer mobile
    footerIconsContainer.forEach((icon, indexIcon) => {
        icon.addEventListener('click', () => {
            // como estan separados los iconos de la data de cada uno
            // pregunto si el index del icon es igual al index de la data
            // y agrego clase
            for(let indexData = 0; indexData < footerDataIconsContainer.length; indexData++) {
                if(indexIcon === indexData){  
                    footerDataIconsContainer[indexData].classList.add('mobile-footer-data-icon-container-active')
                }
            }

        })
    })

    
    dataXContainer.forEach((item, indexItem) => {
        item.addEventListener('click', () => {
            for(let indexData = 0; indexData < footerDataIconsContainer.length; indexData++) {
                if(indexItem === indexData){  
                    footerDataIconsContainer[indexData].classList.remove('mobile-footer-data-icon-container-active')
                }
            }
        })
    })


})