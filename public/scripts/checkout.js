import { getDeepCopy, handleRemoveCartBtnClick, isInDesktop, isLetter, isNumeric } from "./utils.js";
window.scrollTo(0, 0);
// agarro el contenedor de tarjetas
const productCardWrapper = document.querySelector('.product-card-wrapper');
// Si no hay usuario, tengo que pintar desde el LocalStorage
await checkForUserLogged();
// Si no hay usuario, se pinto devuelta la vista => llamo a la función
if (!window.userLogged) handleRemoveCartBtnClick(window.userLogged);

//Agarro las provincias
const provinces = Array.from(document.querySelectorAll('#billing_province option'));

checkIfCartIsEmpty();
function checkIfCartIsEmpty(){
    const cartLength = document.querySelectorAll('.product-card').length;
    if(cartLength==0){
        productCardWrapper.innerHTML = `<p class="no-products-msg">No tienes productos en el carro</p>`;
        document.querySelector('.start-buy-button').classList.add('disabled')
    };
}
// Logica para hacer a todos los input con valor 1
document.querySelectorAll('.product-quantity').forEach(inp => {
    inp.value = 1;
    inp.addEventListener('change', () => {
        if (inp.value <= 0) inp.value = 1;
        const card = inp.closest('.product-card');
        checkInputPrice(card);
    });
});


// Logica para que funcióne el mas y el menos
const reduceProductQuantityBtns = document.querySelectorAll('.subtract-quantity-btn');
const addProductQuantityBtns = document.querySelectorAll('.add-quantity-btn');

const handleAddingQuantity = (e) => { //función que se encarga de manera el click del +
    const parentDiv = e.target.closest('div');
    const productCard =  e.target.closest('.product-card');
    // agarro el icono de eliminar prod
    const trashIcon = productCard.querySelector('.bx-trash')
    // Agarro al input mas cerca
    trashIcon.classList.remove('bx-trash-active')
    const input = parentDiv.querySelector('.product-quantity');
    const substractQuantityIcon = parentDiv.querySelector('.subtract-quantity-btn')
    substractQuantityIcon.classList.remove('subtract-quantity-btn-inactive')
    input.value = parseInt(input.value) + 1;
    if (input.value >= 1) {
       /*  trashIcon.classList.contains('bx-trash-active') && trashIcon.classList.remove('bx-trash-active') */
        parentDiv.querySelector('.subtract-quantity-btn').classList.add('available')
    }
    checkInputPrice(parentDiv.closest('.product-card'));

    // checkRowPrices(input.closest('.row'));

}
const handleSubstractingQuantity = (e, btn) => { //función que se encarga de manera el click del +
    // Agarro al input mas cerca
    const parentDiv = e.target.closest('div')
    const productCard =  e.target.closest('.product-card');
    // agarro el icono de eliminar prod
    const trashIcon = productCard.querySelector('.bx-trash')
    const input = parentDiv.querySelector('.product-quantity');

   
    if (input.value <= 2) {
        btn.classList.add('subtract-quantity-btn-inactive')
        input.value = 1;
        e.target.classList.remove('available');
        trashIcon.classList.add('bx-trash-active')
        checkInputPrice(parentDiv.closest('.product-card'));
        return
    }
    input.value = parseInt(input.value) - 1;
    checkInputPrice(parentDiv.closest('.product-card'));
    return

    // checkRowPrices(input.closest('.row'));
}

// logica para confirmar el borrado de cards
const confirmDeleteBtns = document.querySelectorAll('.confirm-delete-product-container');

confirmDeleteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.product-card');
        card.remove()
        getTotalPrice();
        checkIfCartIsEmpty(); 
    })
})


// Voy por cada signo + & - 
reduceProductQuantityBtns.forEach(btn => {
    // Da click en el -
    btn.classList.add('subtract-quantity-btn-inactive')
    btn?.addEventListener('click', (e) => {
       
        handleSubstractingQuantity(e, btn);
    });
});
addProductQuantityBtns.forEach(btn => {
    // Da click en el +
    btn.addEventListener('click', (e) => {
        handleAddingQuantity(e);
    });
});
// Logica para hacer la cuenta de los inputs
function checkInputPrice(card) {
    // agarro el <p> con el precio
    let price = parseInt(card.querySelector('.product-price-span').innerHTML);
    let quantity = parseInt(card.querySelector('.product-quantity').value);
    let totalElement = card.querySelector('.product-subtotal-span');
    totalElement.innerHTML = quantity * price;
    getTotalPrice();
}
// Logica para hacer cuenta toal
function getTotalPrice() {
    let subTotals = document.querySelectorAll('.product-subtotal-span');
    let subTotalElement = document.querySelector('.cart-subtotal-span');
    let totalElement = document.querySelector('.cart-total-span')
    let counter = 0;
    subTotals.forEach(subtotal => {
        counter += parseInt(subtotal.innerHTML)
    });
    subTotalElement.innerHTML = counter;
    totalElement.innerHTML = counter;
}
getTotalPrice();

