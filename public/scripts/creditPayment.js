window.addEventListener("load", () => {
  const errorMsg = 'Ocurrio un error al procesar el pago, intente nuevamente'; //Mensaje de error, ante cualquier error de la API Decidir hay que armar algo con eso
  const publicApiKey = "5Y7Bs8TmrnHWeAFgUksbuhxbcsfskS8l";
  const urlSandbox = "https://developers.decidir.com/api/v2";
  //Para el ambiente de desarrollo
  const decidir = new Decidir(urlSandbox);
  //Se indica la public API Key
  decidir.setPublishableKey(publicApiKey);
  decidir.setTimeout(5000); //timeout de 5 segundos

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
      //...codigo...
      console.log("Esta mal: ", response);
    } else {
      const responseBody = {
        token: response.id,
        bin: response.bin,
        order_tra_id,
        device_unique_identifier: decidir.device_unique_identifier
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
      return
      if(!paymentFetchResponse.ok){
        //Manejar error del procesamiento de pago
      }
      // Renderizar vista de successfulOrder
      window.location.href = paymentFetchResponse.redirect
    }
  }
  //funcion de invocacion con sdk
  function sendForm(event) {
    event.preventDefault();
    decidir.createToken(form, sdkResponseHandler); //formulario y callback
    return false;
  }
  //..codigo...
});
