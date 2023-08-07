export function activateClass(array) {
    //El array que llegan son los nombres de las clases de las funciónes
    // a las cuales quiero agregar el '#nombreClase-active'
    array.forEach(element => {
        document.querySelector(`.${element}`).classList.add(`${element}-active`);
    });
}
export function deactivateClass(array) {
    //El array que llegan son los nombres de las clases de las funciónes
    // a las cuales quiero agregar el '#nombreClase-active'
    array.forEach(element => {
        document.querySelector(`.${element}`)?.classList.remove(`${element}-active`);
    });
}

export function changeCartProductDimension() {
    const productCards = document.querySelectorAll('.cart-product-card');
    // Le saco la clase multiple por las dudas que no haya 2
    document.querySelector('.cart-products-section').classList.remove('multiple-cart-products-section');
    productCards.forEach(card => {
        card.classList.remove('two-products');
        card.classList.remove('multiple-products');
    });

    if (productCards.length < 3) { //Menos de 3 productos
        if (productCards.length == 2) {
            productCards.forEach(card => {
                card.classList.add('two-products');
            });
        }
        if (productCards.length == 0) {
            document.querySelector('.cart-products-section').innerHTML =
                `<p class ="no-items-msg">No tienes productos en el carro</p>`;
        }
    } else {//3 o mas productos
        document.querySelector('.cart-products-section').classList.add('multiple-cart-products-section');
        productCards.forEach(card => {
            card.classList.add('multiple-products');
        });
    }
}

export function changeWishlistProductDimension() {
    const productCards = document.querySelectorAll('.wishlist-product-card');
    // Le saco la clase multiple por las dudas que no haya 2
    document.querySelector('.wishlist-products-section').classList.remove('multiple-wishlist-products-section');
    productCards.forEach(card => {
        card.classList.remove('two-products');
        card.classList.remove('multiple-products');
    });

    if (productCards.length < 3) { //Menos de 3 productos
        if (productCards.length == 2) {
            productCards.forEach(card => {
                card.classList.add('two-products');
            });
        }
        if (productCards.length == 0) {
            document.querySelector('.wishlist-products-section').innerHTML =
                `<p class ="no-items-msg">No tienes productos en tu wishlist</p>`;
        }
    } else {//3 o mas productos
        document.querySelector('.wishlist-products-section').classList.add('multiple-wishlist-products-section');
        productCards.forEach(card => {
            card.classList.add('multiple-products');
        });
    }
}

export async function addFilesToFormData(formData, fileInputs) {
    // Itero sobre cada uno
    for (let i = 0; i < fileInputs.length; i++) {
        const input = fileInputs[i];
        // Capturo el color_id de ese input
        const inputColorId = input.dataset.colorid;
        // Agarro todos los files asociados a ese input
        const files = input.files;
        for (let j = 0; j < files.length; j++) {
            formData.append(inputColorId, files[j]);
        }
    }
};


export async function getLoggedUser() {
    let response =  (await (await fetch(`/api/user/getLoggedUserId`)).json());
    return response.ok ? response : undefined;
};

export async function printWishlistProducts() {
    const data = await getLoggedUser();
    if (!data.userId) { //Si dio error el usuario
        return
    }
    const userId = data.userId;
    //Armo el fetch
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    };
    // Enviar la solicitud HTTP utilizando la API Fetch
    let response = (await (await fetch('/api/product/getWishedProducts', requestOptions)).json());
    let wishedProducts = response.userWishlistProducts;
    // return console.log(response);
    const wishlistProductsSection = document.querySelector('.wishlist-products-section');
    wishlistProductsSection ? wishlistProductsSection.innerHTML = '' : null;
    wishedProducts.forEach(prod => {
        const filename = (prod.wishedProduct.files.find(img => img.colors_id == prod.wishedProductColor.id)).filename;
        wishlistProductsSection ? wishlistProductsSection.innerHTML +=
            `
        <div class="wishlist-product-card" data-colorid="${prod.wishedProductColor.id}" data-productid="${prod.wishedProduct.id}">
                <div class="wishlist-product-img-container">
                    <img src="/img/${filename}" alt="product-image" class="wishlist-product-selected-img">
                </div>
                <div class="wishlist-product-selected-info-qty-container">
                    <div class="wishlist-product-selected-name-remove-container">
                        <p class="wishlist-product-selected-name">${prod.wishedProduct.name}</p>
                        <button class="wishlist-product-selected-remove-btn"><i class='bx bx-x remove-wishlist-product-btn'></i>
                        </button>
                    </div>
                    
                    <div class="quick-add-bag-container">
                        <p class="wishlist-product-selected-color-size">${prod.wishedProductColor.name}</p>
                        <i class='bx bx-shopping-bag quick-add-bag-button'></i>
                        <ul class="wishlist-quick-add-sizes-list">
                            <li class="wishlist-quick-add-size">XS</li>
                            <li class="wishlist-quick-add-size">S</li>
                            <li class="wishlist-quick-add-size">M</li>
                            <li class="wishlist-quick-add-size">L</li>
                        </ul>
                    </div>
                    
                    <div class="wishlist-product-selected-quantity-container">
                        <p class="total">US$ ${prod.wishedProduct.price}</p>
                    </div>
                </div>
            </div>
        ` : null;
    })

};

