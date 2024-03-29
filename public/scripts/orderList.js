import { getDeepCopy, checkForNumericInputs, checkForFloatInputs } from "./utils.js";
window.addEventListener("load", async () => {
  let orders,
    status,
    provinces,
    totalPageNumber,
    ordersResponse,
    ordersToDisplay,
    orderTypes,
    paymentMethods,
    boxSizes,
    boxesUsed;
  let pageNumber = 1; //Primera pagina
  let limit = 10; //Aca controlo cuantas se muestran
  // Apenas carga hago el fetch de las ventas

  document.querySelector(
    ".order-disclaimer"
  ).innerHTML += ` (hasta el ${getTwoWeeksAgo()})`;

  // Primero pongo el spiner "Cargando ventas"
  handleSpinnerBehave(true);
  let response = getDeepCopy(
    await (await fetch(`${window.location.origin}/api/admin/order`)).json()
  );
  // Si de la API da ok
  if (response.ok) {
    ordersResponse = response.orders;
    status = response.statuses;
    provinces = response.provinces;
    paymentMethods = response.paymentMethods;
    orderTypes = response.orderTypes;
    boxSizes = response.boxSizes;
  }
  orders = ordersResponse;
  // Desactivo el spinner
  handleSpinnerBehave(false);
  ordersToDisplay = getDisplayedOrders();
  // Pinto la tabla con esas ordenes
  paintTable(ordersToDisplay);
  // Pinto las paginacion con todas las ordenes
  generatePaginateNumbers();
  // Escucho la paginacion
  listenPaginationButtons();
  // Logica para capturar el click en una transferencia
  listenRowsDisplayed();

  // Logica para escuchar los botones de filtro
  listenFilterTogglers();

  const orderDetailPopup = document.querySelector(".order-detail-popup");
  const blackScreen = document.querySelector(".black-screen");

  // Para cerrar
  blackScreen.addEventListener("click", () => {
    // cierro el popup
    orderDetailPopup.classList.remove("order-detail-popup-active");
    blackScreen.classList.remove("black-screen-active");
  });

  // FUNCIONES
  async function updateOrders(category, formParent, orderId) {
    formParent.innerHTML = `
            <div class="update-transaction-loading-spinner">
            <div class="loading-container">
    <div class="load-wrapp">
        <div class="load-3">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
</div>
</div>`;
    let loadingContainer = document.querySelector(
      ".update-transaction-loading-spinner"
    );

    let loadingAnimation = document.querySelector(
      ".update-transaction-loading-spinner .loading-container"
    );

    loadingContainer.classList.add("update-transaction-loading-spinner-active");

    loadingAnimation.classList.add("loading-container-active");
    let requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: category }),
    };
    let response = await fetch(
      `/api/admin/update-order/${orderId}`,
      requestOptions
    );
    if (response.ok) {
      window.location.href = "/admin/ventas";
    } else {
      console.log(response);
      /*    formParent.innerHTML = `
                    <p>Error al actualizar la orden, redirigiendo...</p>
                `
                let timeout = setTimeout(() => {
                    window.location.href = '/admin/ventas'
                }, 2000)
                return () => {
                    clearTimeout(timeout)
                } */
    }
  }

  function listenToUpdateStatus(select, form, btn, orderId) {
    select.addEventListener("change", () => {
      btn.classList.remove("save-btn-inactive");
    });
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let categoryValue = select.value;
      let formParent = form.closest(".order-detail-status-section");
      updateOrders(categoryValue, formParent, orderId);
    });
  }
  function listenToShipmentTagBtns() {
    const shipmentViewTagBtn = document.querySelector(
      ".order-detail-shipment-view-tag-btn"
    );
    const shipmentGenerateTagBtn = document.querySelector(
      ".order-detail-shipment-generate-tag-btn"
    );
    const shipmentCancelTagBtn = document.querySelector(
      ".order-detail-shipment-cancel-tag-btn"
    );
    shipmentViewTagBtn?.addEventListener("click", async (e) => {
      try {
        const tra_id = e.target.dataset.ordertraid;
        const shipmentOrderTag = await (
          await fetch(`/api/admin/getShipmentTag?tra_id=${tra_id}`)
        ).json();
        if (shipmentOrderTag.pdf) {
          //Fue bien
          const link = document.createElement("a");
          link.href = shipmentOrderTag.pdf; // Establece la URL del PDF
          link.target = "_blank"; // Abre en una nueva pestaña
          link.style.display = "none"; // Oculta el enlace en la página

          // Agrega el elemento <a> al DOM
          document.body.appendChild(link);

          // Simula un clic en el enlace
          link.click();

          // Limpia el elemento <a> después de la simulación de clic
          document.body.removeChild(link);
        }
        console.log(shipmentOrderTag);
      } catch (error) {
        return console.log(
          `Falle en shipmentTagBtn.addEventListener: ${error}`
        );
      }
    });
    shipmentGenerateTagBtn?.addEventListener("click", async (e) => {
      try {
        let tra_id = e.target.dataset.ordertraid;
        let formIsComplete = true;
        // Le limpio el border de error
        document.querySelector('.order-detail-shipment-generate-tag-btn').classList.remove('error-border');
        // Me fijo como empaqueto las cosas
        let boxTypeSelected = document.querySelector("#select-box-type").value;
        if(boxTypeSelected == 3){ //Envio personalizado
          const measureInputs = document.querySelectorAll('.mesure-details input')
          measureInputs.forEach(inp => {
            if(!inp.value || inp.value == 0)formIsComplete = false;
          });
          const quantityInputs = document.querySelectorAll('.quantity-details input')
          let flag = false; //Para ver que almenos 1 este completo
          quantityInputs.forEach(inp => {
            if(inp.value && inp.value != 0)flag = true;
          });
          // Si es false es porque no hay ninguno completo
          if(!flag) formIsComplete = false
          // Aca ta todo bien, armo el objeto para mandarle el paquete
          boxesUsed = {
            id: 3,
            sizes: [0,0,0],
            boxQuantities: {
              grande: 0,
              chica: 0,
            }
          };
          // Le pego con las medidas
          measureInputs.forEach((input,i) => {
            boxesUsed.sizes[i] = parseFloat(input.value)
          });
          // Le pego con las cantidades
          quantityInputs.forEach((inp,i) => {
            i==0 ? boxesUsed.boxQuantities.chica = parseInt(inp.value):
            boxesUsed.boxQuantities.grande = parseInt(inp.value);
          });
          let boxQuantity = boxesUsed.boxQuantities.grande + boxesUsed.boxQuantities.chica;
          boxesUsed.boxQuantityTotal = boxQuantity
        } else{ //Cualquiera de las otras 2 opciones
          // Busco la caja que uso
          let boxUsed = boxSizes.find(box=>box.id == parseInt(boxTypeSelected))
          boxesUsed = {
            id: boxUsed.id,
            sizes: [boxUsed.sizes.alto,boxUsed.sizes.ancho,boxUsed.sizes.largo],
            boxQuantities: {
              grande: boxUsed.id == 1 ? 0 : 1,
              chica:  boxUsed.id == 1 ? 1 : 0,
            },
            boxQuantityTotal: 1
          };
          
        }
        if(!formIsComplete){
          if(!document.querySelector('.order-detail-shipment-data-container .error-msg')){
            const errorMsg = document.createElement('p');
            errorMsg.classList.add('error-msg');
            errorMsg.innerHTML = "Debes completar las medidas y seleccionar al menos 1 caja "
            document.querySelector('.order-detail-shipment-data-container').appendChild(errorMsg);
          }
          document.querySelector('.order-detail-shipment-generate-tag-btn').classList.add('error-border');
          return
        };
        // Limpio el msg de error
        document.querySelector('.order-detail-shipment-data-container .error-msg')?.remove();
        const generateShipmentOrderTag = await (
          await fetch("/api/admin/generateShipmentTag", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Tipo de contenido del cuerpo de la solicitud
            },
            body: JSON.stringify({
              orderTraId: tra_id,
              boxesUsed,
            }),
          })
        ).json();
        if (generateShipmentOrderTag.ok) {
          //Fue bien
          const link = document.createElement("a");
          link.href = generateShipmentOrderTag.pdf; // Establece la URL del PDF
          link.target = "_blank"; // Abre en una nueva pestaña
          link.style.display = "none"; // Oculta el enlace en la página

          // Agrega el elemento <a> al DOM
          document.body.appendChild(link);

          // Simula un clic en el enlace
          link.click();

          // Limpia el elemento <a> después de la simulación de clic
          document.body.removeChild(link);

          // modifico la orden aca y pinto la tabla devuelta
          const orderToModify = orders.find(ord=>ord.tra_id == tra_id);
          orderToModify.oca_numero_envio = generateShipmentOrderTag.numero_envio;
          orderToModify.oca_orden_retiro = generateShipmentOrderTag.orden_retiro;
          paintShipmentStep(1,orderToModify);
        } else{ //Hubo algun error ==> Pinto el mensaje que me trajo el pedido 
          const errorCard = document.querySelector('.error-card');
          errorCard.classList.remove('hidden');
          errorCard.innerHTML = generateShipmentOrderTag.msg ? generateShipmentOrderTag.msg : 
          "Ocurrio un error, refresca la pagina e intente nuevamente";
          setTimeout(() => {
            errorCard.classList.add('hidden');
          }, 1000);
        }
      } catch (error) {
        console.log(
          `Falle en shipmentGenerateTagBtn?.addEventListener: ${error}`
        );
        const errorMsg = document.createElement('p');
            errorMsg.classList.add('error-msg');
            errorMsg.innerHTML = "Hubo un error al solicitar la generacion de etiqueta OCA "
            document.querySelector('.order-detail-shipment-data-container').appendChild(errorMsg);
            return
      }
    });
    shipmentCancelTagBtn?.addEventListener("click", async (e) => {
      try {
        const tra_id = e.target.dataset.ordertraid;
        const cancelShipmentOrderTag = await (
          await fetch(`/api/admin/cancelShipmentTag?tra_id=${tra_id}`)
        ).json();
        
        if (cancelShipmentOrderTag.ok) { //La anulacion fue exitosa, pinto devuelta para generar
          //Fue bien
          // modifico la orden aca y pinto la tabla devuelta
          const orderToModify = orders.find(ord=>ord.tra_id == tra_id);
          orderToModify.oca_numero_envio = null;
          orderToModify.oca_orden_retiro = null;
          paintShipmentStep(2,orderToModify);
          return
        }
        // Sino pinto el error que tiro
        document.querySelector('.cancel-shipment-tag-btn-container').innerHTML += 
        `<p class="error-msg">${cancelShipmentOrderTag.msg}</p>`
      } catch (error) {
        return console.log(
          `Falle en shipmentCancelTagBtn?.addEventListener: ${error}`
        );
      }
    });
  }
  function paintShipmentStep(step,order){
    const stepContainer = document.querySelector('.order-detail-shipment-data-container')
    if(step == 2){
      stepContainer.innerHTML = `
                  <p class="order-detail-shipment-label long-p bold">Bulto/s Utilizado/s</p>
                  <select id="select-box-type">
                      <option value="1">1 Caja Chica</option>
                      <option value="2">1 Caja Grande</option>
                      <option value="3">Personalizado (+ de 1 caja utilizada)</option>
                  </select>
                  <section class="custom-box-details hidden">
                    <p class="custom-box-details-title bold">Medidas Bulto (cm)</p>
                    <div class="mesure-details">
                      <label class="custom-box-label">Alto</label>
                      <input type="text" class="float-only-input">
                      <label class="custom-box-label">Ancho</label>
                      <input type="text" class="float-only-input">
                      <label class="custom-box-label">Largo</label>
                      <input type="text" class="float-only-input">
                    </div>
                    <p class="custom-box-details-title bold">Cajas Utilizadas</p>
                    <div class="quantity-details">
                      <label class="custom-box-label">Chicas</label>
                      <input type="text" class="numeric-only-input" value="0">
                      <label class="custom-box-label">Grandes</label>
                      <input type="text" class="numeric-only-input" value="0">
                    </div>
                  </section>
            
                  <p class="order-detail-shipment-tag-btn order-detail-shipment-generate-tag-btn" data-ordertraid="${order.tra_id}">Generar Etiqueta</p>
                  `
    } else{
      stepContainer.innerHTML = `
      <div class="cancel-shipment-tag-btn-container">
                  <p class="order-detail-shipment-tag-btn order-detail-shipment-cancel-tag-btn" data-ordertraid="${order.tra_id}">Anular Pedido de Retiro</p>
                  </div>
                  <div class="order-detail-shipment-data-logo-btn-container">
                    <div class="order-detail-shipment-data-logo-container">
                      <img src="/img/pdf_logo.png" alt="pdf-${order.tra_id}" class="order-detail-shipment-data-logo">
                    </div>
                    <p class="order-detail-shipment-tag-btn order-detail-shipment-view-tag-btn" data-ordertraid="${order.tra_id}">Ver Etiqueta</p>
                  </div>
                  <div class="order-detail-shipment-data-details-container">
                    <p class="order-detail-shipment-label bold">ID. Orden Retiro</p>
                    <p class="order-detail-shipment-label copy-value">${order.oca_orden_retiro}</p>
                    <p class="order-detail-shipment-label bold">ID. Numero Envio</p>
                    <p class="order-detail-shipment-label copy-value">${order.oca_numero_envio}</p>
                  </div>`
    };
    listenToShipmentTagBtns();
  }
  
  function listenBoxInteractions() {
    const selectBoxType = document.querySelector('#select-box-type');
    const customBoxDetails = document.querySelector('.custom-box-details')
    selectBoxType?.addEventListener('input',(e)=>{
      customBoxDetails.classList.add('hidden');
      const value = e.target.value;
      if(e.target.value == 3){
        customBoxDetails.classList.remove('hidden');
      } else{ //Reinicio los inputs
        customBoxDetails.querySelectorAll('input').forEach(inp=>inp.value = '0');
      };
    })
  }
  function generateOrderPopup(order) {
    let orderType = orderTypes.find(
      (type) => type.id == order.order_types_id
    ).type;
    let orderPaymentMethod = paymentMethods.find(
      (payMeth) => payMeth.id == order.payment_methods_id
    ).name;
    // Le agrego el id
    orderDetailPopup.innerHTML = `
        <i class="fa-regular fa-x close-order-detail-popup"></i>
        <p class="copy-msg">Valor copiado al portapapeles</p>
        <p class="order-detail-title bold">Venta - ${order.tra_id}</p>
        <p class="order-detail-date grey">${order.date}</p>
        <p class="order-detail">${orderType} - Metodo de pago: ${orderPaymentMethod}</p>
        `;
    // Pregunto si es orden para generar etiquetas
    if (order.order_types_id == 1 && order.order_status_id == 2) {
      //Envio a domicilio && Pendiente de envio
      orderDetailPopup.innerHTML += `
            <p class="order-detail-product-list-title bold order-label">Etiqueta OCA</p>
            <div class="order-detail-shipment-data-container"></div>
            `;
      if (order.oca_numero_envio) {
        paintShipmentStep(1,order)
      } else {
        paintShipmentStep(2,order);
      }
    }
    orderDetailPopup.innerHTML += `<section class="order-detail-product-list-section">
            <p class="order-detail-product-list-title bold order-label">Items</p>
            <div class="order-detail-product-list">
                <div class="order-detail-product-card order-detail-product-card-head">
                    <p class="order-detail-product-name">Nombre</p>
                    <p class="order-detail-product-quantity">Cantidad</p>
                    <p class="order-detail-product-total">Precio (Unit.)</p>
                    <p class="order-detail-product-total">Descuento</p>
                    <p class="order-detail-product-total">Precio (Ttal)</p>
                </div>
            </div>
        </section>
        <section class="order-detail-user-data-section">
            <p class="bold order-label">Direccion Entrega</p>
            <div class="order-detail-shipping-data-container"></div>
            <p class="order-label order-detail-user-data-title bold">Datos Facturación (usuario)</p>
            <div class="order-detail-user-data-container">
                <div class="order-detail-user-data order-detail-user-data-head">
                    <p>Nombre Completo</p>
                    <p>E-Mail</p>
                    <p>Teléfono</p>
                    <p>DNI</p>
                </div>
                <div class="order-detail-user-data">
                    <p class="copy-value">${order.billing_first_name} ${
      order.billing_last_name
    }</p>
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
                    <p class="copy-value">${
                      provinces.find(
                        (prov) => prov.id == order.billingAddress.provinces_id
                      ).name
                    }</p>
                    <p class="copy-value">${order.billingAddress.city}</p>
                    <p class="copy-value">${order.billingAddress.street} ${
      order.billingAddress.street_number
    }</p>
                    <p class="order-address-detail copy-value">${
                      order.billingAddress.apartment || "-"
                    }</p>
                    <p class="order-address-detail copy-value">${
                      order.billingAddress.zip_code
                    }</p>
                </div>
            </div>
            ${
              order.order_status_id === 5
                ? `<p class="order-label order-detail-user-data-title bold">Causa anulación</p>
                <div class="order-detail-user-data-container">
                    <div class="order-detail-user-data">
                        <p class="copy-value">${order.details}</p>
                    </div>
                </div>`
                : ""
            }
        </section>
        <section class="order-detail-status-section">
            <form class="update-order-status" action="">
            <select name="order_status" class="status-select">
            </select>
            <button type="submit" class="save-changes-btn save-btn-inactive">Modificar</button>
            </form>
            </section>
           
        
        `;
    // Aca voy pusheando los orderItems
    let orderDetailProductList = document.querySelector(
      ".order-detail-product-list"
    );
    order.orderItems.forEach((item) => {
      const itemPrice = item.price * (1 - (item.discount || 0) / 100);
      orderDetailProductList.innerHTML += `
            <div class="order-detail-product-card order-detail-product-card-body">
                <p class="order-detail-product-name">${item.name}</p>
                <p class="order-detail-product-quantity">${item.quantity}</p>
                <p class="order-detail-product-total">$${item.price}</p>
                <p class="order-detail-product-total">${item.discount ? `${item.discount}%` : 'No'}</p>
                <p class="order-detail-product-total">$${
                  item.quantity * itemPrice
                }</p>
            </div>
            `;
    });
    orderDetailProductList.innerHTML += `<p class="total-order-price">Total de compra: $${order.total}</p>`;
    // Ahora tengo que modificar la parte de direccion de entrega
    let orderDetailProductListSection = document.querySelector(
      ".order-detail-product-list-section"
    );
    // Pregunto si vino direccion de entrega distinta a facturacion
    if (order.order_types_id == 1) {
      //Entrega a domicilio
      if (!order.is_same_address) {
        //Distintas direcciones
        document.querySelector('.order-detail-shipping-data-container').innerHTML = `
            <div class="order-detail-shipping-data order-detail-shipping-data-head">
                <p>Provincia</p>
                <p>Ciudad</p>
                <p>Calle & Número</p>
                <p class="order-address-detail">Detalle</p>
                <p class="order-address-detail">Codigo Postal</p>
            </div>
            <div class="order-detail-shipping-data">
                <p class="copy-value">${
                  provinces.find(
                    (prov) => prov.id == order.shippingAddress.provinces_id
                  ).name
                }</p>
                <p class="copy-value">${order.shippingAddress.city}</p>
                <p class="copy-value">${order.shippingAddress.street} ${
          order.shippingAddress.street_number
        }</p>
                <p class="order-address-detail copy-value">${
                  order.shippingAddress.apartment || "-"
                }</p>
                <p class="order-address-detail copy-value">${
                  order.shippingAddress.zip_code
                }</p>
            </div>
        `;
      } else {
        //Misma direcciones
        document.querySelector('.order-detail-shipping-data-container').innerHTML += `<p class="order-deliver-method-p">Misma que direccion de facturación</p>`;
      }
    } else {
      //Retiro local o Venta Presencial
      document.querySelector('.order-detail-shipping-data-container').innerHTML += `<p class="order-deliver-method-p">No corresponde</p>`;
    }

    // Ahora modifico la parte del estado
    const selectOrderStatus = document.querySelector(".status-select");
    status.forEach((stat) => {
      selectOrderStatus.innerHTML += `<option ${
        stat.id == order.order_status_id && "selected"
      } value="${stat.id}">${stat.status}</option>`;
    });
    let form = document.querySelector(".update-order-status");
    let btn = document.querySelector(".save-changes-btn");
    listenToUpdateStatus(selectOrderStatus, form, btn, order.tra_id);
    listenToShipmentTagBtns();
    listenBoxInteractions();
    checkForNumericInputs();
    checkForFloatInputs();
  }

  // Esucha los botones dentro del popup
  function listenPopupBtns() {
    // Para cerrar el popup
    const closeOrderDetailBtn = document.querySelector(
      ".close-order-detail-popup"
    );
    closeOrderDetailBtn.addEventListener("click", () => {
      // cierro el popup
      orderDetailPopup.classList.remove("order-detail-popup-active");
      blackScreen.classList.remove("black-screen-active");
    });

    // Logica por si cambia le valor del select se activa el boton
    const selectStatus = document.querySelector(".status-select");
    const saveChangesBtn = document.querySelector(".save-changes-btn");
    selectStatus.addEventListener("change", () => {
      saveChangesBtn.classList.remove("hidden");
      const container = document.querySelector(".order-detail-popup");
      container.scrollTop = container.scrollHeight;
    });

    // Logica para copiar los valores
    const copyValues = document.querySelectorAll(".copy-value");
    const copyMsg = document.querySelector(".copy-msg");
    copyValues.forEach((value) => {
      let valueToCopy = value.innerHTML;
      value.addEventListener("click", () => {
        navigator.clipboard.writeText(valueToCopy);
        copyMsg.classList.add("copy-msg-active");
        setTimeout(() => {
          copyMsg.classList.remove("copy-msg-active");
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
    return ordersToDisplay;
  }

  function paintTable(ordersToDisplay) {
    let tableBody = ``;
    // Voy por cada orden y pinto la tabla
    ordersToDisplay.forEach((order) => {
      const orderStatus = status.find(
        (stat) => stat.id == order.order_status_id
      ).status;
      tableBody += `
            <tr class=${
              order.is_pending_payment_expired == 1 &&
              order.order_status_id == 3 &&
              "order-expired"
            }>
                <td class='order-id'>${
                  order.tra_id.split("-")[1] /*Solo la parte alfanumerica */
                }</td>
                <td class='order-date'>${order.date}</td>
                <td>${order.billing_first_name} ${order.billing_last_name}</td>
                <td class="order-total-column">$${order.total}</td>
                <td class="item-quantity-column">${order.orderItems.length}</td>
                <td>${orderStatus}</td>
                ${
                  order.order_types_id == 3
                    ? `<td class="remove-transaction-btn-container"><i class="bx bx-x-circle"></i></td>`
                    : ""
                }
                 <i class='}'></i> 
            </tr>
            `;
    });
    document.querySelector("tbody").innerHTML = tableBody;
  }
  // Muestro o saco el spinner de 'cargando'
  function handleSpinnerBehave(boolean) {
    const loadingSpinner = document.querySelector(".loading-spinner");
    const loadingAnimation = document.querySelector(".loading-container");
    if (boolean) {
      //Muestro
      loadingSpinner.classList.add("loading-spinner-active");
      loadingAnimation.classList.add("loading-container-active");
      return;
    }
    loadingSpinner.classList.remove("loading-spinner-active");
    loadingAnimation.classList.remove("loading-container-active");
    return;
  }

  //Escucha a las rows que se estan mostrando
  function listenRowsDisplayed() {
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((order) => {
      order.addEventListener("click", () => {
        let orderToShow = orders.find(
          (ord) =>
            ord.tra_id.split("-")[1] ==
            order.querySelector(".order-id").innerHTML
        );
        // Abro el popup
        generateOrderPopup(orderToShow);
        listenPopupBtns();
        orderDetailPopup.scrollTo(0, 0);
        orderDetailPopup.classList.add("order-detail-popup-active");
        blackScreen.classList.add("black-screen-active");
      });
    });
  }

  // Recibo orders como parametro porque si filtra por busqueda eso cambia la cantidad
  function generatePaginateNumbers() {
    const amount = orders.length;
    const paginationSection = document.querySelector(".pagination-section");
    paginationSection.innerHTML = `<i class='bx bx-chevron-left previous-page'></i>`;
    // Obtengo la cantidad de paginas que tengo
    totalPageNumber = Math.ceil(amount / limit);
    for (let index = 1; index <= totalPageNumber; index++) {
      paginationSection.innerHTML += `<div ${
        index == 1 && 'class="active"'
      }>${index}</div>`;
    }
    paginationSection.innerHTML += `<i class='bx bx-chevron-right next-page'></i>`;
  }

  // Escucho o los numeros o las flechas
  function listenPaginationButtons() {
    const paginationButtons = document.querySelectorAll(
      ".pagination-section *"
    );
    paginationButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Me fijo si es numero
        if (btn.innerHTML) {
          //Las flechas no tienen inner
          //Si cambia la pagina entonces saco el active de la anterior
          document
            .querySelector(".pagination-section .active")
            ?.classList.remove("active");
          // Le agrego el active para pintarlo
          btn.classList.add("active");
          // Cambio la pagina
          pageNumber = parseInt(btn.innerHTML);
        }
        // Aca se que es flecha
        else if (btn.classList.contains("next-page")) {
          //Flecha para adelante
          // Tengo que fijarme que no estemos en la ultima pagina
          if (pageNumber == totalPageNumber) return; //Si es asi no hago nada
          //Si cambia la pagina entonces saco el active de la anterior
          document
            .querySelector(".pagination-section .active")
            ?.classList.remove("active");
          pageNumber++;
          // Ahora tengo que pintar la pagina como active
          const divNumbers = document.querySelectorAll(
            ".pagination-section div"
          );
          divNumbers.forEach(
            (div) => div.innerHTML == pageNumber && div.classList.add("active")
          );
        } else if (btn.classList.contains("previous-page")) {
          // Tengo que fijarme que no estemos en la primer pagina
          if (pageNumber == 1) return; //Si es asi no hago nada
          //Si cambia la pagina entonces saco el active de la anterior
          document
            .querySelector(".pagination-section .active")
            ?.classList.remove("active");
          pageNumber--;
          // Ahora tengo que pintar la pagina como active
          const divNumbers = document.querySelectorAll(
            ".pagination-section div"
          );
          divNumbers.forEach(
            (div) => div.innerHTML == pageNumber && div.classList.add("active")
          );
        }
        // Obtengo con esa pagina esas ordenes & pinto tabla
        const newDisplayedOrders = getDisplayedOrders();
        paintTable(newDisplayedOrders);
        //Escucho las nuevas filas
        listenRowsDisplayed();
      });
    });
  }
  // Escucho los metodos de filtro
  function listenFilterMethods() {
    // Filtro de busqueda por id
    const inputFilter = document.querySelector(".filter-order-input");
    inputFilter.addEventListener("input", (e) => {
      let value = e.target.value;
      if (!value) {
        //Si el select tiene value entonces quiere decir que hay otro filtro
        if (selectStatusFilter.value != 0) {
          //Vuelvo a realziar el filtro con las ordenes totales (Hay 1 solo filtro)
          orders = ordersResponse.filter(
            (ord) => ord.order_status_id == selectStatusFilter.value
          );
        } else {
          //Aca ningun filtro esta aplicado ==> Vuelvo a mostrar todas
          orders = ordersResponse;
        }
      } else {
        let ordersInValue;
        // Tengo que preguntar si el otro filtro esta activo, porque si esta entonces busco a partir
        // de lo que encontro ese filtro
        if (selectStatusFilter.value != 0) {
          ordersInValue = orders.filter((ord) =>
            ord.tra_id.toLowerCase().includes(value.toLowerCase())
          );
        } else {
          //Aca busco solo del input
          ordersInValue = ordersResponse.filter((ord) =>
            ord.tra_id.toLowerCase().includes(value.toLowerCase())
          );
        }
        orders = ordersInValue;
      }
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
    const selectStatusFilter = document.querySelector("#filter-order-select");
    selectStatusFilter.addEventListener("input", (e) => {
      let value = e.target.value;
      if (value == 0) {
        if (inputFilter.value) {
          //Si el input tiene value entonces quiere decir que hay otro filtro
          //Vuelvo a realizar el filtro con las ordenes totales (Hay 1 solo filtro)
          orders = ordersResponse.filter((ord) =>
            ord.tra_id.toLowerCase().includes(inputFilter.value.toLowerCase())
          );
        } else {
          orders = ordersResponse;
        }
      } else {
        //Aca se aplica el filtro del select
        let ordersInValue;
        // Tengo que preguntar si el otro filtro esta activo, porque si esta entonces busco a partir
        // de lo que encontro ese filtro
        if (inputFilter.value) {
          ordersInValue = orders.filter((ord) => ord.order_status_id == value);
        } else {
          ordersInValue = ordersResponse.filter(
            (ord) => ord.order_status_id == value
          );
        }
        orders = ordersInValue;
      }
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
    const cleanFilters = document.querySelector(".clean-filters");
    cleanFilters.addEventListener("click", () => {
      // Reinicio los buscadores
      inputFilter.value = "";
      selectStatusFilter.value = 0;
      document
        .querySelectorAll('input[type="date"]')
        .forEach((inp) => (inp.value = ""));
      filterDatesButtonContainer.classList.add("hidden");
      // Vuelvo a pintar las ordenes del principio
      orders = response.orders;
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

    // Para los filtros de fecha
    const fromInputDate = document.querySelector(
      '.input-date[name="input_from"]'
    );
    const toInputDate = document.querySelector('.input-date[name="input_to"]');
    const filterDatesButtonContainer = document.querySelector(
      ".filter-button-container"
    );
    fromInputDate.addEventListener("change", (e) => {
      // Si el otro input tiene valor y este tambien pongo el boton de buscar
      if (toInputDate.value && e.target.value) {
        filterDatesButtonContainer.classList.remove("hidden");
        return;
      }
      // sino lo saco
      filterDatesButtonContainer.classList.add("hidden");
      return;
    });
    toInputDate.addEventListener("change", (e) => {
      // Si el otro input tiene valor y este tambien pongo el boton de buscar
      if (fromInputDate.value && e.target.value) {
        filterDatesButtonContainer.classList.remove("hidden");
        return;
      }
      // sino lo saco
      filterDatesButtonContainer.classList.add("hidden");
      return;
    });
    // Para limpiar los filtros de fecha
    const cleanDateFilters = document.querySelectorAll(
      ".filter-field .fa-arrows-rotate"
    );
    cleanDateFilters.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.closest(".filter-field").querySelector("input").value = "";
        filterDatesButtonContainer.classList.add("hidden");
      });
    });
    // Escucho boton de buscar por fechas
    const filterDatesButton = document.querySelector(".filter-date-button");
    filterDatesButton.addEventListener("click", async () => {
      // Agarro el valor de ambos input
      let fromValue = fromInputDate.value;
      let toValue = toInputDate.value;
      handleSpinnerBehave(true);
      let filteredOrders = (
        await (
          await fetch(`/api/admin/order?from=${fromValue}&to=${toValue}`)
        ).json()
      ).orders;
      handleSpinnerBehave(false);
      orders = filteredOrders;
      ordersResponse = orders;
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
  }
  listenFilterMethods();

  function getTwoWeeksAgo() {
    // Obtén la fecha actual
    const actualDate = new Date();

    // Resta 14 días a la fecha actual
    actualDate.setDate(actualDate.getDate() - 14);

    // Obtiene el día, mes y año
    const day = actualDate.getDate().toString().padStart(2, "0");
    const month = (actualDate.getMonth() + 1).toString().padStart(2, "0"); // Sumamos 1 porque los meses en JavaScript van de 0 a 11
    const year = actualDate.getFullYear();

    // Retorna la fecha en formato "dd-mm-yyyy"
    return `${day}-${month}-${year}`;
  }

  function listenRemoveOrderbtns() {
    let removeOrderBtns = document.querySelectorAll(
      ".remove-transaction-btn-container"
    );
    removeOrderBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // console.log('entro al primer')
        e.stopPropagation();
        e.preventDefault();
        const row = btn.closest("tbody tr");
        // Pinto el popup de la transaccion
        const orderToRemove = orders.find(
          (ord) =>
            ord.tra_id.split("-")[1] == row.querySelector(".order-id").innerHTML
        );
        paintRemoveTransactionPopup(orderToRemove);
      });
    });
  }
  listenRemoveOrderbtns();

  // funcion para el fetch
  async function deleteOrder(
    order,
    loadingContainer,
    loadingSpinner,
    loadingAnimation,
    popup,
    overlay
  ) {
    try {
      const deleteResponse = await fetch(
        `/api/admin/delete-order/${order.id}`,
        { method: "DELETE" }
      );
      if (deleteResponse.ok) {
        window.location.href = "/admin/ventas";
      } else {
        loadingContainer.classList.remove(
          "remove-transaction-loading-spinner-active"
        );
        loadingSpinner.classList.remove("loading-spinner-active");
        loadingAnimation.classList.remove("loading-container-active");
        overlay.classList.remove("remove-popup-overlay-active");
        popup.classList.remove("remove-transaction-popup-active");
      }
    } catch (error) {
      console.log(
        "Fallé en listenToRemoveBtns mientras hacia una solicitud: " + error
      );
    }
  }

  // veo cual toca en base a valores 0 y 1
  function listenToRemoveOrderBtns(btns, order, overlay, popup, trs, controls) {
    btns.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (btn.value == 1) {
          controls.classList.remove("controls-remove-transaction-active");
          const loadingContainer = document.querySelector(
            ".remove-transaction-loading-spinner "
          );
          const loadingSpinner = document.querySelector(
            ".remove-transaction-loading-spinner .loading-spinner"
          );
          const loadingAnimation = document.querySelector(
            ".remove-transaction-loading-spinner .loading-container"
          );

          loadingContainer.classList.add(
            "remove-transaction-loading-spinner-active"
          );
          loadingSpinner.classList.add("loading-spinner-active");
          loadingAnimation.classList.add("loading-container-active");

          deleteOrder(
            order,
            loadingContainer,
            loadingSpinner,
            loadingAnimation,
            popup,
            overlay
          );
        } else {
          trs.forEach((tr) => tr.classList.remove("trs-inactive"));
          overlay.classList.remove("remove-popup-overlay-active");
          popup.classList.remove("remove-transaction-popup-active");
        }
      });
    });
  }

  // variables para pintar popup cuando tocan remover orden
  const orderTable = document.querySelector("tbody");
  const removeOverlay = document.querySelector(".remove-popup-overlay");
  const removeTransactionPopup = document.querySelector(
    ".remove-transaction-popup"
  );
  const btns = document.querySelectorAll(".btn-container button");
  const controls = document.querySelector(".controls-remove-transaction");

  // funcion para agregarle clases
  function paintRemoveTransactionPopup(order) {
    let trs = document.querySelectorAll("tbody tr");
    trs.forEach((tr) => tr.classList.add("trs-inactive"));
    removeOverlay.classList.add("remove-popup-overlay-active");
    removeTransactionPopup.classList.add("remove-transaction-popup-active");
    controls.classList.add("controls-remove-transaction-active");
    listenToRemoveOrderBtns(
      btns,
      order,
      removeOverlay,
      removeTransactionPopup,
      trs,
      controls
    );
  }

  function listenFilterTogglers() {
    const filterTogglers = document.querySelectorAll(".filter-section-toggler");
    const filterDivs = document.querySelectorAll(".filter-div-section");
    filterTogglers.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterTogglers.forEach((btn) => btn.classList.remove("hidden"));
        btn.classList.add("hidden");
        filterDivs.forEach((div) =>
          div.classList.toggle("filter-div-section-active")
        );
      });
    });
  }
});