// Logica para escuchar a los tachos de basura
const removeProductCardBtns = document.querySelectorAll('.remove-cart-product');

removeProductCardBtns.forEach(btn => {
    btn.classList.add('bx-trash-active')
    btn.addEventListener('click', () => {
        // Agarro a la card
        const card = btn.closest('.product-card');
       /*  btn.classList.remove('.bx-trash-active') */
        btn.classList.add('bx-trash-to-confirm') 
        const confirmDeleteContainer = card.querySelector('.confirm-delete-product-container')
        confirmDeleteContainer.classList.add('confirm-delete-product-container-active')
        const productInfoContainer = card.querySelector('.product-info-delete-container .product-info-container')
        productInfoContainer.classList.add('product-info-container-active')
      
      
    });
});

// Logica para cambiar entre retiro por el local y a domicilio
const updateDeliveryChoice = (e) => {
    const deliveryOptions = document.querySelectorAll('.delivery-option-box');
    deliveryOptions.forEach(opt => opt.classList.remove('delivery-option-box-active'));
    e.target.classList.add('delivery-option-box-active');
}
const deliveryOptions = document.querySelectorAll('.delivery-option-box');
deliveryOptions.forEach(opt => {
    opt.addEventListener('click', updateDeliveryChoice)
});

// Logica para que una vez que toque el boton que lleve al segundo paso, se pinten los productos
// en el resumen
const paintSideCards = () => {
    const productCards = document.querySelectorAll('.product-card');
    let productLength = productCards.length;
    let inyectedHTML = '';
    const cardsWrapper = document.querySelector('.product-side-cards-wrapper');
    productCards.forEach(card => {
        let imgPath = card.querySelector('.product-image').src;
        let productName = card.querySelector('.product-name').innerHTML;
        let productQuantity = card.querySelector('.product-quantity').value;
        let productPrice = card.querySelector('.product-subtotal-span').innerHTML;
        inyectedHTML +=
            `
            <article class="product-side-card" data-productid="${card.dataset.productid}">
                <div class="image-container">
                    <img src="${imgPath}" alt="product-side-image" class="product-side-image">
                </div>
                <div class="product-side-info-container">
                    <p class="product-side-name bold">${productName}</p>
                    <p class="product-side-quantity grey">Cantidad: <span class="product-side-quantity-span">${productQuantity}</span></p>
                    <p class="product-side-price">$<span class="product-side-price-span">${productPrice}</span></p>
                </div>
            </article>
            `
    });
    cardsWrapper.innerHTML = inyectedHTML;
    document.querySelector('.product-side-cards-wrapper-quantity-span').innerHTML = productLength;
    // Para los precios
    let subtotal = document.querySelector('.cart-subtotal-span').innerHTML;
    let total = document.querySelector('.cart-total-span').innerHTML
    document.querySelector('.product-side-wrapper-row-subtotal-price-span').innerHTML = subtotal;
    document.querySelector('.product-side-wrapper-row-total-price-span').innerHTML = total;

};
const nextViewButton = document.querySelector('.continue-view-button');
nextViewButton.addEventListener('click', () => {
    paintSideCards();
})

