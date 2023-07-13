import { handleRemoveCartBtnClick, isLetter, isNumeric } from "./utils.js";

// Si no hay usuario, tengo que pintar desde el LocalStorage
await checkForUserLogged();
// Si no hay usuario, se pinto devuelta la vista => llamo a la funcion
if(!window.userLogged)handleRemoveCartBtnClick(window.userLogged);
// Logica para hacer a todos los input con valor 1
document.querySelectorAll('.product-quantity').forEach(inp => {
    inp.value = 1;
    inp.addEventListener('change', () => {
        if (inp.value <= 0) inp.value = 1;
        const card = inp.closest('.product-card');
        checkInputPrice(card);
    });
});


// Logica para que funcione el mas y el menos
const reduceProductQuantityBtns = document.querySelectorAll('.subtract-quantity-btn');
const addProductQuantityBtns = document.querySelectorAll('.add-quantity-btn');
const handleAddingQuantity = (e) => { //funcion que se encarga de manera el click del +
    const parentDiv = e.target.closest('div');
    // Agarro al input mas cerca
    const input = parentDiv.querySelector('.product-quantity');
    input.value = parseInt(input.value) + 1;
    if (input.value >= 1) {
        parentDiv.querySelector('.subtract-quantity-btn').classList.add('available')
    }
    checkInputPrice(parentDiv.closest('.product-card'));

    // checkRowPrices(input.closest('.row'));

}
const handleSubstractingQuantity = (e) => { //funcion que se encarga de manera el click del +
    // Agarro al input mas cerca
    const parentDiv = e.target.closest('div')
    const input = parentDiv.querySelector('.product-quantity');
    if (input.value <= 2) {
        input.value = 1;
        e.target.classList.remove('available');
        checkInputPrice(parentDiv.closest('.product-card'));
        return
    }
    input.value = parseInt(input.value) - 1;
    checkInputPrice(parentDiv.closest('.product-card'));
    return

    // checkRowPrices(input.closest('.row'));
}
// Voy por cada signo + & - 
reduceProductQuantityBtns.forEach(btn => {
    // Da click en el -
    btn.addEventListener('click', (e) => {
        handleSubstractingQuantity(e);
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
    btn.addEventListener('click', () => {
        // Agarro a la card
        const card = btn.closest('.product-card');
        card.remove();
        getTotalPrice();
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
            <article class="product-side-card">
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
        // Esto lo usan ambos
        let userName = document.querySelector('#name').value;
        let userLastName = document.querySelector('#last-name').value;
        let userFullName = `${userName} ${userLastName}`
        // Si es true, es el de info
        if (isInfoStep) {
            let userMail = stepFormContainer.querySelector('#email').value;
            let userPhone = stepFormContainer.querySelector('#phone').value;
            // invierto que contendor se ve
            stepFormContainer.classList.add('hidden');
            stepWrapper.classList.remove('hidden');
            stepWrapper.querySelector('.info-wrapper-mail').innerHTML = userMail;
            stepWrapper.querySelector('.info-wrapper-name').innerHTML = userFullName;
            stepWrapper.querySelector('.info-wrapper-phone-span').innerHTML = userPhone;
            // Pregunto si ambos deliver-form y deliver-wrapper estan ocultos, si lo estan es porque es la
            // primera vez que toca en continuar ==> lo hago aparecer. Sino no pasa nada
            if (document.querySelector('.deliver-step').classList.contains('hidden') &&
                document.querySelector('.step-deliver-wrapper').classList.contains('hidden')) {
                // Le saco el hidden al delivery
                document.querySelector('.deliver-step').classList.remove('hidden');
            }
            modifyMainHeight('second-view');
        } else { //wrapper de deliver info
            let zipCode = stepFormContainer.querySelector('#zip-code').value;
            let userAddress = {
                street: stepFormContainer.querySelector('#street').value,
                zipCode,
                apartment: stepFormContainer.querySelector('#floor')?.value || '',
                province: stepFormContainer.querySelector('#province').value,
                city: stepFormContainer.querySelector('#city').value
            }
            // invierto que contendor se ve
            stepFormContainer.classList.add('hidden');
            stepWrapper.classList.remove('hidden');
            stepWrapper.querySelector('.deliver-wrapper-zip-code-span').innerHTML = zipCode;
            stepWrapper.querySelector('.deliver-wrapper-name').innerHTML = userFullName;
            stepWrapper.querySelector('.deliver-wrapper-address').innerHTML = `${userAddress.street} ${userAddress.apartment}, ${userAddress.province}, ${userAddress.city} `;
            // Le saco el hidden al de payment
            document.querySelector('.payment-step').classList.remove('hidden');
            modifyMainHeight('second-view');
        };
        // Muestro el boton para editar
        stepContainer.querySelector('.edit-step-btn').classList.remove('hidden');
    });

    // LOGICA DE SI TOCAN EL BOTON DE EDITAR
    const editStepBtns = document.querySelectorAll('.edit-step-btn');
    editStepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
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
    main.style.maxHeight = `${maxHeight + 500}px`
};

// Funcion que se va a fijar si los campos que tiene que completar el usuario son completados
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
                // Crear el mensaje adicional
                const additionalMessage = document.createElement('span');
                additionalMessage.classList.add('msg');
                additionalMessage.innerHTML = 'Debes completar el campo'
                // Insertar el mensaje adicional después del label
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
        if (!isLetter(inputValue)) { // Si no es letra, borra el contenido del campo
            e.target.value = lastInputValue;
        } else {
            lastInputValue = inputValue; // Almacenar el último valor válido
        }
    });
});


