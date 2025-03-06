window.addEventListener('load', () => {

    const navbarContainer = document.querySelector('.navbar-container')
    const bookConsultationContainer = document.querySelector('.book-consultation-container')
    const openMenuBtn = document.querySelector('.open-menu-button')
    const body = document.querySelector('body')
    const closeMenuBtn = document.querySelector('.close-menu-btn')
    const dropdownToggler = document.querySelector('.navbar .bx-chevron-right')
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


    dropdownToggler?.addEventListener('click', () => {
        // Le pongo la clase active al padre nomas, en css afecto a lo que quiero a partir de que este
        // sea active
        dropdownToggler.closest('.item-dropdown').classList.toggle('item-dropdown-active');
        // // Cambio el p por el a
        // // Crear un nuevo elemento <a>
        // const parragraph = dropdownToggler.closest('div').querySelector('p');
        // if (parragraph) {
        //     const link = document.createElement('a');

        //     // Establecer el atributo href del link
        //     link.setAttribute('href', '');

        //     // Copiar el contenido del párrafo al link
        //     link.textContent = parragraph.innerHTML;

        //     // Reemplazar el párrafo con el link
        //     parragraph.parentNode.replaceChild(link, parragraph);
        // }


        navbarContainer.classList.toggle('overflow-auto');
        navbar.classList.toggle('dropdown-active')
    })

})