// Logica que cuando vayan tocando el boton de continuar, se pinte el resumen de cada paso
const continueButtons = document.querySelectorAll('.continue-procedure-button');
continueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        let allSectionComplete = sectionIsComplete(btn);
        if (!allSectionComplete) {//Si esta incompleto no hago nada
            return
        }
        const stepFormContainer = btn.closest('.step-form');
        const stepContainer = stepFormContainer.closest('.step-container')
        // Si esta completo verifico antes de mandar que este bien tanto dni como email
        const isValidDNI = stepFormContainer.querySelector('#dni') ? validateUserDNI(stepFormContainer.querySelector('#dni')) : true;
        const isValidEmail = stepFormContainer.querySelector('#email') ? validateUserEmail(stepFormContainer.querySelector('#email')) : true;
        if (!isValidDNI || !isValidEmail) {
            return
        }
        let stepWrapper = stepContainer.querySelector('.step-wrapper');
        // Pregunto que tipo de step es
        const isInfoStep = stepFormContainer.classList.contains('info-step');


        // Si es true, es el de info
        if (isInfoStep) {
            let userName = document.querySelector('#name').value;
            let userLastName = document.querySelector('#last-name').value;
            let userFullName = `${userName} ${userLastName}`
            let userMail = stepFormContainer.querySelector('#email').value;
            let userPhone = stepFormContainer.querySelector('#phone').value;

            let billingAddress = {
                street: stepFormContainer.querySelector('#billing_street').value,
                zipCode: stepFormContainer.querySelector('#billing_zip-code').value,
                apartment: stepFormContainer.querySelector('#billing_floor')?.value || '',
                province: provinces.find(prov => prov.value == stepFormContainer.querySelector('#billing_province').value).innerHTML,
                city: stepFormContainer.querySelector('#billing_city').value
            }

            // invierto que contendor se ve
            stepFormContainer.classList.add('hidden');
            stepWrapper.classList.remove('hidden');
            // Inyecto los datos
            stepWrapper.querySelector('.info-wrapper-mail').innerHTML = userMail;
            stepWrapper.querySelector('.info-wrapper-name').innerHTML = userFullName;
            stepWrapper.querySelector('.info-wrapper-phone-span').innerHTML = userPhone;
            stepWrapper.querySelector('.info-wrapper-zip-code-span').innerHTML = billingAddress.zipCode;
            stepWrapper.querySelector('.info-wrapper-street').innerHTML = `${billingAddress.street} ${billingAddress.apartment}, ${billingAddress.city} , ${billingAddress.province}`;

            // Pregunto si ambos deliver-form y deliver-wrapper estan ocultos, si lo estan es porque es la
            // primera vez que toca en continuar ==> lo hago aparecer. Sino no pasa nada
            if (document.querySelector('.deliver-step').classList.contains('hidden') &&
                document.querySelector('.step-deliver-wrapper').classList.contains('hidden')) {
                // Le saco el hidden al delivery
                document.querySelector('.deliver-step').classList.remove('hidden');
            } else {
                // Aca quiere decir que toco continuar despues de editar. Pregunto si el otro contenedor
                // esta armado ya y si esta elegida la opcion de pago.
                let paymentMethodIsChosen = false;
                paymentMethodInputs.forEach(inp => {
                    if (inp.checked) {
                        paymentMethodIsChosen = true;
                        return
                    }
                })

                if (!document.querySelector('.step-deliver-wrapper').classList.contains('hidden') &&
                    paymentMethodIsChosen) {
                    startPaymentButton.classList.remove('disabled')
                }
            }
            modifyMainHeight('second-view');
        } else { //wrapper de deliver info

            let shippingAddress;
            // Aca pregunto si uso el check de "Usar direccion asociada al usuario"
            let useSameAddressCheckbox = document.querySelector('#use-user-address');
            if (useSameAddressCheckbox && useSameAddressCheckbox.checked) {
                shippingAddress = {
                    street: stepFormContainer.querySelector('#shipping-address-street-p').innerHTML,
                    zipCode: stepFormContainer.querySelector('#shipping-address-zip-code-p').innerHTML,
                    apartment: stepFormContainer.querySelector('#shipping-address-apartment-p')?.innerHTML || '',
                    province: stepFormContainer.querySelector('#shipping-address-province-p').innerHTML,
                    city: stepFormContainer.querySelector('#shipping-address-city-p').innerHTML,
                }
            } else {
                shippingAddress = {
                    street: stepFormContainer.querySelector('#shipping_street').value,
                    zipCode: stepFormContainer.querySelector('#shipping_zip_code').value,
                    apartment: stepFormContainer.querySelector('#shipping_floor')?.value || '',
                    province: provinces.find(prov => prov.value == stepFormContainer.querySelector('#shipping_province').value).innerHTML,
                    city: stepFormContainer.querySelector('#shipping_city').value,
                }
            }

            // invierto que contendor se ve
            stepFormContainer.classList.add('hidden');
            stepWrapper.classList.remove('hidden');
            // Aca pregunto si el checkbox de usar misma dirección esta chequeado
            const useSameAddress = document.querySelector('#use-same-address').checked;
            const usingSameAddressWrapper = document.querySelector('.using-same-address');
            const usingdifferentAddressWrapper = document.querySelector('.using-different-address');

            // Agarro y pregunto que tipo de envio eligio (DOMICILIO - RETIRO)
            const deliverType = document.querySelector('#order_types_id').value;
            const retireWrapper = document.querySelector('.retire-wrapper');

            if (deliverType == 1) {//ENVIO
                // El wrapper de retiro de base que no va
                retireWrapper.classList.add('hidden');
                // Me fijo cual de los otros wrappers van
                if (useSameAddress) {
                    // Le cambio las clases a los wrappers
                    usingSameAddressWrapper.classList.remove('hidden');
                    usingdifferentAddressWrapper.classList.add('hidden');
                } else {
                    // Le cambio las clases a los wrappers
                    usingSameAddressWrapper.classList.add('hidden');
                    usingdifferentAddressWrapper.classList.remove('hidden');
                    stepWrapper.querySelector('.deliver-wrapper-zip-code-span').innerHTML = shippingAddress.zipCode;
                    stepWrapper.querySelector('.deliver-wrapper-address').innerHTML = `${shippingAddress.street} ${shippingAddress.apartment}, ${shippingAddress.city}, ${shippingAddress.province} `;
                }
            } else { //RETIRO
                // El wrapper de retiro de base va
                retireWrapper.classList.remove('hidden');
                // Agarro los otros dos y le pinto hidden
                const deliverOptionsWrapper = document.querySelectorAll('.deliver-option-wrapper');
                deliverOptionsWrapper.forEach(cont => cont.classList.add('hidden'));
            }


            // Le saco el hidden al de payment
            document.querySelector('.payment-step').classList.remove('hidden');
            modifyMainHeight('second-view');

            // Pregunto si esta elegido el payment method y si el wrapper de info esta activo
            let paymentMethodIsChosen = false;
            paymentMethodInputs.forEach(inp => {
                if (inp.checked) {
                    paymentMethodIsChosen = true;
                    return
                }
            })
            if (!document.querySelector('.step-info-wrapper').classList.contains('hidden') &&
                paymentMethodIsChosen) {
                startPaymentButton.classList.remove('disabled')
            }
        };
        // Muestro el boton para editar
        stepContainer.querySelector('.edit-step-btn').classList.remove('hidden');
    });

    // LOGICA DE SI TOCAN EL BOTON DE EDITAR
    const editStepBtns = document.querySelectorAll('.edit-step-btn');
    editStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // No pueden iniciar compra si esta abierto el edit
            startPaymentButton.classList.add('disabled');
            modifyMainHeight('second-view');
            const stepContainer = btn.closest('.step-container');
            // Le saco el hidden al form
            stepContainer.querySelector('.step-form').classList.remove('hidden');
            // Le meto el hidden al wrapper
            stepContainer.querySelector('.step-wrapper').classList.add('hidden');
            // Oculto el boton
            btn.classList.add('hidden');
        });
    });
});

