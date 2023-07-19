import { getDeepCopy } from "./utils.js";
window.addEventListener('load', async () => {
    let orders, status, provinces, totalPageNumber, ordersResponse, ordersToDisplay,orderTypes,paymentMethods;
    let pageNumber = 1; //Primera pagina
    let limit = 5; //Aca controlo cuantas se muestran
    // Apenas carga hago el fetch de las ventas
    // Primero pongo el spiner "Cargando ventas"
    handleSpinnerBehave(true);
    let response = getDeepCopy(await (await fetch(`${window.location.origin}/api/admin/order`)).json());
    // Si de la API da ok
    if (response.ok) {
        ordersResponse = response.orders;
        status = response.statuses;
        provinces = response.provinces;
        paymentMethods = response.paymentMethods;
        orderTypes = response.orderTypes
    };
    orders = ordersResponse;
    // Desactivo el spinner
    handleSpinnerBehave(false);
    // Obtengo las ordenes para pintar (Apenas carga la pagina son 5(TODO:10))
    ordersToDisplay = getDisplayedOrders();
    // Pinto la tabla con esas ordenes
    paintTable(ordersToDisplay);
    // Pinto las paginacion con todas las ordenes
    generatePaginateNumbers();
    // Escucho la paginacion
    listenPaginationButtons();
    // Logica para capturar el click en una transferencia
    listenRowsDisplayed();

    const orderDetailPopup = document.querySelector('.order-detail-popup');
    const blackScreen = document.querySelector('.black-screen');

    // Para cerrar
    blackScreen.addEventListener('click', () => {
        // cierro el popup
        orderDetailPopup.classList.remove('order-detail-popup-active');
        blackScreen.classList.remove('black-screen-active');
    });


    // FUNCIONES
    function generateOrderPopup(order) {
        console.log(order);
        console.log(orderTypes);
        let orderType = orderTypes.find(type=>type.id==order.order_types_id).type;
        let orderPaymentMethod = paymentMethods.find(payMeth=>payMeth.id==order.payment_methods_id).name;
        // Le agrego el id
        orderDetailPopup.innerHTML =
            `
        <i class="fa-regular fa-x close-order-detail-popup"></i>
        <p class="copy-msg">Valor copiado al portapapeles</p>
        <p class="order-detail-title bold">Venta - ${order.tra_id}</p>
        <p class="order-detail-date grey">Fecha de creación: ${order.date}</p>
        <p class="order-detail">${orderType} - Metodo de pago: ${orderPaymentMethod}</p>
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
                    <p class="copy-value">${provinces.find(prov => prov.id == order.billingAddress.provinces_id).name}</p>
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
                <p class="copy-value">${provinces.find(prov => prov.id == order.shippingAddress.provinces_id).name}</p>
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

    // Esucha los botones dentro del popup
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

    //Muestra x cantidad de ordenes
    function getDisplayedOrders() {
        let from = (pageNumber - 1) * limit;
        let to = from + limit;
        // console.log(from,to);
        const ordersToDisplay = orders.slice(from, to);
        // console.log(ordersToDisplay);
        return ordersToDisplay
    }

    function paintTable(ordersToDisplay) {
        let tableBody = ``;
        // Voy por cada orden y pinto la tabla
        ordersToDisplay.forEach(order => {
            const orderStatus = status.find(stat=>stat.id == order.order_status_id).status;
            tableBody +=
                `
            <tr>
                <td class='order-id'>${order.tra_id}</td>
                <td>${order.billing_name}</td>
                <td>$${order.total}</td>
                <td>${order.orderItems.length}</td>
                <td>${orderStatus}</td>
            </tr>
            `
        });
        document.querySelector('tbody').innerHTML = tableBody
    }
    // Muestro o saco el spinner de 'cargando'
    function handleSpinnerBehave(boolean) {
        const loadingSpinner = document.querySelector('.loading-spinner');
        const loadingAnimation = document.querySelector('.loading-container');
        if (boolean) { //Muestro
            loadingSpinner.classList.add('loading-spinner-active');
            loadingAnimation.classList.add('loading-container-active');
            return
        }
        loadingSpinner.classList.remove('loading-spinner-active');
        loadingAnimation.classList.remove('loading-container-active');
        return
    }

    //Escucha a las rows que se estan mostrando
    function listenRowsDisplayed() {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(order => {

            order.addEventListener('click', () => {
                let orderToShow = orders.find(ord => ord.tra_id == order.querySelector('.order-id').innerHTML);
                // Abro el popup
                generateOrderPopup(orderToShow);
                listenPopupBtns();
                orderDetailPopup.scrollTo(0, 0)
                orderDetailPopup.classList.add('order-detail-popup-active');
                blackScreen.classList.add('black-screen-active');
            })
        });
    }

    // Recibo orders como parametro porque si filtra por busqueda eso cambia la cantidad
    function generatePaginateNumbers() {
        const amount = orders.length;
        const paginationSection = document.querySelector('.pagination-section');
        paginationSection.innerHTML = `<i class='bx bx-chevron-left previous-page'></i>`
        // Obtengo la cantidad de paginas que tengo
        totalPageNumber = Math.ceil(amount / limit);
        for (let index = 1; index <= totalPageNumber; index++) {
            paginationSection.innerHTML += `<div ${index == 1 && 'class="active"'}>${index}</div>`
        };
        paginationSection.innerHTML += `<i class='bx bx-chevron-right next-page'></i>`;
    };

    // Escucho o los numeros o las flechas
    function listenPaginationButtons() {
        const paginationButtons = document.querySelectorAll('.pagination-section *');
        paginationButtons.forEach(btn => {
            btn.addEventListener('click', () => {

                // Me fijo si es numero
                if (btn.innerHTML) { //Las flechas no tienen inner
                    //Si cambia la pagina entonces saco el active de la anterior
                    document.querySelector('.pagination-section .active')?.classList.remove('active');
                    // Le agrego el active para pintarlo
                    btn.classList.add('active');
                    // Cambio la pagina
                    pageNumber = parseInt(btn.innerHTML);
                }
                // Aca se que es flecha
                else if (btn.classList.contains('next-page')) { //Flecha para adelante
                    // Tengo que fijarme que no estemos en la ultima pagina
                    if (pageNumber == totalPageNumber) return;//Si es asi no hago nada
                    //Si cambia la pagina entonces saco el active de la anterior
                    document.querySelector('.pagination-section .active')?.classList.remove('active');
                    pageNumber++;
                    // Ahora tengo que pintar la pagina como active
                    const divNumbers = document.querySelectorAll('.pagination-section div');
                    divNumbers.forEach(div => div.innerHTML == pageNumber && div.classList.add('active'));
                } else if (btn.classList.contains('previous-page')) {
                    // Tengo que fijarme que no estemos en la primer pagina
                    if (pageNumber == 1) return;//Si es asi no hago nada
                    //Si cambia la pagina entonces saco el active de la anterior
                    document.querySelector('.pagination-section .active')?.classList.remove('active');
                    pageNumber--;
                    // Ahora tengo que pintar la pagina como active
                    const divNumbers = document.querySelectorAll('.pagination-section div');
                    divNumbers.forEach(div => div.innerHTML == pageNumber && div.classList.add('active'));
                };
                // Obtengo con esa pagina esas ordenes & pinto tabla
                const newDisplayedOrders = getDisplayedOrders();
                paintTable(newDisplayedOrders);
                //Escucho las nuevas filas
                listenRowsDisplayed()
            })
        })
    }
    // Escucho los metodos de filtro
    function listenFilterMethods() {
        // Filtro de busqueda por id
        const inputFilter = document.querySelector('.filter-order-input');
        inputFilter.addEventListener('input', (e) => {
            let value = e.target.value;
            if(!value){
                //Si el select tiene value entonces quiere decir que hay otro filtro
                if(selectStatusFilter.value != 0){
                    console.log(selectStatusFilter.value);
                    //Vuelvo a realziar el filtro con las ordenes totales (Hay 1 solo filtro)
                    orders = ordersResponse.filter(ord => ord.order_status_id==selectStatusFilter.value);
                } else { //Aca ningun filtro esta aplicado ==> Vuelvo a mostrar todas
                    orders = ordersResponse;
                }
            } else{
                let ordersInValue;
                // Tengo que preguntar si el otro filtro esta activo, porque si esta entonces busco a partir
                // de lo que encontro ese filtro
                if(selectStatusFilter.value != 0){
                    ordersInValue =  orders.filter(ord => ord.tra_id.toLowerCase().includes(value.toLowerCase()));
                }else{ //Aca busco solo del input
                    ordersInValue = ordersResponse.filter(ord => ord.tra_id.toLowerCase().includes(value.toLowerCase()));
                }
                orders = ordersInValue;
            }
            // Obtengo las ordenes para pintar (Apenas carga la pagina son 5(TODO:10))
            pageNumber = 1;
            ordersToDisplay = getDisplayedOrders();
            // Pinto la tabla con esas ordenes
            paintTable(ordersToDisplay);
            // Pinto las paginacion con todas las ordenes
            generatePaginateNumbers();
            // Escucho la paginacion
            listenPaginationButtons();
            // Logica para capturar el click en una transferencia
            listenRowsDisplayed();
        });
        // Filtro de estado de venta
        const selectStatusFilter = document.querySelector('#filter-order-select');
        selectStatusFilter.addEventListener('input',(e)=>{
            let value = e.target.value;
            if(value==0){
                if(inputFilter.value){//Si el input tiene value entonces quiere decir que hay otro filtro
                    //Vuelvo a realizar el filtro con las ordenes totales (Hay 1 solo filtro)
                    orders =  ordersResponse.filter(ord => ord.tra_id.toLowerCase().includes(inputFilter.value.toLowerCase()));
                } else{
                    orders = ordersResponse;
                }
            } else{ //Aca se aplica el filtro del select
                let ordersInValue;
                // Tengo que preguntar si el otro filtro esta activo, porque si esta entonces busco a partir
                // de lo que encontro ese filtro
                if(inputFilter.value){
                    ordersInValue = orders.filter(ord => ord.order_status_id==value);
                } else{
                    ordersInValue = ordersResponse.filter(ord => ord.order_status_id==value);
                }
                orders = ordersInValue;
            };
            // Obtengo las ordenes para pintar (Apenas carga la pagina son 5(TODO:10))
            pageNumber = 1;
            ordersToDisplay = getDisplayedOrders();
            // Pinto la tabla con esas ordenes
            paintTable(ordersToDisplay);
            // Pinto las paginacion con todas las ordenes
            generatePaginateNumbers();
            // Escucho la paginacion
            listenPaginationButtons();
            // Logica para capturar el click en una transferencia
            listenRowsDisplayed();
        });
        // Para limpiar los filtros
        const cleanFilters = document.querySelector('.clean-filters');
        cleanFilters.addEventListener('click',()=>{
            inputFilter.value = '';
            selectStatusFilter.value = 0;
            orders = ordersResponse;
            // Obtengo las ordenes para pintar (Apenas carga la pagina son 5(TODO:10))
            pageNumber = 1;
            ordersToDisplay = getDisplayedOrders();
            // Pinto la tabla con esas ordenes
            paintTable(ordersToDisplay);
            // Pinto las paginacion con todas las ordenes
            generatePaginateNumbers();
            // Escucho la paginacion
            listenPaginationButtons();
            // Logica para capturar el click en una transferencia
            listenRowsDisplayed();
        })
    };
    listenFilterMethods()
})