import { activateClass, changeCartProductDimension, changeWishlistProductDimension, deactivateClass } from './utils.js';
window.addEventListener('load', () => {
    const body = document.querySelector('body');

    let openMenuButton = document.querySelector('.open-menu-button');

    let closeMenuButton = document.querySelector('.close-button-container');

    const sideNavbar = 'side-navbar-container';

    const searchSection = 'search-section-container';

    const blackScreen = 'black-screen'; //Pantalla negra

    let classesToActivate = [];
    let classesToDeactivate
    openMenuButton.addEventListener('click', () => { // ABRIR MENU
        classesToActivate = [blackScreen, sideNavbar];
        activateClass(classesToActivate);

        classesToDeactivate = [searchSection];
        deactivateClass(classesToDeactivate);

        body.classList.add('noScroll');
    });

    closeMenuButton.addEventListener('click', () => { // CERRAR MENU

        classesToDeactivate = [sideNavbar, blackScreen];
        deactivateClass(classesToDeactivate);

        body.classList.remove('noScroll');
    });

    document.querySelector(`.${blackScreen}`)?.addEventListener('click', () => { // CERRAR MENU

        classesToDeactivate = [sideNavbar, blackScreen, popupCart, popupWishlist];
        deactivateClass(classesToDeactivate);

        body.classList.remove('noScroll');
    })


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

    // LOGICA DEL POPUP CART
    const openPopupCartBtn = document.querySelector('.open-popup-cart-btn');
    const popupCart = 'cart-popup-container';
    const closePopupCartBtn = document.querySelector('.close-popup-cart-btn');
    openPopupCartBtn.addEventListener('click', () => {
        body.classList.add('noScroll');
        activateClass([blackScreen, popupCart]);
        changeCartProductDimension();
    });
    closePopupCartBtn?.addEventListener('click', () => {
        body.classList.remove('noScroll');
        deactivateClass([blackScreen, popupCart]);
    });

    // LOGICA DEL POPUP WHISLIST
    const openPopupWishlistBtn = document.querySelector('.open-popup-wishlist-btn');
    const popupWishlist = 'wishlist-popup-container';
    const closePopupWishlistBtn = document.querySelector('.close-popup-wishlist-btn');
    openPopupWishlistBtn?.addEventListener('click', () => {
        body.classList.add('noScroll');
        activateClass([blackScreen, popupWishlist]);
        changeWishlistProductDimension();
    });
    closePopupWishlistBtn?.addEventListener('click', () => {
        body.classList.remove('noScroll');
        deactivateClass([blackScreen, popupWishlist]);
    });

    

})