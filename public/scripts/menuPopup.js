window.addEventListener('load', () => {

    const navbarContainer = document.querySelector('.navbar-container')
    const bookConsultationContainer = document.querySelector('.book-consultation-container')
    const openMenuBtn =  document.querySelector('.open-menu-button')
    const body = document.querySelector('body')
    const closeMenuBtn = document.querySelector('.close-menu-btn')
    const dropdownVisiblePart =document.querySelector('.item-dropdown-visible-part')
    const dropdownContainer = document.querySelector('.dropdown-items-container')
    const navbar = document.querySelector('.navbar');

    // Al inicio le meto esta clase para que no aparezca la transición
    navbarContainer.classList.remove('hidden');
    
    openMenuBtn?.addEventListener('click', () => {
        navbarContainer.classList.add('navbar-container-active')
        body.classList.add('noScroll')
        bookConsultationContainer.classList.add('book-consultation-container-active')
    })

    closeMenuBtn?.addEventListener('click', () => {
        navbarContainer.classList.remove('navbar-container-active')
        body.classList.remove('noScroll')
        bookConsultationContainer.classList.remove('book-consultation-container-active')
    })
    const navBarLinks = document.querySelectorAll('.navbar-list-item');
    // navBarLinks.forEach(link=>{
    //     link.addEventListener('click',()=>{
    //         body.classList.remove('noScroll')
    //         navbarContainer.classList.remove('navbar-container-active');
    //         bookConsultationContainer.classList.remove('book-consultation-container-active');
    //     })
    // });

    dropdownVisiblePart?.addEventListener('click', () => {
        // Le pongo la clase active al padre nomas, en css afecto a lo que quiero a partir de que este
        // sea active
        dropdownVisiblePart.closest('.item-dropdown').classList.toggle('item-dropdown-active');
        navbarContainer.classList.toggle('overflow-auto');
        navbar.classList.toggle('dropdown-active')
    })

})