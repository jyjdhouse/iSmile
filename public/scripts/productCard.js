import { addProductToLocaleCart, addTempItemToDB, getCartTotalProducts, getLoggedUser, handleRemoveCartBtnClick, checkIfProductIsInCartDetail} from "./utils.js";
function loadDependentScripts() { //Carga los scripts que usan la variable del fetch
    // Si esta en el checkout
    if (window.location.pathname === '/user/checkout') {
        // Aquí puedes cargar los scripts externos después de obtener los datos del usuario
        var checkoutScript = document.createElement('script');
        checkoutScript.src = '/scripts/checkout.js';
        checkoutScript.type = 'module'; // Agregar el atributo type="module"
        document.head.appendChild(checkoutScript);
    }
}
window.addEventListener('load', async () => {
    try {
        const blackScreen = document.querySelector('.black-screen')
        // LOGICA PARA QUICK ADD
        // Lo hago en este script porque puede ir en la lista de productos, en la del detalle en sugested products, etc
        const addingCartButtons = document.querySelectorAll('.quick-add-cart-btn');
        const shopingCartQuickPopup = document.querySelector('.add-to-cart-container');
        const closingCardBtns = document.querySelectorAll('.close-cart-menu');
        var totalProducts = document.querySelectorAll('.products-quantity');
        var userLogged = (await getLoggedUser())?.user;
        // Defino en el window para poder usarla en otros lugares
        window.userLogged = userLogged
        userLogged && localStorage.removeItem('temporalCart');
        // Carga los scripts que dependen del user
        loadDependentScripts();
        // Apenas carga le pongo la cantidad de productos
        updateCartTotalProductsNumber();
        checkForProductsInCart();

        // Si tocan el boton del carro
        addingCartButtons?.forEach(btn => {
            // Click en agregar al carro
            btn.addEventListener('click', async (e) => {
                try {
                    const card = btn.closest('.product-card-container') || btn.closest('.product-container');
                    //para llegar al id del producto ..
                    const idProd = card.dataset.productid;
                    card.querySelector('.loading-container').classList.add('loading-container-active');
                    if (userLogged) {
                        await addTempItemToDB(idProd,userLogged); //Función que agrega al carro el producto 
                    } else {
                        addProductToLocaleCart(idProd);
                    }
                    // Remuevo el spinner loading, pongo el quickshopping popup
                    card.querySelector('.loading-container').classList.remove('loading-container-active');
                    paintShoppingCartPopup(card);
                    shopingCartQuickPopup.classList.add('add-to-cart-container-active');
                    blackScreen.classList.add('black-screen-active');
                    // Cambio los iconos
                    card.querySelector('.quick-add-cart-btn')?.classList.add('hidden');
                    card.querySelector('.remove-cart-product')?.classList.remove('hidden');
                    // Le sumo uno al numero del carro
                    totalProducts.forEach(num => num.innerHTML = parseInt(num.innerHTML) ? parseInt(num.innerHTML) + 1 : 1);
                } catch (error) {
                    console.log(`Falle en addingCartbuttons.addEventListener: ${error}`);
                }
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
        handleRemoveCartBtnClick(userLogged);

        // Actualiza numero arriba del carro con cantidad de productos
        function updateCartTotalProductsNumber() {
            const cartLength = getCartTotalProducts(userLogged); //Función que retorna el total de productos
            totalProducts.forEach(num => cartLength ? num.innerHTML = cartLength : num.innerHTML = '');
        };
        function checkForProductsInCart() {//Se fija si el usuario ya tiene el producto en el carro para poner tick
            const productCards = document.querySelectorAll('.product-card-container');
            productCards.forEach(card => {
                const productId = card.dataset.productid;
                // Hace un find ==> encuentra si el producto esta en el carro
                let productAlreadyInCart;
                if (userLogged) {
                    productAlreadyInCart = userLogged.temporalCart?.temporalItems.find(item => item.products_id == productId);
                } else {
                    let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
                    productAlreadyInCart = cart.find(item => item.products_id == productId);
                }
                if (productAlreadyInCart) {
                    card.querySelector('.quick-add-cart-btn').classList.add('hidden');
                    card.querySelector('.remove-cart-product').classList.remove('hidden');
                }
            })
        };

        function paintShoppingCartPopup(card) {
            let productSelectedCard = document.querySelector('.product-selected-card');
            let imagePath = card.querySelector('.product-image-test-active')?.src||
            card.querySelector('.main-img')?.src || '/img/product/default.png';
            let productName = card.querySelector('.product-name').innerHTML;
            let productPrice = card.querySelector('.product-price').innerHTML;
            let cardHTML = 
            `
            <div class="product-selected-img-container">
                <img src="${imagePath}" alt="product-image" class="product-selected-img">
            </div>
            <div class="product-selected-info-qty-container">
                <div class="product-selected-name-remove-container">
                    <p class="product-selected-name">${productName}</p>
                </div>
                <div class="product-selected-quantity-container">
                    <p class="item-total">${productPrice}</p>
                </div>
            </div>
            `;
            productSelectedCard.innerHTML = cardHTML;
        }
        checkIfProductIsInCartDetail();

    } catch (error) {
        console.log("Falle en productCard.js: " + error);
    }
});