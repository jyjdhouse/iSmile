import { getCartTotalProducts, getLoggedUser } from "./utils.js";

window.addEventListener('load', async () => {
    try {
        const blackScreen = document.querySelector('.black-screen')
        // LOGICA PARA QUICK ADD
        // Lo hago en este script porque puede ir en la lista de productos, en la del detalle en sugested products, etc
        const addingCartButtons = document.querySelectorAll('.quick-add-cart-btn');
        const removingCartButtons = document.querySelectorAll('.remove-cart-product');
        const shopingCartQuickPopup = document.querySelector('.add-to-cart-container');
        const closingCardBtns = document.querySelectorAll('.close-cart-menu');
        let totalProducts = document.querySelectorAll('.products-quantity');
        let userLogged = (await getLoggedUser()).user;
        userLogged && localStorage.removeItem('temporalCart');

        // Apenas carga le pongo la cantidad de productos
        updateCartTotalProductsNumber();
        checkForProductsInCart();

        // Si tocan el boton del carro
        addingCartButtons?.forEach(btn => {
            // Click en agregar al carro
            btn.addEventListener('click', async (e) => {
                try {
                    const card = btn.closest('.product-card-container') || btn.closest('.add-cart-button-container');
                    //para llegar al id del producto ..
                    const idProd = card.dataset.productid;
                    card.querySelector('.loading-container').classList.add('loading-container-active');
                    if (userLogged) {
                        await add(idProd, userLogged); //Funcion que agrega al carro el producto 
                    } else {
                        addProductToLocaleCart(idProd);
                    }
                    // Remuevo el spinner loading, pongo el quickshopping popup
                    card.querySelector('.loading-container').classList.remove('loading-container-active');
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

        // Cuando tocan el boton del tick (sacan el producto del carro)
        removingCartButtons.forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const card = btn.closest('.product-card-container') || btn.closest('.add-cart-button-container');
                //para llegar al id del producto ..
                const idProd = card.dataset.productid;
                card.querySelector('.loading-container').classList.add('loading-container-active');
                if (userLogged) {//Si hay usuario le pego a la api
                    await remove(idProd, userLogged); //Funcion que elimina el producto del carro 
                } else {
                    removeProductfromLocaleCart(idProd)
                }
                // Remuevo el spinner loading
                card.querySelector('.loading-container').classList.remove('loading-container-active');
                // Cambio los iconos
                card.querySelector('.quick-add-cart-btn')?.classList.remove('hidden');
                card.querySelector('.remove-cart-product')?.classList.add('hidden');
                // Le resto uno al numero del carro
                totalProducts.forEach(num => num.innerHTML = parseInt(num.innerHTML) ? parseInt(num.innerHTML) - 1 : '');
            })
        })
        // Actualiza numero arriba del carro con cantidad de productos
        function updateCartTotalProductsNumber() {
            const cartLength = getCartTotalProducts(userLogged); //Funcion que retorna el total de productos
            totalProducts.forEach(num => cartLength ? num.innerHTML = cartLength : num.innerHTML = '');
        };
        function checkForProductsInCart() {//Se fija si el usuario ya tiene el producto en el carro para poner tick
            const productCards = document.querySelectorAll('.product-card-container');
            productCards.forEach(card => {
                const productId = card.dataset.productid;
                // Hace un find ==> encuentra si el producto esta en el carro
                let productAlreadyInCart;
                if (userLogged) {
                    productAlreadyInCart = userLogged.temporalCart?.temporalItems.find(item => item.product_id == productId);
                } else {
                    let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
                    productAlreadyInCart = cart.find(item => item.product_id == productId);
                }
                if (productAlreadyInCart) {
                    card.querySelector('.quick-add-cart-btn').classList.add('hidden');
                    card.querySelector('.remove-cart-product').classList.remove('hidden');
                }
            })
        };
        async function add(prodId, user) {//Agrega producto a la db
            try {
                if (!user.temporalCart) { //Si no tenia carro, lo creo
                    const formData = {
                        userId: user.id,
                        prodId
                    }
                    let createdCart = (await (await fetch(`${window.location.origin}/api/user/createTempCart`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    })).json());

                } else { // Si tenia, tengo que agregarlo al carro que ya esta creado
                    let cart = user.temporalCart.temporalItems;
                    let prodIndex = cart.findIndex(item => item.product_id == prodId); //busco si esta el prod que seleccionaron en el carro
                    console.log(prodIndex);
                    // Si el index es 0 o mas, quiere decir que se encuentra => Solo le sumo uno
                    if (prodIndex < 0) { //Si NO esta lo agrego, si esta no pasa nada
                        let response = (await (await fetch(`${window.location.origin}/api/user/addTempItem`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                tempCartId: user.temporalCart.id,
                                prodId
                            })
                        })).json());
                        console.log(response);
                    }
                }
            } catch (error) {
                console.log("Falle en add: " + error);
            };
        };
        async function remove(prodId, user) {
            (await (await fetch(`${window.location.origin}/api/user/deleteTempItem`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prodId,
                    user
                })
            })).json());
        }
        function addProductToLocaleCart(prodId) {
            // Obtengo el carrito de sessionStorage
            const cart = JSON.parse(localStorage.getItem('temporalCart')) || [];

            // Verifico si el producto ya está en el carrito
            const productAlreadyInCart = cart.find(item => item.product_id == prodId);
            if (productAlreadyInCart) {
                // Si el producto ya está en el carrito, no hago nada
                return;
            }

            // Agrego el producto al carrito
            cart.push({
                product_id: parseInt(prodId),
                quantity: 1
            });

            localStorage.setItem('temporalCart', JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
        }
        function removeProductfromLocaleCart(prodId) {
            // Obtengo el carrito de sessionStorage
            let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];

            cart = cart.filter(prod => prod.product_id != prodId);

            localStorage.setItem('temporalCart', JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
        }
        // Logica para pintar el boton que corresponda del carro en product Detail
        function checkIfPRoductIsInCartDetail() {
            const productCard = document.querySelector('.product-container');
            if(!productCard)return
            const productId = productCard.dataset.productid;
            // Hace un find ==> encuentra si el producto esta en el carro
            let productAlreadyInCart;
            if (userLogged) {
                productAlreadyInCart = userLogged.temporalCart?.temporalItems.find(item => item.product_id == productId);
            } else {
                let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
                productAlreadyInCart = cart.find(item => item.product_id == productId);
            }
            if (productAlreadyInCart) {
                productCard.querySelector('.quick-add-cart-btn').classList.add('hidden');
                productCard.querySelector('.remove-cart-product').classList.remove('hidden');
            }
        }
        checkIfPRoductIsInCartDetail();

    } catch (error) {
        console.log("Falle en productCard.js: " + error);
    }
});