// Logica de si toca INICIAR COMPRA cambie de view
const continueViewBtn = document.querySelector('.continue-view-button');
const stepViews = document.querySelectorAll('.view');
const main = document.querySelector('.main');
// Cuando arranca le tengo que decir al main que tome la altura del 1er view 
modifyMainHeight('first-view')

continueViewBtn.addEventListener('click', () => {
    window.scrollTo(0, 0);
    stepViews.forEach(view => view.style.transform = `translateX(-100%)`);
    // Aca se que esta en el 2do paso
    // Cambio la altura del main
    modifyMainHeight('second-view');
});

function modifyMainHeight(className) {
    let maxHeight = document.querySelector(`.${className}`).offsetHeight;
    if (isInDesktop()) {
        main.style.maxHeight = `${maxHeight + 300}px`;
    } else {
        main.style.maxHeight = `${maxHeight + 100}px`;
    }
};

// Función que se va a fijar si los campos que tiene que completar el usuario son completados
const sectionIsComplete = (btn) => {
    // Primero capturo el step donde se encuentra
    const stepForm = btn.closest('.step-form');
    const requiredInputs = stepForm.querySelectorAll('.required');
    // Bandera para verificar si todos los campos están completos
    var allFieldsComplete = true;
    // Itera sobre los campos requeridos y verifica si están completos
    for (var i = 0; i < requiredInputs.length; i++) {
        var input = requiredInputs[i];
        let field = input.closest('.field');
        if (input.value === '') {
            allFieldsComplete = false;
            field.classList.add('incomplete-field');
            if (!field.querySelector('.msg')) {//Si no tiene msg
                // Crear el mensaje adiciónal
                const additionalMessage = document.createElement('span');
                additionalMessage.classList.add('msg');
                additionalMessage.innerHTML = 'Debes completar el campo'
                // Insertar el mensaje adiciónal después del label
                field.appendChild(additionalMessage);
            }
        } else {
            // Elimina la clase de estilo si el campo está completo
            field.classList.remove('incomplete-field');
        }
    }
    return allFieldsComplete
};

