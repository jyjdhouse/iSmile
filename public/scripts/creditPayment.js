window.addEventListener("load", () => {
  const errorMsg = "Ocurrio un error al procesar el pago, intente nuevamente"; //Mensaje de error, ante cualquier error de la API Decidir hay que armar algo con eso
  const publicApiKey = "5Y7Bs8TmrnHWeAFgUksbuhxbcsfskS8l";
  const urlSandbox = "https://developers.decidir.com/api/v2";
  //Para el ambiente de desarrollo
  const decidir = new Decidir(urlSandbox);
  //Se indica la public API Key
  decidir.setPublishableKey(publicApiKey);
  decidir.setTimeout(5000); //timeout de 5 segundos

  // overlay de transaccion correcta/incorrecta
  const overlay = document.querySelector(".overlay");
  const loadingSpinner = document.querySelector(".overlay .loading-container");
  console.log(overlay,loadingSpinner);
  // tra_id de la order
  const order_tra_id = document.querySelector("#oder_tra_id").value;
  //formulario
  var form = document.querySelector(".formulario");
  //Asigna la funcion de invocacion al evento de submit del formulario
  form.addEventListener("submit", (e) => {
    sendForm(e);
  });
  //funcion para manejar la respuesta
  async function sdkResponseHandler(status, response) {
    if (status != 200 && status != 201) {
      //Manejo de error: Ver Respuesta de Error
      // Hago el pedido para que den como anulada la compra y sumen devuelta los items al stock
      let errorFetchBody = {
        order_tra_id,
      };
      // Hago el fetch
    let paymentErrorFetchResponse = await fetch(
      `${window.location.origin}/api/payment/handlePaymentRequestError`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(errorFetchBody),
      });
      // Si hay error pinto que hubo un problema y redirijo al checkout devuelta
      // Aca quiere decir que respondio mal, pinto rojo el overlay
      loadingSpinner.classList.remove("loading-container-active");
      overlay.classList.add("overlay-incorrect");
      setTimeout(() => {
        window.location.href = "/user/checkout";
      }, 4000);
      return
    } else {
      const responseBody = {
        token: response.id,
        bin: response.bin,
        order_tra_id,
        device_unique_identifier: decidir.device_unique_identifier,
      };
      // Hago el fetch
      let paymentFetchResponse = await fetch(
        `${window.location.origin}/api/payment/getPaymentRequest`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responseBody),
        }
      );
      paymentFetchResponse = await paymentFetchResponse.json();
      console.log(paymentFetchResponse);
      if (!paymentFetchResponse.ok) {
        //Manejar error del procesamiento de pago
        // Hago el pedido para que den como anulada la compra y sumen devuelta los items al stock
        let errorFetchBody = {
          order_tra_id,
        };
        // Hago el fetch
      let paymentErrorFetchResponse = await fetch(
        `${window.location.origin}/api/payment/handlePaymentRequestError`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(errorFetchBody),
        });
        //Muestro el check rojo y renderizo vista de checkout devuelta
        loadingSpinner.classList.remove("loading-container-active");
        overlay.classList.add("overlay-incorrect");

        setTimeout(() => {
          window.location.href = paymentFetchResponse.redirect;
        }, 4000);
        return;
      }
      // Muestro el check verde y renderizo vista de successfulOrder
      loadingSpinner.classList.remove("loading-container-active");
      overlay.classList.add("overlay-correct");

      setTimeout(() => {
        window.location.href = paymentFetchResponse.redirect;
      }, 4000);
      return;
    }
  }
  //funcion de invocacion con sdk
  function sendForm(event) {
    event.preventDefault();
    // Pinto el overlay cargando
    overlay.classList.remove("hidden");
    loadingSpinner.classList.add("loading-container-active");
    decidir.createToken(form, sdkResponseHandler); //formulario y callback
    return false;
  }
  //..codigo...
});
