window.addEventListener('load', () => {
    const blackScreen = document.querySelector('.black-screen')
    // LOGICA PARA QUICK ADD
    // Lo hago en este script porque puede ir en la lista de productos, en la del detalle en sugested products, etc
    const addingCartButtons = document.querySelectorAll('.quick-cart-container');
    const shopingCartQuickPopup = document.querySelector('.add-to-cart-container');
    const closingCardBtns = document.querySelectorAll('.close-cart-menu');
    addingCartButtons?.forEach(btn => {
        // Click en agregar al carro
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card-container');
            shopingCartQuickPopup.classList.add('add-to-cart-container-active');
            blackScreen.classList.add('black-screen-active');
        });
    });
    blackScreen.addEventListener('click', () => {
        shopingCartQuickPopup.classList.remove('add-to-cart-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
    closingCardBtns?.forEach(btn => {
        // Click en agregar al carro
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card-container');
            shopingCartQuickPopup.classList.remove('add-to-cart-container-active');
            blackScreen.classList.remove('black-screen-active');
        });
    });
});