const checkForInputChange = () => {
    let requiredInputs = document.querySelectorAll('.required');
    requiredInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let field = input.closest('.field')
            if (e.target.value) {
                field.classList.remove('incomplete-field');
                field.querySelector('.msg')?.remove()
            }
        });
    });
}
checkForInputChange();

// Logica para que todos los inputs numericos no acepten letras
let numericInputs = document.querySelectorAll('.numeric-only-input');
numericInputs.forEach(input => {
    // Tomo el ultimo valor
    let lastInputValue = input.value;
    input.addEventListener("input", function (e) {
        var inputValue = e.target.value;
        if (!isNumeric(inputValue)) { // Si no es un número, borra el contenido del campo
            e.target.value = lastInputValue;
        } else {
            lastInputValue = inputValue; // Almacenar el último valor válido
        }
    });
});

// Logica para que todos los input de solo letras no acepten numeros
let letterInputs = document.querySelectorAll('.letter-only-input');
letterInputs.forEach(input => {
    // Tomo el ultimo valor
    let lastInputValue = input.value;
    input.addEventListener("input", function (e) {
        var inputValue = e.target.value;
        if (isLetter(inputValue) || inputValue == '') { // Si no es letra, borra el contenido del campo
            lastInputValue = inputValue; // Almacenar el último valor válido
        } else {
            e.target.value = lastInputValue;
        }
    });
});


const validateUserDNI = (input) => {
    let booleanValue = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/.test(input?.value);
    let field = input.closest('.field');
    if (!booleanValue) { //Si esta mal el dni
        field.classList.add('incomplete-field');
        if (!field.querySelector('.msg')) {//Si no tiene msg
            // Crear el mensaje adiciónal
            const additionalMessage = document.createElement('span');
            additionalMessage.classList.add('msg');
            additionalMessage.innerHTML = 'Debes ingresar un formato correcto de DNI'
            // Insertar el mensaje adiciónal después del label
            field.appendChild(additionalMessage);
        }
    } else {
        field.classList.remove('incomplete-field');
        field.querySelector('.msg')?.remove();
    };
    return booleanValue;
}
const validateUserEmail = (input) => {
    let booleanValue = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value)
    let field = input.closest('.field');
    if (!booleanValue) { //Si esta mal el email
        field.classList.add('incomplete-field');
        if (!field.querySelector('.msg')) {//Si no tiene msg
            // Crear el mensaje adiciónal
            const additionalMessage = document.createElement('span');
            additionalMessage.classList.add('msg');
            additionalMessage.innerHTML = 'Debes ingresar un formato correcto de Email'
            // Insertar el mensaje adiciónal después del label
            field.appendChild(additionalMessage);
        }
    } else {
        field.classList.remove('incomplete-field');
        field.querySelector('.msg')?.remove();
    }
    return booleanValue;
};

// Logica de si tocan "Usar misma direccion"
const useSameAddress = document.querySelector('#use-same-address');
const shippingAddressSection = document.querySelector('.shipping-address-section');
useSameAddress.addEventListener('click', (e) => {
    let requiredInputs = shippingAddressSection.querySelectorAll('.required-field input');
    if (e.target.checked) {
        shippingAddressSection.classList.add('hidden');
        // Le saco el required a todos los campos del shipping address
        requiredInputs.forEach(inp => inp.classList.remove('required'));
        return
    }
    shippingAddressSection.classList.remove('hidden');
    // Le meto el required a todos los campos del shipping address
    requiredInputs.forEach(inp => inp.classList.add('required'));
});

