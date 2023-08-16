import { getPrettyDate } from "./utils.js";
window.addEventListener('load', () => {
    const orderDetailPopup = document.querySelector('.order-detail-popup');
    const main = document.querySelector('.main');
    function listenPopupBtns() {
        // Logica para cuando tocan en los desplegables del popup
        const orderDetailItemsWrapperToggler = document.querySelector('.order-detail-item-wrapper-title');
        orderDetailItemsWrapperToggler?.addEventListener('click', () => {
            const container = orderDetailItemsWrapperToggler.closest('.order-detail-item-wrapper');
            container.classList.toggle('order-detail-item-wrapper-active');
            if (container.classList.contains('order-detail-item-wrapper-active')) {
                container.querySelector('.item-wrapper-toggler').innerHTML = '-';
            } else {
                container.querySelector('.item-wrapper-toggler').innerHTML = '+';
            }
        });
        const orderDetailShippingToggler = document.querySelector('.order-detail-shipping-title');
        orderDetailShippingToggler?.addEventListener('click', () => {
            const container = orderDetailShippingToggler.closest('.order-detail-shipping-info');
            container.classList.toggle('order-detail-shipping-info-active');
            if (container.classList.contains('order-detail-shipping-info-active')) {
                container.querySelector('.shipping-info-toggler').innerHTML = '-';
            } else {
                container.querySelector('.shipping-info-toggler').innerHTML = '+';
            }
        });

        // Para cerrar el popup
        const closePopupBtn = document.querySelector('.close-order-detail-popup');
        closePopupBtn?.addEventListener('click', () => {
            orderDetailPopup.classList.remove('order-detail-popup-active');
            main.classList.remove('main-active');
            document.querySelector('body').classList.remove('noScroll');
            lastOrderOpened = null;
        });
    }

    // Para abrir le popup
    const orderCards = document.querySelectorAll('.order-history-card');
    let lastOrderOpened;
    orderCards.forEach(card => {
        card.addEventListener('click', () => {
            if (card == lastOrderOpened) {//Si toco dos veces la misma cierro todo
                orderDetailPopup.classList.remove('order-detail-popup-active');
                main.classList.remove('main-active');
                document.querySelector('body').classList.remove('noScroll');
                lastOrderOpened = null;
            } else {
                lastOrderOpened = card;
                paintOrderDetailPopup(card);
                listenPopupBtns();
                orderDetailPopup.classList.add('order-detail-popup-active');
                main.classList.add('main-active');
                document.querySelector('body').classList.add('noScroll')
            }


        })
    });
    function paintOrderDetailPopup(card) {
        const orderDetailPopup = document.querySelector('.order-detail-popup');
        const orderItems = card.querySelectorAll('.order-card-item');
        const orderDate = card.querySelector('.order-card-date').innerHTML;
        const orderTraId = card.querySelector('.order-card-tra-id').innerHTML;
        const orderStatus = card.querySelector('.order-card-status').innerHTML;
        const orderType = card.querySelector('.order-card-type').innerHTML;
        const orderTotal = card.querySelector('.order-card-total-price').innerHTML;
        const orderShippingInfo = {};
        if (card.querySelector('.shipping-details')) {
            orderShippingInfo.street = card.querySelector('.shipping-street').innerHTML;
            orderShippingInfo.apartment = card.querySelector('.shipping-apartment')?.innerHTML
            orderShippingInfo.city = card.querySelector('.shipping-city').innerHTML
            orderShippingInfo.zip_code = card.querySelector('.shipping-zip-code').innerHTML
            orderShippingInfo.province = card.querySelector('.shipping-province').innerHTML
        }
        let html;
        orderDetailPopup.innerHTML =
            `
                <i class="fa-regular fa-x close-order-detail-popup"></i>
                <p class="order-detail-header bold">DETALLE DE COMPRA</p>
                <p class="order-detail-date date-to-format">${orderDate}</p>
                <p class="order-detail-id grey">${orderTraId}</p>
                <p class="order-detail-type">${orderType}</p>
                <p class="order-detail-status">${orderStatus}</p>
                <div class="order-detail-item-wrapper">
                    <p class="order-detail-item-wrapper-title order-detail-label">Productos (${orderItems.length}) <span class="item-wrapper-toggler">+</span></p>
                </div>
                
        `;
        let orderItemsWrapper;
        orderItems.forEach(item => {
            orderItemsWrapper = `
                    <div class="order-detail-item">
                        <div class="order-detail-item-img-container">
                            <img src="${item.querySelector('img').src}" alt="order-detail-img" class="order-item-img">
                        </div>
                        <div class="order-detail-item-info">
                            <p class="order-detail-item-name">${item.querySelector('.order-card-item-name').innerHTML}</p>
                            <p class="order-detail-item-quantity">${item.querySelector('.order-card-item-quantity').innerHTML}</p>
                            <p class="order-detail-item-subtotal">${item.querySelector('.order-card-item-subtotal').innerHTML}</p>
                        </div>
                    </div>
                `;
            orderDetailPopup.querySelector('.order-detail-item-wrapper').innerHTML += orderItemsWrapper;
        });
        console.log(orderShippingInfo);
        if (orderShippingInfo.street) {
            let shippingAddressChild = `
            <div class="order-detail-shipping-info">
                <p class="order-detail-shipping-title order-detail-label">Direccion de Envio <span class="shipping-info-toggler">+</span></p>
                <p class="order-detail-shipping-item">${orderShippingInfo.street} <span></span></p>
                <p class="order-detail-shipping-item">CP: ${orderShippingInfo.zip_code}</p>
                <p class="order-detail-shipping-item">${orderShippingInfo.city}, ${orderShippingInfo.province}</p>
            </div>`;
            orderDetailPopup.innerHTML += shippingAddressChild;
            // si tiene apartment le agrego el span
            if (orderShippingInfo.apartment) {
                orderDetailPopup.querySelector('order-detail-shipping-item span').innerHTML = `- ${orderShippingInfo.apartment}`
            }
        }
        orderDetailPopup.innerHTML += `<p class="order-detail-total-price bold">TOTAL: <span>${orderTotal}</span></p>`

    }

    const dates = document.querySelectorAll('.date-to-format');
    dates.forEach(date => {
        const prettyDate = getPrettyDate(date.innerText);
        date.innerHTML = prettyDate
    })
});