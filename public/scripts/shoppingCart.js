import { changeCartProductDimension, listenSizesBtns } from "./utils.js";
window.addEventListener('load', () => {

    // LOGICA PARA BORRAR PRODUCTO DE CARRO
    const removeProductBtns = document.querySelectorAll('.remove-cart-product-btn');
    const cartProductCards = Array.from(document.querySelectorAll('.cart-product-card'));

    removeProductBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.productid;
            const containerIndex = cartProductCards.findIndex(card => card.dataset.productid == id);
            cartProductCards[containerIndex].remove();
            changeCartProductDimension();

        });
    });

    // LOGICA PARA AGARRAR TOTALES DE CANTIDAD Y SUMARLOS AL TOTAL DE LA COMPRA
    const orders = document.querySelectorAll('.cart-product-card')
    let orderTotal = document.querySelector('.order-total')


    let adder = 0
    const getFirstOrderTotal = () => {
        orders.forEach(order => {
            let itemValue = Number(order.querySelector('.item-total').innerText)
            let itemQuantity = Number(order.querySelector('.current-quantity').innerText)
            let itemTotal = itemValue * itemQuantity
            adder += itemTotal
        })
        orderTotal.innerText = adder
    }
    getFirstOrderTotal()

    const getDynamicOrderTotal = (btn) => {
        let btnParent = btn.closest('.cart-product-card')
        let itemValue = Number(btnParent.querySelector('.item-total').innerText)
        if(btn.classList.contains('add-one-same-product')){
            adder += itemValue
        } else {
            adder -= itemValue
        }
        orderTotal.innerText = adder
    }


    // LOGICA PARA AGREGAR CANTIDAD DEL MISMO PRODUCTO
    const addItemQuantityBtn = document.querySelectorAll('.add-one-same-product')
    const substractItemQuantityBtn = document.querySelectorAll('.substract-item-quantity')

    addItemQuantityBtn.forEach(btn => {
        btn.addEventListener('click', () => {

            let btnParent = btn.closest('.cart-product-card')

            // desktop
            let currentQuantity = btnParent.querySelector('.current-quantity')
            let desktopItemQuantityAccumulator = Number(btnParent.querySelector('.current-quantity').innerText)

            desktopItemQuantityAccumulator += 1

            currentQuantity.innerText = desktopItemQuantityAccumulator

            getDynamicOrderTotal(btn)

            if (desktopItemQuantityAccumulator > 1) {
                btn.previousElementSibling.previousElementSibling.classList.add('substract-item-quantity-active')
            } else {
                btn.previousElementSibling.previousElementSibling.classList.remove('substract-item-quantity-active')
            }
        })
    })

    // logica de restar cantidad de productos
    substractItemQuantityBtn.forEach(btn => {

        btn.addEventListener('click', () => {

            const btnParent = btn.closest('.cart-product-card')

            // mobile 
            let itemQuantity = btnParent.querySelector('.current-quantity')
            let itemQuantityAccumulator = Number(btnParent.querySelector('.current-quantity').innerText)

            if (itemQuantityAccumulator) {
                itemQuantityAccumulator -= 1

                itemQuantity.innerText = itemQuantityAccumulator
            }
            if (itemQuantityAccumulator <= 1) {
                btn.classList.remove('substract-item-quantity-active')
            }

            getDynamicOrderTotal(btn)

        })
    })

})