export function getDeepCopy(arg) {
    return JSON.parse(JSON.stringify(arg));
}

export function adaptProductsToBeListed(products) {
    // Copia profunda para poder editar valores
    products = getDeepCopy(products);
    // Ordeno el array
    products.sort((a, b) => b.id - a.id);
    products.forEach(product => {
        // Aca itero para a cada color de cada producto dejarle las files armadas para pintar en front
        product.colors.forEach(color => {
            color.files = product.files?.filter(file => file.colors_id == color.id);
            // Lo ordeno
            color.files?.forEach(file => {
                if (file.file_types_id == 2) {
                    const indexToRemove = color.files.indexOf(file);
                    color.files.splice(indexToRemove, 1);//Lo elimino
                    color.files.splice(1, 0, file); //Lo pongo 2do
                }
            });
        })
    });
    return products
}


export function clearQuickActions(container) { //Vuelve las quickAction del container a predeterminadas
    container?.querySelector('.product-quick-actions-container')?.classList.remove(`product-quick-actions-container-active`)
    container?.querySelector('.quick-cart-container')?.classList.remove('quick-cart-container-active');
    container?.querySelector('.quick-fav-container')?.classList.remove('quick-fav-container-active');
    container?.querySelector('.quick-sizes-container')?.classList.remove('quick-sizes-container-active');
    removeSizesBtnsListener();//Esta función es para sacrle el eventListener
}

export function disableAllPopups(exception) {
    // desabilita todos los popUps, excepto el que se pasa por argumento
    const popups = document.querySelectorAll('.popup');
    popups.forEach(elem => {
        const className = elem.classList[0];
        elem.classList.remove(`${className}-active`)
    })
}

//Se fija si aparece en pantalla para poder hace algo
export function checkIfIsInScreen(percentege, cb, arg) {
    return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.intersectionRatio >= percentege) {
                // Si aparece, invoco al cb
                cb(arg);
            }
        });
    }, { threshold: percentege });
}

// Se fija si esta en desktop
export function isInDesktop() {
    return window.innerWidth >= 1024 // Mobile & Tablet
}

// Formatea la fecha. Retorna dd/mm/yyyy
export function dateFormater(date) {
    // Dividir la fecha en año, mes y día
    var parts = date.split('-');
    var year = parts[0];
    var month = parts[1];
    var day = parts[2];
    // Devolver la fecha formateada
    return day + '-' + month + '-' + year;
}

// fecha del dia
export function getTodaysDate() {
    // Obtener la fecha actual
    const currentDate = new Date();

    // Obtener el año, mes y día en formato YYYY-MM-DD
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Devuelve true si es todo numerico el valor
export function isNumeric(value) {
    return /^[0-9]*$/.test(value);
}

// Devuelve true si es todo letras el valor
export function isLetter(value) {
    return /^[A-Za-z\s]+$/.test(value)
}

// Devuelve longitud del carro del usuario
export function getCartTotalProducts(user) {
    let cart;
    if (user) {
        cart = user.temporalCart?.temporalItems;
        return cart?.length;
    }
    cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
    return cart?.length
}


// LOGICA DE CARRO

// Cuando tocan el boton del tick (sacan el producto del carro)
// Lo hago función porque lo uso tambien cuando se carga despues
export function handleRemoveCartBtnClick(userLogged){
    const removingCartButtons = document.querySelectorAll('.remove-cart-product');
    let totalProducts = document.querySelectorAll('.products-quantity');
    removingCartButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const card = btn.closest('.product-card-container') || btn.closest('.add-cart-button-container') || btn.closest('.product-card');
            //para llegar al id del producto ..
            const idProd = card.dataset.productid;
            card.querySelector('.loading-container').classList.add('loading-container-active');
            if (userLogged) {//Si hay usuario le pego a la api
                await removeTempItemFromDB(idProd, userLogged); //Función que elimina el producto del carro 
            } else {
                console.log('aca',idProd);
                removeProductfromLocaleCart(idProd)
            }
            // Remuevo el spinner loading
            card.querySelector('.loading-container').classList.remove('loading-container-active');
            // Cambio los iconos
            card.querySelector('.quick-add-cart-btn')?.classList.remove('hidden');
            card.querySelector('.remove-cart-product')?.classList.add('hidden');
            // Le resto uno al numero del carro
            totalProducts.forEach(num => num.innerHTML = parseInt(num.innerHTML) ? parseInt(num.innerHTML) - 1 : '');
        });
    });
};