// Logica para tipo de orden (ENVIO/RETIRAR)
const deliverOptionBoxes = document.querySelectorAll('.delivery-option-box');
const deliverTypeInput = document.querySelector('#order_types_id');
const retireSection = document.querySelector('.retire-section');
deliverOptionBoxes.forEach(opt => {
    opt.addEventListener('click', () => {
        let typeId = opt.dataset.typeid;
        let requiredInputs = shippingAddressSection.querySelectorAll('.required-field input');

        // Le meto el valor ese al input
        deliverTypeInput.value = typeId;
        // Pregunto si es retirar por el local se muestra el section de RETIRO, sino el otro
        if (typeId == 1) { //ENVIO
            // Muestro y oculto los section que corresponden
            retireSection.classList.add('hidden');
            shippingAddressSection.classList.remove('hidden');
            document.querySelector('.use-same-address-field').classList.remove('hidden');

            // Me fijo si ya estaba chequeado el usar misma direc
            if (useSameAddress.checked) {
                shippingAddressSection.classList.add('hidden');
                // Si esta chequeado,les saco el required 
                requiredInputs.forEach(inp => inp.classList.remove('required'));
                return
            }
            // Si no esta chequeado, le agrego devuelta el required
            requiredInputs.forEach(inp => inp.classList.add('required'));
            return
        }
        // Si es retiro por el local, tengo que sacar el require de los input
        requiredInputs.forEach(inp => inp.classList.remove('required'));

        // Muestro y oculto los section que corresponden
        retireSection.classList.remove('hidden');
        shippingAddressSection.classList.add('hidden');
        document.querySelector('.use-same-address-field').classList.add('hidden');
        return
    })
});

// Logica de cuando tocan iniciar pago
const startPaymentButton = document.getElementById("button-checkout");
startPaymentButton.addEventListener('click', (e) => {
    // si esta deshabilitado no lo dejo mandar
    if (e.target.classList.contains('disabled')) e.preventDefault();

})

// // LOGICA PARA PAGAR MERCADOPAGO
// const mercadopago = new MercadoPago('TEST-9f50e49e-6924-4a8c-aa39-b3ecb5b4e4c4', {
//     locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
// });
// // Handle call to backend and generate preference.
// document.getElementById("button-checkout").addEventListener("click", function () {
//     let products = [];
//     // Agarro a las tarjetas de productos
//     let productCards = document.querySelectorAll('.product-card');
//     productCards.forEach(card => {
//         products.push({
//             quantity: card.querySelector('.product-quantity').value,
//             description: card.querySelector('.product-name').innerHTML,
//             price: card.querySelector('.product-price-span').innerHTML
//         })
//     })

