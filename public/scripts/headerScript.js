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


    

})