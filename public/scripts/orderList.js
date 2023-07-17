import { getDeepCopy } from "./utils.js";

window.addEventListener('load', async () => {
    // Apenas carga hago el fetch de las ventas
    // Primero pongo el spiner "Cargando ventas"
    const loadingSpinner = document.querySelector('.loading-spinner');
    const loadingAnimation = document.querySelector('.loading-container');
    loadingSpinner.classList.add('loading-spinner-active');
    loadingAnimation.classList.add('loading-container-active');
    let response = getDeepCopy(await (await fetch(`${window.location.origin}/api/admin/order`)).json());
    let orders, status, provinces;
    
    if (response.ok) {
        orders = response.orders.sort((a,b)=>b.createdAt - a.createdAt);
        status = response.statuses;
        provinces = response.provinces
    }
    console.log(orders);
    loadingSpinner.classList.remove('loading-spinner-active');
    loadingAnimation.classList.remove('loading-container-active');
    let tableBody = ``;
    // Voy por cada orden y pinto la tabla
    orders.forEach(order => {
        tableBody +=
            `
        <tr>
            <td class='order-id'>${order.id}</td>
            <td>${order.billing_name}</td>
            <td>$${order.total}</td>
            <td>${order.orderItems.length}</td>
            <td>${order.orderStatus.status}</td>
        </tr>
        `
    });
    document.querySelector('tbody').innerHTML = tableBody
    // Una vez tengo las ventas pinto la tabla

    // Logica para capturar el click en una transferencia
    const rows = document.querySelectorAll('tbody tr');
    const orderDetailPopup = document.querySelector('.order-detail-popup');
    const blackScreen = document.querySelector('.black-screen');
    console.log(rows);
    rows.forEach(order => {

        order.addEventListener('click', () => {
            let orderToShow = orders.find(ord => ord.id == order.querySelector('.order-id').innerHTML);
            // Abro el popup
            generateOrderPopup(orderToShow);
            listenPopupBtns();
            orderDetailPopup.scrollTo(0,0)
            orderDetailPopup.classList.add('order-detail-popup-active');
            blackScreen.classList.add('black-screen-active');
        })
    });
    // Para cerrar
    blackScreen.addEventListener('click', () => {
        // cierro el popup
        orderDetailPopup.classList.remove('order-detail-popup-active');
        blackScreen.classList.remove('black-screen-active');
    });






    // FUNCIONES
    function generateOrderPopup(order) {
        // Le agrego el id
        orderDetailPopup.innerHTML =
            `
        <i class="fa-regular fa-x close-order-detail-popup"></i>
        <p class="copy-msg">Valor copiado al portapapeles</p>
        <p class="order-detail-title bold">Venta - ${order.id}</p>
        <p class="order-detail-date grey">Fecha de creación: ${order.createdAt}</p>
        <p class="order-detail">${order.orderType.type} - Metodo de pago: ${order.paymentMethod.name}</p>
        <section class="order-detail-product-list-section">
            <p class="order-detail-product-list-title bold order-label">Items</p>
            <div class="order-detail-product-list">
                <div class="order-detail-product-card order-detail-product-card-head">
                    <p class="order-detail-product-name">Nombre</p>
                    <p class="order-detail-product-quantity">Cantidad</p>
                    <p class="order-detail-product-total">Precio (Unit.)</p>
                    <p class="order-detail-product-total">Precio (Ttal)</p>
                </div>
            </div>
            <p class="bold order-label">Direccion Entrega</p>
        </section>
        <section class="order-detail-user-data-section">
            <p class="order-label order-detail-user-data-title bold">Datos Facturación (usuario)</p>
            <div class="order-detail-user-data-container">
                <div class="order-detail-user-data order-detail-user-data-head">
                    <p>Nombre Completo</p>
                    <p>E-Mail</p>
                    <p>Teléfono</p>
                    <p>DNI</p>
                </div>
                <div class="order-detail-user-data">
                    <p class="copy-value">${order.billing_name}</p>
                    <p class="copy-value">${order.billing_email}</p>
                    <p class="copy-value">${order.billing_phone}</p>
                    <p class="copy-value">${order.billing_id}</p>
                </div>
            </div>
            <p class="order-label order-detail-user-data-title bold">Datos Facturación (dirección)</p>
            <div class="order-detail-user-data-container">
                <div class="order-detail-user-data order-detail-user-data-head">
                    <p>Provincia</p>
                    <p>Ciudad</p>
                    <p>Calle & Número</p>
                    <p class="order-address-detail">Detalle</p>
                    <p class="order-address-detail">Codigo Postal</p>
                </div>
                <div class="order-detail-user-data">
                    <p class="copy-value">${provinces.find(prov=>prov.id == order.billingAddress.provinces_id).name}</p>
                    <p class="copy-value">${order.billingAddress.city}</p>
                    <p class="copy-value">${order.billingAddress.street}</p>
                    <p class="order-address-detail copy-value">${order.billingAddress.apartment || '-'}</p>
                    <p class="order-address-detail copy-value">${order.billingAddress.zip_code}</p>
                </div>
            </div>
        </section>
        <section class="order-detail-status-section">
            <select name="order_status" class="status-select">
            </select>
        </section>
        <button class="save-changes-btn hidden">Guardar cambios</button>
        `;
        // Aca voy pusheando los orderItems
        let orderDetailProductList = document.querySelector('.order-detail-product-list');
        order.orderItems.forEach(item => {
            orderDetailProductList.innerHTML +=
                `
            <div class="order-detail-product-card order-detail-product-card-body">
                <p class="order-detail-product-name">${item.name}</p>
                <p class="order-detail-product-quantity">${item.quantity}</p>
                <p class="order-detail-product-total">$${item.price}</p>
                <p class="order-detail-product-total">$${item.quantity * item.price}</p>
            </div>
            `;
        });
        orderDetailProductList.innerHTML += `<p class="total-order-price">Total de compra: $${order.total}</p>`
        // Ahora tengo que modificar la parte de direccion de entrega
        let orderDetailProductListSection = document.querySelector('.order-detail-product-list-section');
        // Pregunto si vino direccion de entrega distinta a facturacion
        if (order.order_types_id == 1) { //Entrega a domicilio
            if (!order.is_same_address) { //Distintas direcciones
                orderDetailProductListSection.innerHTML +=
                    `
        <div class="order-detail-shipping-data-container">
            <div class="order-detail-shipping-data order-detail-shipping-data-head">
                <p>Provincia</p>
                <p>Ciudad</p>
                <p>Calle & Número</p>
                <p class="order-address-detail">Detalle</p>
                <p class="order-address-detail">Codigo Postal</p>
            </div>
            <div class="order-detail-shipping-data">
                <p class="copy-value">${provinces.find(prov=>prov.id == order.shippingAddress.provinces_id).name}</p>
                <p class="copy-value">${order.shippingAddress.city}</p>
                <p class="copy-value">${order.shippingAddress.street}</p>
                <p class="order-address-detail copy-value">${order.shippingAddress.apartment || '-'}</p>
                <p class="order-address-detail copy-value">${order.shippingAddress.zip_code}</p>
            </div>
        </div>
        `
            } else { //Misma direcciones
                orderDetailProductListSection.innerHTML +=
                    `<p class="order-deliver-method-p">Misma que direccion de facturación</p>`
            }
        } else { //Retiro local o Venta Presencial
            orderDetailProductListSection.innerHTML +=
                `<p class="order-deliver-method-p">No corresponde</p>`
        };

        // Ahora modifico la parte del estado
        const selectOrderStatus = document.querySelector('.status-select');
        status.forEach(stat => {
            selectOrderStatus.innerHTML += `<option ${stat.id == order.order_status_id && 'selected'} value="${stat.id}">${stat.status}</option>`
        })
    }

    function listenPopupBtns() {
        // Para cerrar el popup
        const closeOrderDetailBtn = document.querySelector('.close-order-detail-popup');
        closeOrderDetailBtn.addEventListener('click', () => {
            // cierro el popup
            orderDetailPopup.classList.remove('order-detail-popup-active');
            blackScreen.classList.remove('black-screen-active');
        });

        // Logica por si cambia le valor del select se activa el boton
        const selectStatus = document.querySelector('.status-select');
        const saveChangesBtn = document.querySelector('.save-changes-btn');
        selectStatus.addEventListener('change', () => {
            saveChangesBtn.classList.remove('hidden');
            const container = document.querySelector('.order-detail-popup');
            container.scrollTop = container.scrollHeight;
        });

        // Logica para copiar los valores
        const copyValues = document.querySelectorAll('.copy-value');
        const copyMsg = document.querySelector('.copy-msg')
        copyValues.forEach(value => {
            let valueToCopy = value.innerHTML;
            value.addEventListener('click', () => {
                navigator.clipboard.writeText(valueToCopy);
                copyMsg.classList.add('copy-msg-active');
                setTimeout(() => {
                    copyMsg.classList.remove('copy-msg-active');
                }, 1000);
            });
        });
    }

})