//     fetch("http://localhost:4500/payment/create_preference", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(products),
//     })
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (preference) {
//             createCheckoutButton(preference.id);

//         })
//         .catch(function (e) {
//             console.log(e);
//             alert("Unexpected error");
//         });
// });
// function createCheckoutButton(preferenceId) {
//     // Initialize the checkout
//     const bricksBuilder = mercadopago.bricks();

//     const renderComponent = async (bricksBuilder) => {
//         if (window.checkoutButton) window.checkoutButton.unmount();
//         await bricksBuilder.create(
//             'wallet',
//             'checkout-button-container', // class/id where the payment button will be displayed
//             {
//                 initialization: {
//                     preferenceId: preferenceId
//                 },
//                 callbacks: {
//                     onError: (error) => console.error(error),
//                     onReady: () => { }
//                 }
//             }
//         );
//     };

//     window.checkoutButton = renderComponent(bricksBuilder);
//     document.querySelector('#button-checkout').remove();
//     // document.querySelector('#button-checkout').innerHTML ='';
//     // document.querySelector('#button-checkout').style.background ='none';
// }

async function checkForUserLogged() {
    try {
        let userLogged = window.userLogged;
        // Si hay usuario en session, se deja como esta
        const params = new URLSearchParams(window.location.search);
        const comesFromEmail = params.get('fromEmail');
        const reloded = params.get('reloded');
         // si viene del mail y no recargo la pagina la refresco
        if(comesFromEmail && !reloded)return window.location.href = '/user/checkout?fromEmail=true&reloded=true'
        // Si hay usuario loggeado entonces no hago nada
        if (userLogged)return
        // si viene del mail y no esta logueado entonces lo llevo al login directo
        if(comesFromEmail && reloded){
            return window.location.href = '/user/login'
        }
        // Si no hay, tengo que pintar el carro con el localStorage
        let localStorageCart = JSON.parse(localStorage.getItem('temporalCart'));
        // Ordeno el carro de ultimo a primero (antiguedad mas reciente)
        localStorageCart?.reverse();
        productCardWrapper.innerHTML =
            `
        <div class="spinner-overlay">
            <p>Cargando productos...</p>
            <div class="spinner-loading"></div>
        </div>
        `

        // Mientras pido los productos hago el cargando...
        let products = await (await (await fetch(`${window.location.origin}/api/product`)).json()).products;
        
        // Saco el spinner
        document.querySelector('.spinner-overlay').remove();
        productCardWrapper.innerHTML = '';
        localStorageCart?.forEach(item => {
            // TODO: Preguntar a martin si esto al ser front deberia manejarse con otro campo
            let product = products.find(prod => prod.id == item.products_id);
            product.filename = product.files.find(file => file.file_types_id == 1)?.filename;
            let cardHTML =
                `
            <article class="product-card" data-productid = ${product.id}>
                <div class="product-card-image-container article-div-child">
                    <img src="${product.file_url || '/img/product/default.png'}" alt="${product.name}-${product.filename}" class="product-image">
                </div>
                <div class="product-name-container article-div-child">
                    <p class="product-name">${product.name}</p>
                </div>
                <div class="product-price-container article-div-child">
                    <p class="product price">$<span class="product-price-span">${product.price}</span></p>
                </div>
                <div class="product-quantity-container article-div-child">
                    <i class='bx bx-plus-medical add-quantity-btn'></i>
                    <i class='bx bx-minus subtract-quantity-btn'></i>
                    <input type="number" name="quantity" id="" class="product-quantity">
                </div>
                <div class="product-subtotal-container article-div-child">
                    <p class="product-subtotal">$ <span class="product-subtotal-span">${product.price}</span></p>
                </div>
                <i class='bx bx-trash remove-cart-product'></i>
                <div class="loading-container">
                    <div class="load-wrapp">
                        <div class="load-3">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                        </div>
                    </div>
                </div>
            </article>
            `;
            productCardWrapper.innerHTML += cardHTML;
        });
        if (!localStorageCart || localStorageCart.length == 0) {
            productCardWrapper.innerHTML = `<p class="no-products-msg">No tienes productos en el carro</p>`;
            document.querySelector('.start-buy-button').classList.add('disabled')
        }

        return

    } catch (error) {
        return console.log(`Falle en checkForUserLogged: ${error}`);
    }
}

//logica para pintar forma de pago en el second-view
const boxes = document.querySelectorAll('.box-container')
const boxesType = document.querySelectorAll('.payment-field')
const paymentMethodInputs = document.querySelectorAll('.payment-method-input');
const stepWrappers = document.querySelectorAll('.step-wrapper');

// Logica de si me viene con errores pinto un mensaje 3 segundos tarjeta de "ERROR"
const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const param = urlParams.get('checkoutErrors');
if (param) {
    const msg = urlParams.get('msg');
    const errorCard = document.querySelector('.error-card');
    errorCard.innerHTML = msg;
    errorCard.classList.remove('hidden');
    setTimeout(() => {
        errorCard.classList.add('error-card-inactive');
        setTimeout(() => {
            errorCard.classList.add('hidden');
        }, 2000)
    }, 4000);
}


boxes.forEach((box, indexBox) => {
    box.addEventListener('click', () => {
        // Si todos los stepWrappers estan mostrandose es que se completo todo ==> habilito el boton
        let allWrappersAreShown = true;
        stepWrappers.forEach(wrap => wrap.classList.contains('hidden') ? allWrappersAreShown = false : null);
        // Le saco la clase disabled al button
        allWrappersAreShown && startPaymentButton.classList.remove('disabled');

        for (let indexBoxType = 0; indexBoxType < boxesType.length; indexBoxType++) {
            boxesType[indexBoxType].classList.remove('payment-field-active')
            boxes[indexBoxType].classList.remove('box-container-active')
            if (indexBox == indexBoxType) {
                // box.classList.add('box-container-active')
                box.querySelector('input').checked = true;
                boxesType[indexBoxType].classList.add('payment-field-active');

            };
        };
    });
});

// Logica de si chekea "Utilizar direccion asociada a usuario"
const useUserAddress = document.querySelector('#use-user-address');
const saveUserAddressField = document.querySelector('.save-user-address-field');
const shippingAddressFields = document.querySelectorAll('.shipping-field');
useUserAddress?.addEventListener('input', (e) => {
    // Voy por todos los campos del shipping address
    shippingAddressFields.forEach(field => {
        const input = field.querySelector('input, select');
        const addressP = field.querySelector('.shipping-address-p');
        if (e.target.checked) {//Si esta checkeado voy por cada input y lo armo un p
            // Le saco el required al input
            input.classList.remove('required')
            // Intercambio las clases
            input?.classList.add('hidden');
            addressP?.classList.remove('hidden');
            // si esta usando la direccion del usuario al pedo pintar le checkbox de 'Guardar direccion'
            saveUserAddressField?.classList.add('hidden');
            return;
        }
        // Le agrego el required al input
        field.classList.contains('required-field') && input.classList.add('required');
        // Intercambio las clases
        input?.classList.remove('hidden');
        addressP?.classList.add('hidden');
        saveUserAddressField?.classList.remove('hidden');
        return;
    });
})


const form = document.getElementById('checkout-form');
form.addEventListener('submit', async (e) => {
    try {
        e.preventDefault();
        // si esta loggeado 
        if (window.userLogged) { // Logica para enviar form con users_id
            let userIdInput = document.createElement('input');
            userIdInput.type = 'hidden';
            userIdInput.value = window.userLogged.id;
            userIdInput.name = 'users_id';
            form.appendChild(userIdInput)
        };
        // Tengo que armar el objeto items
        let itemsInput = document.createElement('input');
        itemsInput.type = 'hidden';
        itemsInput.name = 'items';
        let itemsArray = [];
        // ahora voy por cada item que el usuario compro y lo meto en este array
        const itemsConfirmed = document.querySelectorAll('.product-side-card');
        itemsConfirmed.forEach(item => {
            const products_id = item.dataset.productid;
            const quantity = item.querySelector('.product-side-quantity-span').innerHTML;
            itemsArray.push({
                products_id,
                quantity
            });
        });
        itemsInput.value = JSON.stringify(itemsArray);
        form.appendChild(itemsInput);
        // Armo el body
        let items = form.querySelector('input[name="items"]').value;
        let users_id = window.userLogged.id || null;
        let name = form.querySelector('input[name="name"]').value;
        let last_name = form.querySelector('input[name="last_name"]').value;
        let email = form.querySelector('input[name="email"]').value;
        let dni = form.querySelector('input[name="dni"]').value;
        let phone_code = form.querySelector('select[name="phone_code"]').value;
        let phone = form.querySelector('input[name="phone"]').value;
        let billing_street = form.querySelector('input[name="billing_street"]').value;
        let billing_zip_code = form.querySelector('input[name="billing_zip_code"]').value;
        let billing_floor = form.querySelector('input[name="billing_floor"]').value;
        let billing_province = form.querySelector('select[name="billing_province"]').value;
        let billing_city = form.querySelector('input[name="billing_city"]').value;
        let order_types_id = form.querySelector('input[name="order_types_id"]').value;
        let payment_methods_id = form.querySelector('input[name="payment_methods_id"]:checked').value;
        let shipping_street = form.querySelector('input[name="shipping_street"]').value;
        let shipping_floor = form.querySelector('input[name="shipping_floor"]').value;
        let shipping_city = form.querySelector('input[name="shipping_city"]').value;
        let shipping_province = form.querySelector('select[name="shipping_province"]').value;
        let shipping_zip_code = form.querySelector('input[name="shipping_zip_code"]').value;
        // Estas 3 son los radio, entonces pregunto asi
        let use_same_address = form.querySelector('input[name="use_same_address"]').checked ? 
        form.querySelector('input[name="use_same_address"]').value : null;
        let save_user_address = form.querySelector('input[name="save_user_address"]').checked ? 
        form.querySelector('input[name="save_user_address"]').value : null;
        let use_user_address = form.querySelector('input[name="use_user_address"]').checked ? 
        form.querySelector('input[name="use_user_address"]').value : null;
        const bodyForm = {
            items,
            users_id,
            name,
            last_name,
            email,
            dni,
            phone_code,
            phone,
            billing_street,
            billing_zip_code,
            billing_floor,
            billing_province,
            billing_city,
            order_types_id,
            use_same_address,
            payment_methods_id,
            save_user_address,
            use_user_address,
            shipping_street,
            shipping_floor,
            shipping_city,
            shipping_province,
            shipping_zip_code,
        }
        // Hago el fetch
        let fetchResponse = await fetch('/api/user/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify(bodyForm)
        });
        if (!fetchResponse.ok) {
            // console.log(fetchResponse);
            const errorMsg = 'Error al procesar la venta';
            window.location.href = `/user/checkout?checkoutErrors=${true}&msg=${errorMsg}`;
            return
        };
        // Una vez que se compra, si no hay usuario se borra el carro del locale
        if(!window.userLogged){
            localStorage.removeItem('temporalCart');
        };
        window.location.href = `/`;
    } catch (error) {
        return console.log(`Error en el envio del formulario: ${error}`);
    }
});