// Agrega el item en cuestion a la DB
export async function addTempItemToDB(prodId,user) {//Agrega producto a la db
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
            
            // Actualizamos manualmente a user
            user.temporalCart = {
                id: createdCart.tempCart.id,
                temporalItems: []
            };
            user.temporalCart.temporalItems.push({
                temporal_cart_id: createdCart.tempCart.id,
                products_id: prodId,
                quantity: 1
            })
        } else { // Si tenia, tengo que agregarlo al carro que ya esta creado
            let cart = user.temporalCart.temporalItems;
            let prodIndex = cart.findIndex(item => item.products_id == prodId); //busco si esta el prod que selecciónaron en el carro
            // Si el index es 0 o mas, quiere decir que se encuentra => Solo le sumo uno
            if (prodIndex < 0) { //Si NO esta lo agrego, si esta no pasa nada
                let response = (await (await fetch(`${window.location.origin}/api/user/addTempItem`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        tempCartId: user.temporalCart.id,
                        prodId,
                        userId: user.id
                    })
                })).json());
                // Agrego el producto a temporalItems parcial
                user.temporalCart.temporalItems.push({
                    temporal_cart_id: user.temporalCart.id,
                    products_id: prodId,
                    quantity: 1
                })
            }
        }
    } catch (error) {
        console.log("Falle en add: " + error);
    };
};
// Borra el item en cuestion de la DB
export async function removeTempItemFromDB(prodId, user) {
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
    // Lo borro del userLogged
    user.temporalCart.temporalItems = user.temporalCart.temporalItems.filter(item=>item.products_id!=prodId);

}
// Agrega el item en cuestion a localStorage
export function addProductToLocaleCart(prodId) {
    // Obtengo el carrito de sessionStorage
    const cart = JSON.parse(localStorage.getItem('temporalCart')) || [];

    // Verifico si el producto ya está en el carrito
    const productAlreadyInCart = cart.find(item => item.products_id == prodId);
    if (productAlreadyInCart) {
        // Si el producto ya está en el carrito, no hago nada
        return;
    }

    // Agrego el producto al carrito
    cart.push({
        products_id: prodId,
        quantity: 1
    });

    localStorage.setItem('temporalCart', JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
}
// Borra el item en cuestion de localStorage
export function removeProductfromLocaleCart(prodId) {
    // Obtengo el carrito de sessionStorage
    let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];

    cart = cart.filter(prod => prod.products_id != prodId);

    localStorage.setItem('temporalCart', JSON.stringify(cart)); // Guardo el carrito actualizado en sessionStorage
}
// Logica para pintar el boton que corresponda del carro en product Detail
export function checkIfProductIsInCartDetail() {
    const productCard = document.querySelector('.product-container');
    if (!productCard) return
    const productId = productCard.dataset.productid;
    // Hace un find ==> encuentra si el producto esta en el carro
    let productAlreadyInCart;
    if (userLogged) {
        productAlreadyInCart = userLogged.temporalCart?.temporalItems.find(item => item.products_id == productId);
    } else {
        let cart = JSON.parse(localStorage.getItem('temporalCart')) || [];
        productAlreadyInCart = cart.find(item => item.products_id == productId);
    }
    if (productAlreadyInCart) {
        productCard.querySelector('.quick-add-cart-btn').classList.add('hidden');
        productCard.querySelector('.remove-cart-product').classList.remove('hidden');
    }
}