import { activateClass } from './utils.js';
import { getLoggedUser } from './utils.js';
window.addEventListener('load', () => {


    // all screen sizes variables
    const container = document.querySelector('.checkout-steps-list-container');
    const body = document.querySelector('body')
    const isUserLogged = document.querySelector('.user-logged')
    const stepsContainers = document.querySelectorAll('.checkout-step-container')
    const orderItems = document.querySelectorAll('.order-item')
    const noProductInCart = document.querySelector('.no-products-in-cart-container')
    const startPurchaseBtn = document.querySelector('.start-purchase-btn')
    const purchaseAmount = document.querySelector('.total-order-price-container')
    const loginBtn = document.querySelector('.checkout-login-btn')
    const registerBtn = document.querySelector('.checkout-register-btn')
    const checkoutAsGuestBtn = document.querySelector('.checkout-as-guest-btn')
    const stepBackBtn = document.querySelector('.step-back-btn')
    const dotsContainer = document.querySelector('.order-detail-user-position')
    const completeWithUserDataInput = document.querySelector('.complete-with-user-data')
    const shipmentModeInputs = document.getElementsByName('shipment-mode-input')
    const paymentTypeInputs = document.getElementsByName('payment-type-input')
    const inputLabelContainers = document.querySelectorAll('.input-label-container')
    let activeContainerHeight;
    let userCircles;
    let totalOrderPrice = document.querySelector('.total-order-price')
    let countOrderItems = orderItems.length
    let orderPriceAccumulator = 0
    let activeUser;


    // mobile variables
    const removeProductBtns = document.querySelectorAll('.delete-checkout-product-btn');
    const addItemQuantityBtn = document.querySelectorAll('.add-item-quantity')
    const substractItemQuantityBtn = document.querySelectorAll('.substract-item-quantity')
    const mobileOrderItemPrice = document.querySelectorAll('.mobile-order-item-price')

    // desktop variables
    const desktopOrderItemPrice = document.querySelectorAll('.desktop-order-item-price')
    const orderDetailLabel = document.querySelector('.order-detail-label')
    const stepsNameNoUserLogged = [
        { step: 'resumen' },
        { step: 'usuario' },
        { step: 'envio' }
    ]
    const stepsNameUserLogged = [
        { step: 'resumen' },
        { step: 'envio' }
    ]

    // classesname
    const blackScreen = 'black-screen';
    const loginRegisterContainer = 'login-register-container';
    const registrationFormContainer = 'registration-form-container';

    let [classesToActivate, classesToDeactivate] = [];


    let activeStep = 0


    //primero veo si el usuario está
    if (isUserLogged) {

        const getUser = async () => {
            if (isUserLogged) {
                try {
                    const getUserId = await getLoggedUser()
                    const userId = await getUserId.userId
                    const userResponse = await fetch(`/api/user/${userId}`)
                    const userData = await userResponse.json()
                    activeUser = userData.meta.user

                } catch (error) {
                    console.log(`Error getting user: ${error}`)
                }

            }
        }

        getUser()
    }



    const getFirstOrderTotal = () => {
        let accumulator = 0
        orderItems.forEach(item => {
            let itemUnitPrice = Number(item.querySelector('.desktop-unit-price').innerText)
            accumulator += itemUnitPrice
        })
        totalOrderPrice.innerHTML = accumulator
    }
    getFirstOrderTotal()

    const userCirclesFirstLoad = () => {
        const userCircles = document.querySelectorAll('.step-circle')
        userCircles.forEach((circle, i) => {

            if (i === activeStep) {
                circle.classList.remove('bx-circle')
                circle.classList.add('bxs-circle')
            } else {
                circle.classList.remove('bxs-circle')
                circle.classList.add('bx-circle')
            }

        }
        )
    }

    const userCirclesInteraction = (btn) => {
        const userCircles = document.querySelectorAll('.step-circle');
        userCircles.forEach((circle, i) => {
            if (!isUserLogged) {
                if (i === activeStep) {
                    circle.classList.remove('bx-circle')
                    circle.classList.add('bxs-circle')
                } else {
                    circle.classList.remove('bxs-circle')
                    circle.classList.add('bx-circle')
                }
            } else {
                if (btn?.classList.contains('start-purchase-btn')) {
                    if (i === activeStep - 1) {
                        circle.classList.remove('bx-circle')
                        circle.classList.add('bxs-circle')
                    } else {
                        circle.classList.remove('bxs-circle')
                        circle.classList.add('bx-circle')
                    }
                } else {
                    if (i === activeStep) {
                        circle.classList.remove('bx-circle')
                        circle.classList.add('bxs-circle')
                    } else {
                        circle.classList.remove('bxs-circle')
                        circle.classList.add('bx-circle')
                    }
                }
            }
        })

    }

    const handleDotsClick = () =>{//Escucha los circulitos de los pasos
        const userCircles = document.querySelectorAll('.step-circle')
        userCircles.forEach((dot,i)=>{
            dot.addEventListener('click',()=>{
                if (activeStep>i) {
                    activeStep = i;
                    stepsInteraction();
                    userCirclesInteraction()
                }
            });
        })
    }
    const baseStepsInUserLogged = () => {//Apenas carga la pagina pinta los circulos
        if (!isUserLogged) {
            for (let i = 0; i < stepsContainers.length; i++) {
                dotsContainer.innerHTML += `
                <i class='step-circle bx'></i>
                <div class="line"></div>
                `
            }
        } else {
            for (let i = 1; i < stepsContainers.length; i++) {
                dotsContainer.innerHTML += `
                <i class='step-circle bx'></i>
                <div class="line"></div>
                `
            }
        }
    }
    baseStepsInUserLogged();
    userCirclesFirstLoad();
    handleDotsClick();

    const displayStepBackBtn = () => {
        if (activeStep != 0) {
            stepBackBtn?.classList.add('step-back-btn-active')
        } else {
            stepBackBtn?.classList.remove('step-back-btn-active')
        }
    }

    function updateStepActiveClases() {
        // Le saco la clase active al ultimo paso activo
        let previousActiveContainer = document.querySelector('.checkout-step-container-active');
        previousActiveContainer?.classList.remove('checkout-step-container-active');

        // Le agrego la clase active al paso que esta ahora activo
        stepsContainers[activeStep].classList.add('checkout-step-container-active');

    }
    // Lógica para hacer display de paso del usuario
    const stepsInteraction = () => {
        const container = document.querySelector('.checkout-steps-list-container');
        updateStepActiveClases();
        // Capturo altura del contenedor activo
        let activeContainerHeight = document.querySelector('.checkout-step-container-active').getBoundingClientRect().height;
        // Le doy esa altura

        container.style.maxHeight = activeContainerHeight
        // Voy por cada paso y hago el transform necesario
        stepsContainers.forEach((step) => {
            step.style.transform = `translateX(-${activeStep * 100}%)`
        })
        displayStepBackBtn()
    }
    stepsInteraction()



    const innerStepName = () => {
        userCircles = document.querySelectorAll('.step-circle')
        if (userCircles.length == 3) {
            stepsNameNoUserLogged.forEach((name, i) => {

                if (i === activeStep) {
                    orderDetailLabel.innerHTML = name.step
                }
            })
        } else {
            stepsNameUserLogged.forEach((name, i) => {

                if (i === activeStep) {
                    orderDetailLabel.innerHTML = name.step
                }
            })
        }

    }
    innerStepName()




    stepBackBtn?.addEventListener('click', () => {
        if (activeStep >= 1) {
            activeStep--
            isUserLogged && activeStep--
            userCirclesInteraction(stepBackBtn)
            stepsInteraction(stepBackBtn)
            innerStepName()
        }
    })


    startPurchaseBtn?.addEventListener('click', () => {
        activeStep++
        isUserLogged && activeStep++
        userCirclesInteraction(startPurchaseBtn)
        stepsInteraction(startPurchaseBtn)
        innerStepName()
    })


    checkoutAsGuestBtn?.addEventListener('click', () => {
        activeStep++
        userCirclesInteraction(checkoutAsGuestBtn)
        stepsInteraction()
        innerStepName()
    })


    // agarra totales de los items ya agregados
    if (window.innerWidth < 1024) {
        mobileOrderItemPrice.forEach(item => {
            const number = Number(item.innerText)

            orderPriceAccumulator += number
        })
        totalOrderPrice ? totalOrderPrice.innerText = orderPriceAccumulator : null;
    } else {
        desktopOrderItemPrice.forEach(item => {
            const number = Number(item.innerText)
            orderPriceAccumulator += number
        })
        totalOrderPrice ? totalOrderPrice.innerText = orderPriceAccumulator : null;
    }

    // remueve item del checkout
    const removeProductInCart = () => {
        removeProductBtns.forEach(btn => {
            btn.addEventListener('click', () => {

                const btnOrderItem = btn.closest('.order-item')

                btnOrderItem.style.display = 'none'
                acummulatorForItemsDeleted(btnOrderItem)

                countOrderItems -= 1
                if (countOrderItems === 0) {
                    noProductInCart.classList.add('no-products-in-cart-container-active')
                    startPurchaseBtn.classList.add('start-purchase-btn-container-inactive')
                    purchaseAmount.classList.add('total-order-price-container-inactive')
                }
            })
        })
    }
    removeProductInCart()




    // calculo el total de la orden cuando un numero se suma o se resta
    const getOrderTotal = (btn) => {

        const btnParent = btn.closest('.order-item')
        const unitPrice = Number(btnParent.querySelector('.desktop-unit-price').innerText)

        if (btn.classList.contains('add-item-quantity')) {

            if (window.innerWidth < 1024) {
                orderPriceAccumulator += unitPrice
                totalOrderPrice.innerText = orderPriceAccumulator

            } else {
                orderPriceAccumulator += unitPrice
                totalOrderPrice.innerText = orderPriceAccumulator
            }

        } else {

            if (window.innerWidth < 1024) {
                orderPriceAccumulator -= unitPrice
                totalOrderPrice.innerText = orderPriceAccumulator

            } else {
                orderPriceAccumulator -= unitPrice
                totalOrderPrice.innerText = orderPriceAccumulator
            }
        }
    }


    // resta acumulador cuando se elimina un item del cart
    const acummulatorForItemsDeleted = (orderItem) => {
        const itemUnitPrice = Number(orderItem.querySelector('.unit-price').innerText)

        if (window.innerWidth < 1024) {
            const mobileItemQuantity = Number(orderItem.querySelector('.order-item-quantity').innerText)
            const numberToSubstract = itemUnitPrice * mobileItemQuantity
            orderPriceAccumulator -= numberToSubstract
            totalOrderPrice.innerText = orderPriceAccumulator
        } else {
            const desktopItemQuantity = Number(orderItem.querySelector('.desktop-order-item-quantity').innerText)
            const numberToSubstract = itemUnitPrice * desktopItemQuantity
            orderPriceAccumulator -= numberToSubstract
            totalOrderPrice.innerText = orderPriceAccumulator
        }


    }

    //logica para multiplicar precio unitario por cantidad
    const orderItemTotalPriceAddQuantity = () => {
        orderItems.forEach(item => {

            const unitPrice = Number(item.querySelector('.desktop-unit-price').innerText)

            // mobile
            const mobileOrderQuantity = Number(item.querySelector('.order-item-quantity').innerText)
            const mobileOrderItemPriceElement = item.querySelector('.mobile-order-item-price')

            //desktop
            const desktopOrderQuantity = Number(item.querySelector('.desktop-order-item-quantity').innerText)
            const desktopOrderItemPriceElement = item.querySelector('.desktop-order-item-price')


            if (window.innerWidth < 1024) {
                const mobileOrderItemTotal = unitPrice * mobileOrderQuantity
                const desktopOrderItemTotal = unitPrice * mobileOrderQuantity
                mobileOrderItemPriceElement.innerHTML = mobileOrderItemTotal
                desktopOrderItemPriceElement.innerHTML = desktopOrderItemTotal
            } else {
                const mobileOrderItemTotal = unitPrice * desktopOrderQuantity
                const desktopOrderItemTotal = unitPrice * desktopOrderQuantity
                mobileOrderItemPriceElement.innerHTML = mobileOrderItemTotal
                desktopOrderItemPriceElement.innerHTML = desktopOrderItemTotal
            }

        })
    }
    orderItemTotalPriceAddQuantity()

    // logica para restar el total de la orden cuando se resta 1 cantidad
    const orderItemTotalSubstractQuantity = (btn) => {

        const btnParent = btn.closest('.order-item')
        const unitPrice = Number(btnParent.querySelector('.desktop-unit-price').innerText)

        //mobile
        const mobileCurrentOrderTotalElement = btnParent.querySelector('.order-item-price')
        const mobileCurrentOrderTotal = Number(mobileCurrentOrderTotalElement.innerText)

        //desktop
        const desktopCurrentOrderTotalElement = btnParent.querySelector('.desktop-order-item-price')
        const desktopCurrentOrderTotal = Number(desktopCurrentOrderTotalElement.innerText)


        const mobileOrderTotal = mobileCurrentOrderTotal - unitPrice
        const desktopOrderTotal = desktopCurrentOrderTotal - unitPrice


        mobileCurrentOrderTotalElement.innerHTML = mobileOrderTotal
        desktopCurrentOrderTotalElement.innerHTML = desktopOrderTotal

    }


    // logica de agregar cantidad de producto
    addItemQuantityBtn.forEach(btn => {
        btn.addEventListener('click', () => {

            const btnParent = btn.closest('.order-item')

            // desktop
            let mobileOrderItemQuantity = btnParent.querySelector('.order-item-quantity')
            let mobileItemQuantityAccumulator = Number(btnParent.querySelector('.order-item-quantity').innerText)

            // desktop
            let desktopOrderItemQuantity = btnParent.querySelector('.desktop-order-item-quantity')
            let desktopItemQuantityAccumulator = Number(btnParent.querySelector('.desktop-order-item-quantity').innerText)

            mobileItemQuantityAccumulator += 1
            desktopItemQuantityAccumulator += 1

            mobileOrderItemQuantity.innerText = mobileItemQuantityAccumulator
            desktopOrderItemQuantity.innerText = desktopItemQuantityAccumulator

            orderItemTotalPriceAddQuantity()
            getOrderTotal(btn)

            if (mobileItemQuantityAccumulator > 1 || desktopItemQuantityAccumulator > 1) {
                btn.previousElementSibling.previousElementSibling.classList.add('substract-item-quantity-active')
            } else {
                btn.previousElementSibling.previousElementSibling.classList.remove('substract-item-quantity-active')
            }
        })
    })

    // logica de restar cantidad de productos
    substractItemQuantityBtn.forEach(btn => {

        btn.addEventListener('click', () => {

            const btnParent = btn.closest('.order-item')

            // mobile 
            let mobileOrderItemQuantity = btnParent.querySelector('.order-item-quantity')
            let mobileItemQuantityAccumulator = Number(btnParent.querySelector('.order-item-quantity').innerText)

            //desktop
            // desktop
            let desktopOrderItemQuantity = btnParent.querySelector('.desktop-order-item-quantity')
            let desktopItemQuantityAccumulator = Number(btnParent.querySelector('.desktop-order-item-quantity').innerText)

            if (mobileItemQuantityAccumulator > 1 || desktopItemQuantityAccumulator) {
                mobileItemQuantityAccumulator -= 1
                desktopItemQuantityAccumulator -= 1

                mobileOrderItemQuantity.innerText = mobileItemQuantityAccumulator
                desktopOrderItemQuantity.innerText = desktopItemQuantityAccumulator
            }
            if (mobileItemQuantityAccumulator <= 1 || desktopItemQuantityAccumulator <= 1) {
                btn.classList.remove('substract-item-quantity-active')
            }

            orderItemTotalSubstractQuantity(btn)
            getOrderTotal(btn)

        })
    })

    registerBtn?.addEventListener('click', () => {
        body.classList.add('noScroll');

        classesToActivate = [registrationFormContainer, blackScreen];
        activateClass(classesToActivate);
    });

    loginBtn?.addEventListener('click', () => {
        body.classList.add('noScroll');

        classesToActivate = [loginRegisterContainer, blackScreen];
        activateClass(classesToActivate);
    });

    // scrolleo boton de iniciar compra
    if (window.innerWidth >= 1024) {
        const container = document.querySelector('.first-step');
        const checkoutSecondStepContainer = document.querySelector('.checkout-first-step-second-column-container')
        checkoutSecondStepContainer.style.height = container.offsetHeight
        const contentContainer = document.querySelector('.checkout-first-step-second-column-content-container')

        window.addEventListener('scroll', () => {
            let scrollY = window.scrollY || window.pageYOffset;

            if (scrollY > contentContainer.offsetHeight) {
                let scrollOffset = scrollY - contentContainer.offsetHeight;
                contentContainer.style.top = scrollOffset;
            }
        })
    }

    // logica para inputs vacios
    const form = document.querySelector('.shipping-data')
    const inputs = document.querySelectorAll('.shipping-data input')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        inputs.forEach(inp => {

            const errorContainer = inp.nextElementSibling
            const errorElement = errorContainer.querySelector('.error-front')
            errorElement?.remove()
            if (!inp.value) {
                errorContainer.innerHTML = "<p class='error-front'> No puede estar vacío </p>"
                activeContainerHeight = document.querySelector('.checkout-step-container-active').getBoundingClientRect().height;
                container.style.maxHeight = activeContainerHeight
            }
        })
    })

    shipmentModeInputs.forEach((shipInput, indexInputs) => {
        shipInput.addEventListener('change', (e) => {
            let inputLabels = document.querySelectorAll('.ship-type-custom-label');
            if (e.target.checked && shipInput.classList.contains('pick-up')) {

                for (let indexLabels = 0; indexLabels < inputLabels.length; indexLabels++) {
                    if (indexLabels == indexInputs) {
                        inputLabels[indexLabels].classList.add('custom-label-active')
                    } else {
                        inputLabels[indexLabels].classList.remove('custom-label-active')
                    }
                }
                inputLabelContainers.forEach((input, indexContainers) => {
                    if (indexContainers >= 2) {
                        input.classList.add('input-label-container-hidden')
                    }
                })
            } else {
                inputLabelContainers.forEach(input => {
                    for (let indexLabels = 0; indexLabels < inputLabels.length; indexLabels++) {
                        if (indexLabels == indexInputs) {
                            inputLabels[indexLabels].classList.add('custom-label-active')
                        } else {
                            inputLabels[indexLabels].classList.remove('custom-label-active')
                        }
                    }
                    input.classList.remove('input-label-container-hidden')
                })
            }
            activeContainerHeight = document.querySelector('.checkout-step-container-active').getBoundingClientRect().height;
            container.style.maxHeight = activeContainerHeight + 50
        })
    })

    paymentTypeInputs.forEach((paymentInput, paymentIndex) => {
        paymentInput.addEventListener('change', (e) => {
            let inputLabels = document.querySelectorAll('.payment-type-custom-label');
            if (e.target.checked) {
                for (let indexLabels = 0; indexLabels < inputLabels.length; indexLabels++) {
                    if (indexLabels == paymentIndex) {
                        inputLabels[indexLabels].classList.add('custom-label-active')
                    } else {
                        inputLabels[indexLabels].classList.remove('custom-label-active')
                    }
                }
            }
        })
    })

    completeWithUserDataInput?.addEventListener('change', async (e) => {
        if (e.target.checked) {
            inputs.forEach(input => {
                let fieldName = input.name;
                if (activeUser[fieldName] != undefined) {
                    input.value = activeUser[fieldName];
                }

            });
        } else {
            inputs.forEach(input => {
                input.value = ''
            })
        }
    })

})