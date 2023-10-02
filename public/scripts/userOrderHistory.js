import { getPrettyDate, formatPriceNumber } from "./utils.js";
window.addEventListener('load', () => {
    const orderDetailPopup = document.querySelector('.order-detail-popup');
    const main = document.querySelector('.main');
    function listenPopupBtns() {
        // Logica para cuando tocan en los desplegables del popup
        const collapsableRows = document.querySelectorAll('.order-detail-collapsable-title');
        collapsableRows.forEach(rowTitle => {
            rowTitle.addEventListener('click',()=>{
                const container = rowTitle.closest('.order-detail-collapsable-row');
                container.classList.toggle('order-detail-collapsable-row-active');
                if (container.classList.contains('order-detail-collapsable-row-active')) {
                    container.querySelector('.collapsable-row-toggler').innerHTML = '-';
                } else {
                    container.querySelector('.collapsable-row-toggler').innerHTML = '+';
                }
            });
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
        const orderPaymentName = card.querySelector('.payment-method-label').innerHTML;
        const orderPaymentDesc = card.querySelector('.payment-method-desc').innerHTML;
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
                <div class="order-detail-item-wrapper order-detail-collapsable-row">
                    <p class="order-detail-collapsable-title order-detail-item-wrapper-title order-detail-label">Productos (${orderItems.length}) <span class="collapsable-row-toggler item-wrapper-toggler">+</span></p>
                </div>
                
        `;
        let orderItemsWrapper;
        orderItems.forEach(item => {
            // Elemento que hay de si tiene descuento
            const itemWithDiscount = item.querySelector('.order-card-item-discount-tag');

            orderItemsWrapper = `
                    <div class="order-detail-item">
                        <div class="order-detail-item-img-container">
                            <img src="${item.querySelector('img').src}" alt="order-detail-img" class="order-item-img">
                            ${itemWithDiscount ? `<div class="order-detail-item-discount-tag-container">
                                                    <p class="order-detail-item-discount-tag">${itemWithDiscount.innerHTML}</p>
                                                </div>` : ''
                            }
                        </div>
                        <div class="order-detail-item-info">
                            <p class="order-detail-item-name">${item.querySelector('.order-card-item-name').innerHTML}</p>
                            <p class="order-detail-item-quantity">${item.querySelector('.order-card-item-quantity').innerHTML}</p>
                            <div class="order-detail-item-row-container">
                                <p class="order-detail-item-subtotal grey ${ itemWithDiscount ? 'striked': '' }">
                                    ${item.querySelector('.order-card-item-subtotal').innerHTML}
                                </p>
                                <p class="order-detail-item-subtotal order-detail-item-discounted-subtotal grey">
                                    ${item.querySelector('.order-card-item-subtotal.order-card-item-discounted-subtotal')?.innerHTML || ''}
                                </p>  
                            </div>
                            <p class="order-detail-item-subtotal"></p>
                        </div>
                    </div>
                `;
            orderDetailPopup.querySelector('.order-detail-item-wrapper').innerHTML += orderItemsWrapper;
        });
        if (orderShippingInfo.street) {
            let shippingAddressChild = `
            <div class="order-detail-shipping-info order-detail-collapsable-row">
                <p class="order-detail-collapsable-title order-detail-shipping-title order-detail-label">Direccion de Envio <span class="collapsable-row-toggler shipping-info-toggler">+</span></p>
                <p class="order-detail-collapsable-detail order-detail-shipping-item">${orderShippingInfo.street} <span class="apartment-span"></span></p>
                <p class="order-detail-collapsable-detail order-detail-shipping-item">CP: ${orderShippingInfo.zip_code}</p>
                <p class="order-detail-collapsable-detail order-detail-shipping-item">${orderShippingInfo.city}, ${orderShippingInfo.province}</p>
            </div>`;
            orderDetailPopup.innerHTML += shippingAddressChild;
            // si tiene apartment le agrego el span
            if (orderShippingInfo.apartment) {
                orderDetailPopup.querySelector('.order-detail-shipping-item .apartment-span').innerHTML = `- ${orderShippingInfo.apartment}`
            }
        };
        // Agrego metodo de pago
        let paymentMethodChild = `
        <div class="order-detail-payment-method order-detail-collapsable-row">
            <p class="order-detail-collapsable-title order-detail-label">Método de pago <span class="collapsable-row-toggler shipping-info-toggler">+</span></p>
            <p class="order-detail-collapsable-detail order-detail-payment-item">${orderPaymentName}</p>
            <p class="order-detail-collapsable-detail order-detail-payment-item grey">${orderPaymentDesc}</p>
        </div>`;
        orderDetailPopup.innerHTML += paymentMethodChild;
        orderDetailPopup.innerHTML += `<p class="order-detail-total-price bold">TOTAL: <span>${orderTotal}</span></p>`
        formatPriceNumber();
    }

    const dates = document.querySelectorAll('.date-to-format');
    dates.forEach(date => {
        const prettyDate = getPrettyDate(date.innerText);
        date.innerHTML = prettyDate
    });
    formatPriceNumber();
});