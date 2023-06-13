window.addEventListener('load', () => {
    // LOGICA DEL POPUP CART

    const openCartPopupBtn = document.querySelector('.open-popup-cart-btn');
    const cartPopup = document.querySelector('.cart-popup-container');
    const blackScreen = document.querySelector('.black-screen');
    const closePopupCartBtn = document.querySelector('.close-popup-cart-btn');
    openCartPopupBtn?.addEventListener('click', () => {
        cartPopup.classList.add('cart-popup-container-active');
        blackScreen.classList.add('black-screen-active');
    });

    closePopupCartBtn?.addEventListener('click', () => {
        cartPopup.classList.remove('cart-popup-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
    blackScreen?.addEventListener('click', () => {
        cartPopup.classList.remove('cart-popup-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
});