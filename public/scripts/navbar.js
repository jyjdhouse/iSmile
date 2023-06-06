window.addEventListener('load', () => {

    const navbarContainer = document.querySelector('.navbar-container')
    const openMenuBtn =  document.querySelector('.open-menu-button')

    openMenuBtn.addEventListener('click', () => {
        navbarContainer.classList.add('navbar-container-active')
    })

})