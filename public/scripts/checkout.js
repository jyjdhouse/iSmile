window.addEventListener('load', () => {
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
            const stepFormContainer = btn.closest('.step-form');
            const stepContainer = stepFormContainer.closest('.step-container')
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
                    streetNumber: stepFormContainer.querySelector('#street-number').value,
                    apartment: stepFormContainer.querySelector('#floor')?.value || '',
                    province: stepFormContainer.querySelector('#province').value,
                    city: stepFormContainer.querySelector('#city').value
                }
                // invierto que contendor se ve
                stepFormContainer.classList.add('hidden');
                stepWrapper.classList.remove('hidden');
                stepWrapper.querySelector('.deliver-wrapper-zip-code-span').innerHTML = zipCode;
                stepWrapper.querySelector('.deliver-wrapper-name').innerHTML = userFullName;
                stepWrapper.querySelector('.deliver-wrapper-address').innerHTML = `${userAddress.street} ${userAddress.streetNumber} ${userAddress.apartment}, ${userAddress.province}, ${userAddress.city} `;
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
        main.style.maxHeight = `${maxHeight}px`
    }
});