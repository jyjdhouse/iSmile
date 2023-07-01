import { activateClass, changeCartProductDimension, changeWishlistProductDimension, deactivateClass } from './utils.js';
window.addEventListener('load', () => {
    

    // LOGICA DEL HEADER AL SCROLLEAR
    const header = document.querySelector('.header');

    const isAtTop = function () { //Para saber si esta arriba de todo
        return (document.documentElement.scrollTop || document.body.scrollTop) === 0;
    };
    const headerShow = () => { //Para hacer el header aparezca/desaparezca
        let prevScrollPos = window.pageYOffset;
        window.onscroll = function () {

            let minScroll = window.scrollY >= window.innerHeight * 0.1; //Mayor a 10vh
            let currentScrollPos = window.pageYOffset;
            if (minScroll) {
                header.classList.add('header-active');
                header.classList.remove('header-hidden');
            }
            if (isAtTop()) {
                header.classList.add('header-hidden');
                header.classList.remove('header-active');
            }
            prevScrollPos = currentScrollPos;
        }
    }

    headerShow();

    // Logica del userLoggedMenu
    const userLoggedOptions = document.querySelector('.logged-menu-container');
    const userLoggedOptionsToggler = document.querySelector('.user-logged-menu-toggler');
    userLoggedOptionsToggler?.addEventListener('click',()=>{
        userLoggedOptions.classList.toggle('logged-menu-container-active');
    });

    // Logica por si tocan el expandible del menu
    const createOptionsToggler = document.querySelector('.create-options-toggler');
    const adminMenuList = document.querySelector('.admin-menu-list');
    const adminMenuArrow = document.querySelector('.create-options-toggler');
    createOptionsToggler?.addEventListener('click',()=>{
        adminMenuArrow.classList.toggle('rotated');
        adminMenuList.classList.toggle('admin-menu-list-active');
    });

    

})