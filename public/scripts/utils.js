export function deactivateClass(array) {
    //El array que llegan son los nombres de las clases de las funciónes
    // a las cuales quiero agregar el '#nombreClase-active'
    array.forEach(element => {
        document.querySelector(`.${element}`)?.classList.remove(`${element}-active`);
    });
}

export async function getLoggedUser() {
    let response =  (await (await fetch(`/api/user/getLoggedUserId`)).json());
    return response.ok ? response : undefined;
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

// Recibe fecha de DB y devuelve 15 de agosto de 2021
export function getPrettyDate(dbDate){
    const date = new Date(dbDate);
    
    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'long' });
    const year = date.getFullYear();

    return `${day} de ${month} del ${year}`
};
// Recibe fecha de DB y devuelve ago 15, 2023
export function getPrettyDateReversed(dbDate){
    const date = new Date(dbDate);
    
    const day = date.getDate();
    let month = date.toLocaleString('es', { month: 'short' });
    month = month.charAt(0).toUpperCase() + month.slice(1); //Primer letra en mayuscula
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`
}