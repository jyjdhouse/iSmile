import { dateFormater, getTodaysDate } from "./utils.js";

window.addEventListener('load', () => {
    // LOGICA PARA CAPTURAR FIRMA
    const dataURLtoFile = (dataURL, filename) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
    const canvas = document.getElementById('signatureCanvas');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const clearButton = document.getElementById('clearButton');
    const checkButton = document.getElementById('confirm-signature');
    checkButton.classList.add('hidden');
    const signaturePad = new SignaturePad(canvas, {
        penColor: '#bba059'//TODO: #bba059
    });

    canvas.addEventListener('touchstart', () => {
        checkButton.classList.remove('hidden');
        // canvas.width = canvas.offsetWidth;
        // canvas.height = canvas.offsetHeight;
    })

    let signatureImage;
    let formData = new FormData();
    // Establecer el grosor mínimo del trazo
    signaturePad.maxWidth = 1.9; // Valor en píxeles
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
    // Si confirma la firma
    checkButton.addEventListener('click', async (e) => {
        e.preventDefault();
        checkButton.classList.add('hidden');
        signatureImage = signaturePad.toDataURL(); // save image as PNG
        signatureImage = dataURLtoFile(signatureImage, 'firma.png');
        formData.append('signature', signatureImage);
        console.log(signatureImage);
    });
    // Por si quieren limpiar firma
    clearButton.addEventListener('click', (e) => {
        e.preventDefault()
        signaturePad.clear();
    });


    // Logica para dejar la fecha de abajo en la fecha del dia
    const inputDate = document.querySelector('#date');
    // Formar la fecha en formato YYYY-MM-DD
    const formattedDate = getTodaysDate();
    // Establecer el valor predeterminado en el input date
    inputDate.value = formattedDate;

    // Evito que para el DNI se pongan letras
    var idInput = document.getElementById("dni");
    var regex = /^[0-9]*$/;
    let lastIDValue = '';
    idInput.addEventListener("input", function (e) {
        var inputValue = e.target.value;
        if (!regex.test(inputValue)) { // Si no es un número, borra el contenido del campo
            e.target.value = lastIDValue;
        } else {
            lastIDValue = inputValue; // Almacenar el último valor válido
        }
    });

    // Chequeo si completo los textArea y la firma
    const checkForAllFieldsComplete = () => {
        let flag = true;
        // Tema inputs 
        let inputs = document.querySelectorAll('.input');
        // Voy por cada uno y targeteo al error-msg
        inputs.forEach(input => {
            let inputClass = input.dataset.errorclass;
            let errorMsg = document.querySelector(`.${inputClass}`);
            let value = input.value;
            console.log(value);
            if (!value) {
                flag = false;
                errorMsg.classList.remove('hidden');
            }
            // Me fijo si esta tocando para poner nombre
            errorMsg.addEventListener('touchstart', () => {
                errorMsg.classList.add('hidden');
            });
        });

        // Tema textarea
        let textareas = document.querySelectorAll('textarea');
        textareas.forEach(input => {
            // Si no tiene valor pinto el texto de rojo
            if (!input.value) {
                flag = false;
                input.closest('span').classList.add('red');
            };
            input.addEventListener('input', () => {
                input.closest('span').classList.remove('red');
            });

        });
        // Tema Firma
        let signatureLabel = document.getElementById('signature-label');
        if (signaturePad.isEmpty()) {
            signatureLabel.classList.add('red');
            flag = false;
        }
        // Si confirma firma se saca el rojo
        checkButton.addEventListener('click', () => signatureLabel.classList.remove('red'));

        if (!flag) {
            let buttonContainer = document.querySelector('.button-container');
            let button = buttonContainer.querySelector('.send-form-button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (buttonContainer.childElementCount == 1) buttonContainer.innerHTML += `<p class="form-error-msg">Debes completar los campos requeridos</p>`;
        }
        return flag
    }
    const form = document.querySelector('.form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Chequeo si hay algun campo sin completar
        let allFieldsComplete = checkForAllFieldsComplete();
        console.log(allFieldsComplete);
        if (!allFieldsComplete) return
        
        
        // Logica para clonar repo
        let bodyClone = document.body.cloneNode(true);
        // Remuevo lo innecesario
        bodyClone.removeChild(bodyClone.querySelector('.spinner-overlay'));
        // Agarro los buttons
        let elementsToRemove = bodyClone.querySelectorAll('.button-container, .button-to-remove, .error-msg');
        elementsToRemove.forEach(btn=>btn.remove());
        // Agarro todo lo que quiero cambiar
        let inputsToChange = bodyClone.querySelectorAll('input,textarea');
        inputsToChange.forEach(input => {
            let type = input.type;
            let value = input.value;
            // Creo la etiqueta p  <p class="patient-option bold"></p> con el valor del input
            const paragraph = document.createElement('span');
            paragraph.classList.add('patient-option', 'bold');
            // Si es el textArea le hago en otro renglon
            type == 'textarea' ? paragraph.classList.add('block'):null;
            paragraph.textContent = type == 'date' ? dateFormater(value) : value;
            input.parentNode.replaceChild(paragraph, input);
        });

        // return document.body.parentNode.replaceChild(bodyClone, document.body);
        // return console.log(bodyClone.innerHTML);W
        formData.append('contentHTML', bodyClone.innerHTML); //Mando el html

        // Muestro el cargando pdf...
        document.querySelector('.spinner-overlay').classList.remove('hidden');

        let response = await fetch('/generateConsentPDF', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            document.querySelector('.spinner-overlay').classList.add('hidden');
            // Convierte la respuesta en un Blob (archivo)
            const archivoBlob = await response.blob();
            // Crea un enlace de descarga
            const linkToDownload = document.createElement('a');
            linkToDownload.href = URL.createObjectURL(archivoBlob);
            linkToDownload.download = 'Consentimiento.pdf';

            // Simula un clic en el enlace para iniciar la descarga
            linkToDownload.click();

            // Limpia los recursos del enlace
            URL.revokeObjectURL(linkToDownload.href);
            console.log(response);
        };
    });
});