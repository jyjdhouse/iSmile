import { checkForNumericInputs } from './utils.js'
window.addEventListener('load', () => {
    checkForNumericInputs();
    // Logica para ir cambiando de input a medida que se escribe
    const inputs = Array.from(document.querySelectorAll('.verify-code-input'));
    const verifyButton = document.querySelector('.verify-button')
    // Itero por cada uno
    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        let lastInputValue = '';
        input.addEventListener('input', (e) => {
            verifyButton.classList.add('disabled');
            if (input.value.length <= 1) {
                lastInputValue = input.value;

                // Si no es el ultimo paso le focus
                if (input.value.length === 1) {
                    input.blur();
                    if (i < inputs.length - 1) {
                        inputs[i + 1].focus();
                    }
                }

            } else {
                //Si ya tenia, le dejo el mismo valor de antes
                input.value = lastInputValue
            };
            // Me fijo si todos estan con value, si es asi hablito el boton
            const inputsNotFilled = inputs.find(inp => inp.value.length == 0);
            // Si no hay ninguno, le saco el disabled
            if (!inputsNotFilled) verifyButton.classList.remove('disabled');
        });
    }
    // Capturo cuando le da a "Reenviar codigo"
    const resendCode = document.querySelector('.resend-code');
    resendCode.addEventListener('click', async (e) => {
        try {
            // Pinto el boton de disabled
            resendCode.classList.add('disabled');
            // Hago el fetch
            let response = await fetch(`${window.location.origin}/api/user/send-verification-code`);
            response = await response.json();
            // si no da ok
            if (!response.ok) {
                // Armo tarjeta de error
                const errorCard = document.createElement('p');
                errorCard.classList.add('error-card');
                errorCard.innerHTML = `Ha ocurrido un error al mandar el codigo, intente nuevamente`
                document.querySelector('.main').appendChild(errorCard);
                setTimeout(() => {
                    document.querySelector('.error-card').style.opacity = 0;
                    setTimeout(() => {
                        document.querySelector('.error-card').remove();
                    }, 2000);
                }, 3000);
                return
            };
            // Aca dio bien ==> Pinto el mensaje avisando que se envio
            // Armo tarjeta de success
            const successCard = document.createElement('p');
            successCard.classList.add('success-card');
            successCard.innerHTML = response.msg
            document.querySelector('.main').appendChild(successCard);
            // Saco la tarjeta
            setTimeout(() => {
                document.querySelector('.success-card').style.opacity = 0;
                setTimeout(() => {
                    document.querySelector('.success-card').remove();
                }, 2000);
            }, 3000);
            // Para habilitar devuelta el boton
            setTimeout(() => {
                resendCode.classList.remove('disabled');
            }, 1000 * 60);
            return
        } catch (error) {
            return console.log(`Falle en verifyButton.addEventListener: ${error}`)
        }
    });
    // Capturo cuando le da a "Verificar codigo"
    verifyButton.addEventListener('click', async (e) => {
        try {
            let code = '';
            inputs.forEach(inp => {
                if (inp.value.length == 0) e.preventDefault();
                code += inp.value;
            });
            let response = await fetch(`${window.location.origin}/api/user/check-verification-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ code }),
            });
            // Antes de hacer el fetch le hago el disabled
            verifyButton.classList.add('disabled');
            response = await response.json();
            verifyButton.classList.remove('disabled');
            if (!response.ok) {
                // Armo tarjeta de error
                const errorCard = document.createElement('p');
                errorCard.classList.add('error-card');
                errorCard.innerHTML = response.msg
                document.querySelector('.main').appendChild(errorCard);
                setTimeout(() => {
                    document.querySelector('.error-card').style.opacity = 0;
                    setTimeout(() => {
                        document.querySelector('.error-card').remove();
                    }, 2000);
                }, 3000);
                return
            };
            // Aca dio bien ==> Pinto el mensaje de ok
            // Armo tarjeta de success
            const successCard = document.createElement('p');
            successCard.classList.add('success-card');
            successCard.innerHTML = response.msg
            document.querySelector('.main').appendChild(successCard);
            setTimeout(() => {
                window.location.href = '/';
            }, 1500);
            return
        } catch (error) {
            return console.log(`Falle en verifyButton.addEventListener: ${error}`)
        }
    });

});