

window.addEventListener("load", () => {
  // para el primer paso de selección de tarjeta

  const selectCardForm = document.querySelector('.select-card-form');
  const selectCardInputs = document.querySelectorAll('.select-card-input');
  const selectCardLabels = document.querySelectorAll('.card-label');
  const steps = document.querySelectorAll('.step-container');
  const goBackArrowContainer = document.querySelector('.go-back-arrow-container');
  const main = document.querySelector('.secure-payment-main');
  const stepsContainer = document.querySelector('.steps-list-container');
  const errorCard = document.querySelector('.error-card');
  const paymentFormInp = document.querySelectorAll('.payment-form-input');
  const counterContainer = document.querySelector('.counter-container');
  const counterContainerTitle = document.querySelector('.counter-title');
  const counterContainerP = document.querySelector('.counter');
  let timeLeft = counterContainer.dataset.timeleft;
  let interval;

  
  function convertirAMinutosYSegundos(milliseconds) {
    let segundosTotales = Math.abs(Math.floor(milliseconds / 1000));
    let minutos = Math.floor(segundosTotales / 60);
    let segundos = segundosTotales % 60;
    console.log(minutos, segundos)
    return { minutos, segundos };
  }
  
  function actualizarContador() {
    let { minutos, segundos } = convertirAMinutosYSegundos(timeLeft);
    let minutosConverted = minutos.toString().padStart(2, '0'); // Rellenar con ceros a la izquierda si es necesario
    let segundosConverted = segundos.toString().padStart(2, '0');
  
    counterContainerP.textContent = `${minutosConverted}:${segundosConverted}`;

    if (timeLeft < 0) {
      timeLeft += 1000; // Restamos 1 segundo (1000 milisegundos)
    } else {
      clearInterval(interval);
      counterContainerP.textContent = "Tiempo agotado";
      counterContainerTitle.textContent = ""
    }
  }
  
  actualizarContador();
  interval = setInterval(actualizarContador, 1000);

  const changePaymentInpsValue = () => {
    paymentFormInp.forEach(inp => {
      inp.addEventListener('change', (e) => {
        inp.value = e.target.value;
      })
    })
  }
  changePaymentInpsValue();

  const numericInputs = document.querySelectorAll('.numeric-only-input');

  function isNumeric(value) {
    return /^[0-9]*$/.test(value);
  }

  numericInputs.forEach(input => {
    // Tomo el ultimo valor
    let lastInputValue = input.value;
    input.addEventListener("input", function (e) {
      var inputValue = e.target.value;
      if (!isNumeric(inputValue)) { // Si no es un número, borra el contenido del campo
        e.target.value = lastInputValue;
      } else {
        lastInputValue = inputValue; // Almacenar el último valor válido
      }
    });
  });

  let activeStep = 0;

  // manejo la altura para los pasos
  const handleMainHeight = () => {
    if (activeStep == 1 && window.innerWidth > 768) {
      stepsContainer.style.height = '1000px';
      main.style.height = '1000px';
    } else if (activeStep == 1 && window.innerWidth < 768) {
      stepsContainer.style.height = '800px';
      main.style.height = '800px';
    } else {
      stepsContainer.style.height = '700px';
      main.style.height = '700px';
    }
  }


  handleMainHeight();

  // cuando toca continuar para el siguiente paso
  const handleNextStep = () => {
    steps.forEach((step, i) => {
      if (i === activeStep) {
        step.classList.add('active-step');
        step.classList.remove('next-step', 'prev-step');
      } else {
        step.classList.add('prev-step');
        step.classList.remove('next-step', 'active-step');
      }
    })
    handleMainHeight();
  }

  // cuando toca volver para el anterior paso
  const handlePrevStep = () => {
    steps.forEach((step, i) => {
      if (i === activeStep) {
        step.classList.add('active-step');
        step.classList.remove('next-step', 'prev-step');
      } else {
        step.classList.add('next-step');
        step.classList.remove('prev-step', 'active-step');
      }
    })
    handleMainHeight();
  }

  // hago el evento click para que cuando se active llame a prev step
  goBackArrowContainer.addEventListener('click', () => {
    activeStep--;
    handlePrevStep();
  })

  // logica para manejar que se le agregue o saque las clases de error
  // a las tarjetas en caso de que no se seleccione una o se seleccione una
  const deleteOrAddErrorClassMultiple = (method, array) => {
    if (method === 'del') {
      array.forEach(label => {
        label.classList.contains('error-label') && label.classList.remove('error-label');
      })
    } else {
      array.forEach(label => {
        label.classList.add('error-label');
      })
    }
  }

  const deleteOrAddErrorClassSingle = (method, element) => {
    if (method === 'del') {
      element.classList.contains('error-label') && element.classList.remove('error-label');
    } else {
      element.classList.add('error-label');
    }
  }

  // logica para manejar cuando toca una tarjeta
  selectCardLabels.forEach(label => {
    label.addEventListener('click', () => {
      deleteOrAddErrorClassMultiple('del', selectCardLabels);
      let activeLabel = document.querySelector('.card-active-label');
      if (activeLabel) {
        activeLabel.classList.remove('card-active-label');
      }
      label.classList.add('card-active-label');
    })
  })

  // logica para que la imagen de la tarjeta sea la misma en la tarjeta modelo del siguiente paso
  const replaceSrcCardImg = (label) => {
    const img = label.querySelector('.card-img-container img');
    const cardLogo = document.querySelector('.card-logo-container img');
    cardLogo.src = img.src;
  }

  // para ir completando los campos de la tarjeta modelo a medida
  const handleCompleteCard = () => {
    const cardNumberInput = document.querySelector('.card-number-inp');
    const cardNumbP = document.querySelector('.card-number-p');

    const cardholderNameInp = document.querySelector('.cardholder-name-inp');
    const cardholderNameP = document.querySelector('.cardholder-name-p');

    const validThruMonthInp = document.querySelector('.month-valid-thru-inp');
    const validThruMonthP = document.querySelector('.month-valid-thru-p')
    const slash = document.querySelector('span.slash');

    const validThruYearInp = document.querySelector('.year-valid-thru-inp');
    const validThruYearP = document.querySelector('.year-valid-thru-p');

    cardNumberInput.addEventListener('input', () => {
      cardNumbP.textContent = cardNumberInput.value;
    });

    cardholderNameInp.addEventListener('input', () => {
      let input = cardholderNameInp.value.toUpperCase();
      cardholderNameP.textContent = input;
    });

    validThruMonthInp.addEventListener('input', () => {
      validThruMonthP.textContent = validThruMonthInp.value;
      let length = validThruMonthP.textContent.length

      if (length == 2) {
        slash.textContent = '/';
      } else {
        slash.textContent = '';
      }
    });

    validThruYearInp.addEventListener('input', () => {
      validThruYearP.textContent = validThruYearInp.value;
    });


  }

  let payment_methods_id;
  let card_id;
  let lastFourDigits;
  selectCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardRadioSelected = document.querySelector('input[name="card_id"]:checked');
    const labelSelected = document.querySelector('.card-active-label');
    if (cardRadioSelected) {
      payment_methods_id = labelSelected.dataset.payment_methods_id
      card_id = labelSelected.dataset.card_id;
      activeStep++
      replaceSrcCardImg(labelSelected)
      handleCompleteCard();
      handleNextStep();
    } else {
      deleteOrAddErrorClassMultiple('add', selectCardLabels);
    }

  })

  // chequeo los posibles errores
  const checkForPaymentErrors = () => {
    let isFormToSubmit = true;
    deleteOrAddErrorClassMultiple('del', paymentFormInp);
    paymentFormInp.forEach(inp => {
      if (!inp.value) {
        deleteOrAddErrorClassSingle('add', inp);
        isFormToSubmit = false;
      }
      if (inp.classList.contains('month-valid-thru-inp')) {
        if (inp.value < 1 || inp.value > 12) {
          deleteOrAddErrorClassSingle('add', inp);
          isFormToSubmit = false;
        }
      }
      if (inp.classList.contains('year-valid-thru-inp')) {
        let date = new Date();
        let year = String(date.getFullYear());
        let lastTwoCurrentYear = year.substring(year.length - 2);
        let lastTwoInputYear = inp.value.substring(inp.value.length - 2);

        if (Number(lastTwoInputYear) < Number(lastTwoCurrentYear)) {
          deleteOrAddErrorClassSingle('add', inp);
          isFormToSubmit = false;
        }
      }
      if (inp.classList.contains('cardholder-name-inp')) {
        let nameSplitted = inp.value.split(' ');
        if (nameSplitted.length < 2) {
          deleteOrAddErrorClassSingle('add', inp);
          isFormToSubmit = false;
        }
      }
    })
    return isFormToSubmit;
  }


  const errorMsg = 'Ocurrio un error al procesar el pago, intente nuevamente'; //Mensaje de error, ante cualquier error de la API Decidir hay que armar algo con eso
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
    e.preventDefault();
    let isFormToSubmit = checkForPaymentErrors();
    if (isFormToSubmit) {
      let cardInp = document.querySelector('.card-number-inp');
      lastFourDigits = cardInp.value.slice(-4);
      sendForm(e);
    }
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
        payment_methods_id,
        card_id,
        lastFourDigits
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

  function sendForm(e) {
    e.preventDefault();
    // Pinto el overlay cargando
    overlay.classList.remove("hidden");
    loadingSpinner.classList.add("loading-container-active");
    decidir.createToken(form, sdkResponseHandler); //formulario y callback
    return false;
  }

});