const validateUserDNI = (input) => {
    let booleanValue = /^[\d]{1,3}\.?[\d]{3,3}\.?[\d]{3,3}$/.test(input?.value);
    let field = input.closest('.field');
    if (!booleanValue) { //Si esta mal el dni
        field.classList.add('incomplete-field');
        if (!field.querySelector('.msg')) {//Si no tiene msg
            // Crear el mensaje adicional
            const additionalMessage = document.createElement('span');
            additionalMessage.classList.add('msg');
            additionalMessage.innerHTML = 'Debes ingresar un formato correcto de DNI'
            // Insertar el mensaje adicional después del label
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
            // Crear el mensaje adicional
            const additionalMessage = document.createElement('span');
            additionalMessage.classList.add('msg');
            additionalMessage.innerHTML = 'Debes ingresar un formato correcto de Email'
            // Insertar el mensaje adicional después del label
            field.appendChild(additionalMessage);
        }
    } else {
        field.classList.remove('incomplete-field');
        field.querySelector('.msg')?.remove();
    }
    return booleanValue;
};

// LOGICA PARA PAGAR MERCADOPAGO
const mercadopago = new MercadoPago('TEST-9f50e49e-6924-4a8c-aa39-b3ecb5b4e4c4', {
    locale: 'es-AR' // The most common are: 'pt-BR', 'es-AR' and 'en-US'
});
// Handle call to backend and generate preference.
document.getElementById("button-checkout").addEventListener("click", function () {
    let products = [];
    // Agarro a las tarjetas de productos
    let productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        products.push({
            quantity: card.querySelector('.product-quantity').value,
            description: card.querySelector('.product-name').innerHTML,
            price: card.querySelector('.product-price-span').innerHTML
        })
    })

    fetch("http://localhost:4500/payment/create_preference", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            createCheckoutButton(preference.id);

        })
        .catch(function (e) {
            console.log(e);
            alert("Unexpected error");
        });
});
function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    const bricksBuilder = mercadopago.bricks();

    const renderComponent = async (bricksBuilder) => {
        if (window.checkoutButton) window.checkoutButton.unmount();
        await bricksBuilder.create(
            'wallet',
            'checkout-button-container', // class/id where the payment button will be displayed
            {
                initialization: {
                    preferenceId: preferenceId
                },
                callbacks: {
                    onError: (error) => console.error(error),
                    onReady: () => { }
                }
            }
        );
    };

    window.checkoutButton = renderComponent(bricksBuilder);
    document.querySelector('#button-checkout').remove();
    // document.querySelector('#button-checkout').innerHTML ='';
    // document.querySelector('#button-checkout').style.background ='none';
}

async function checkForUserLogged() {
    try {
        let userLogged = window.userLogged;
        // Si hay usuario en session, se deja como esta
        if (userLogged) return;
        // agarro el contenedor de tarjetas
        const productCardWrapper = document.querySelector('.product-card-wrapper');
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
        document.querySelector('.spinner-overlay').remove()
        productCardWrapper.innerHTML = '';
        localStorageCart?.forEach(item=>{
            let product = products.find(prod=>prod.id==item.products_id);
            product.filename = product.files.find(file=>file.file_types_id==1)?.filename;
            let cardHTML = 
            `
            <article class="product-card" data-productid = ${ product.id }>
                <div class="product-card-image-container article-div-child">
                    <img src="/img/product/${ product.filename || 'default.png' }" alt="${ product.name }-${ product.filename }" class="product-image">
                </div>
                <div class="product-name-container article-div-child">
                    <p class="product-name">${ product.name }</p>
                </div>
                <div class="product-price-container article-div-child">
                    <p class="product price">$<span class="product-price-span">${ product.price }</span></p>
                </div>
                <div class="product-quantity-container article-div-child">
                    <i class='bx bx-plus-medical add-quantity-btn'></i>
                    <i class='bx bx-minus subtract-quantity-btn'></i>
                    <input type="number" name="quantity" id="" class="product-quantity">
                </div>
                <div class="product-subtotal-container article-div-child">
                    <p class="product-subtotal">$ <span class="product-subtotal-span">${ product.price }</span></p>
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
        if(!localStorageCart || localStorageCart.length ==0){
            productCardWrapper.innerHTML = `<p class="no-products-msg">No tienes productos en el carro</p>`;
        }
        
        return
        
    } catch (error) {
        return console.log(`Falle en checkForUserLogged: ${error}`);
    }
}

//logica para pintar forma de pago en el second-view
const boxes = document.querySelectorAll('.box-container')
const boxesType = document.querySelectorAll('.payment-field')

boxes.forEach((box, indexBox) => {
    box.addEventListener('click', () => {
        for(let indexBoxType = 0; indexBoxType < boxesType.length; indexBoxType++){
            boxesType[indexBoxType].classList.remove('payment-field-active')
            boxes[indexBoxType].classList.remove('box-container-active')
            if(indexBox == indexBoxType){
                box.classList.add('box-container-active')
                boxesType[indexBoxType].classList.add('payment-field-active')
            }
        }
    })
})