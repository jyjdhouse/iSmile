window.addEventListener('load', () => {

    const navbarContainer = document.querySelector('.navbar-container')
    const bookConsultationContainer = document.querySelector('.book-consultation-container')
    const openMenuBtn =  document.querySelector('.open-menu-button')
    const body = document.querySelector('body')
    const closeMenuBtn = document.querySelector('.close-menu-btn-container i')
    const dropdownVisiblePart =document.querySelector('.item-dropdown-visible-part')
    const dropdownContainer = document.querySelector('.dropdown-items-container')

    openMenuBtn.addEventListener('click', () => {
        navbarContainer.classList.add('navbar-container-active')
        body.classList.add('noScroll')
        bookConsultationContainer.classList.add('book-consultation-container-active')
    })

    closeMenuBtn.addEventListener('click', () => {
        navbarContainer.classList.remove('navbar-container-active')
        body.classList.remove('noScroll')
        bookConsultationContainer.classList.remove('book-consultation-container-active')
    })
<<<<<<< HEAD
    const navBarLinks = document.querySelectorAll('.navbar-list-item');
    navBarLinks.forEach(link=>{
        link.addEventListener('click',()=>{
            body.classList.remove('noScroll')
            navbarContainer.classList.remove('navbar-container-active');
            bookConsultationContainer.classList.remove('book-consultation-container-active');
        })
    });
=======

    dropdownVisiblePart.addEventListener('click', () => {
        dropdownContainer.classList.toggle('dropdown-items-container-active')
    })

>>>>>>> b65b6888c4f0eef166f330fb2b559549b17c9033
})