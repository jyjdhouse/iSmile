

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

  const handleMainHeight = () => {
    if (activeStep == 1 && window.innerWidth > 768) {
      stepsContainer.style.height = '1000px';
      main.style.height = '1000px';
    } else if(activeStep == 1 && window.innerWidth < 768){
      stepsContainer.style.height = '800px';
      main.style.height = '800px';
    } else {
      stepsContainer.style.height = '700px';
      main.style.height = '700px';
    }
  }


  handleMainHeight();

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

  goBackArrowContainer.addEventListener('click', () => {
    activeStep--;
    handlePrevStep();
  })

  const deleteOrAddClassToLabel = (method) => {
    if (method === 'del') {
      selectCardLabels.forEach(label => {
        label.classList.contains('error-label') && label.classList.remove('error-label');
      })
    } else {
      selectCardLabels.forEach(label => {
        label.classList.add('error-label');
      })
    }
  }

  selectCardLabels.forEach(label => {
    label.addEventListener('click', () => {
      deleteOrAddClassToLabel('del');
      let activeLabel = document.querySelector('.card-active-label');
      if (activeLabel) {
        activeLabel.classList.remove('card-active-label');
      }
      label.classList.add('card-active-label');
    })
  })

  const replaceSrcCardImg = (label) => {
    const img = label.querySelector('.card-img-container img');
    const cardLogo = document.querySelector('.card-logo-container img');
    cardLogo.src = img.src;
  }

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
      cardholderNameP.textContent = cardholderNameInp.value;
    });

    validThruMonthInp.addEventListener('input', () => {
      validThruMonthP.textContent = validThruMonthInp.value;
      let length = validThruMonthP.textContent.length

      if(length == 2){
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
  selectCardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cardRadioSelected = document.querySelector('input[name="card-selector"]:checked');
    const labelSelected = document.querySelector('.card-active-label');
    if (cardRadioSelected) {
      payment_methods_id = labelSelected.dataset.payment_methods_id
      card_id = labelSelected.dataset.card_id;
      activeStep++
      replaceSrcCardImg(labelSelected)
      handleCompleteCard();
      handleNextStep();
    } else {
      deleteOrAddClassToLabel('add');
    }

  })

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
    let isFormToSubmit = true;
    paymentFormInp.forEach(inp => {
      inp.classList.remove('error-label');
      if(!inp.value){
        inp.classList.add('error-label');
        isFormToSubmit = false;
      }
    })
    if(isFormToSubmit){
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
        card_id
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

  function sendForm(e) {
    e.preventDefault();
    // Pinto el overlay cargando
    overlay.classList.remove("hidden");
    loadingSpinner.classList.add("loading-container-active");
    decidir.createToken(form, sdkResponseHandler); //formulario y callback
    return false;
  }

});
