import { dateFormater, getTodaysDate } from "./utils.js";
window.addEventListener('load', () => {
    const form = document.querySelector('.form');
    const inputs = Array.from(document.querySelectorAll('input'));
    const checkForInputsChange = () => { //Voy fijandome si cambian y le cambio el label
        let inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            // Primero me fijo en los text,date                      
            if ((input.type != 'radio' && input.type != 'checkbox')) {
                const fieldContainer = input.closest('.further-info') || input.closest('.field')
                //Agarro todas las label para pintar
                const labelToPaint = fieldContainer.querySelectorAll('label');
                input.addEventListener('input', (e) => {
                    e.target.value && input.closest('div').querySelector('label').classList.remove('red'); //Le saco el Rojo
                });
            };
        });
    }
    const checkForAllFieldsComplete = () => {
        // Agarro todos los campos que tienen que completar
        let inputsToFill = document.querySelectorAll('input');
        let buttonContainer = document.querySelector('.button-container');
        let flag = true;
        inputsToFill.forEach(input => {
            // Primero me fijo en los text,date                      
            if ((input.type != 'radio' && input.type != 'checkbox')) {
                // const fieldContainer = input.closest('.further-info') || input.closest('.field');
                const fieldContainer = input.closest('div');
                //Agarro todas las label para pintar
                const labelsToPaint = fieldContainer.querySelectorAll('label');

                //Lo niego porque en ese caso si tendria que tener valor
                if (!input.value && !input.closest('.hidden')) {
                    labelsToPaint.forEach(label => label.classList.add('red')); //Pinto de Rojo
                    checkForInputsChange();
                    flag = false;
                }
            }
        });
        //El enfoque para los radio 
        let radioContainerFields = Array.from(document.querySelectorAll('.input-radio-container'));
        // Pregunta de embarazo ponele si esta oculto lo saco
        radioContainerFields = radioContainerFields.filter(cont=>!cont.closest('.hidden'));
        radioContainerFields.forEach(cont => {
            // Pregunto por si alguno de los dos input que tiene radio esta chequeado
            let inputsRadio = Array.from(cont.querySelectorAll('input'));
            // Aca da un valor si se completo
            let completedRadioField = inputsRadio.find(radio => radio.checked);
            // console.log(completedRadioField);
            if (!completedRadioField) {//Si no se completo
                flag = false;
                console.log(`Estoy en radios`);
                cont.closest('.field').querySelector('label').classList.add('red');
            }
        });
        // Logica para cambiar el red en cuanto se selecciona alguna opcion
        let inputsRadio = document.querySelectorAll('input[type="radio"]');
        inputsRadio.forEach(radio => {
            // voy por cada uno
            radio.addEventListener('input', () => { //Quiere decir que lo tildo. Voy al label y le saco el red
                radio.closest('.field').querySelector('label').classList.remove('red');
            });
        });

        // Enfoque para los Checkbox
        let checkboxContainer = document.querySelector(".checkbox-container");
        let checkboxInputs = Array.from(checkboxContainer.querySelectorAll('input'));
        let checkboxLabel = checkboxContainer.closest('.further-info').querySelector('p');
        if (!checkboxContainer.closest('.further-info').classList.contains('hidden')) { //Si NO esta oculto
            // Capturo todos los checkbox, hago un find y si ninguno aparece es que no se completo
            let completedCheckboxInputs = checkboxInputs.find(check => check.checked);
            if (!completedCheckboxInputs) {
                console.log(`Estoy en checkbox`);
                flag = false;
                checkboxLabel.classList.add('red')
            }
        };
        // Ahora me fijo si cambio para sacarle la etiqueta red
        checkboxInputs.forEach(check => {
            // voy por cada uno
            check.addEventListener('input', () => { //Quiere decir que lo tildo. Voy al label y le saco el red
                checkboxLabel.classList.remove('red');
            });
        });

        // Tema Firma
        let signatureLabel = document.getElementById('signature-label');
        if (signaturePad.isEmpty()) {
            console.log(`Estoy en firma`);
            signatureLabel.classList.add('red');
            flag = false;
        }
        // Si confirma firma se saca el rojo
        checkButton.addEventListener('click', () => signatureLabel.classList.remove('red'));


        if (!flag) {
            let button = buttonContainer.querySelector('.send-form-button')
            button.classList.remove('send-form-button-error');
            void button.offsetWidth; // Fuerza un reflow, lo cual reinicia la animación
            button.classList.add('send-form-button-error');
            if (buttonContainer.childElementCount == 1) buttonContainer.innerHTML += `<p class="error-msg">Debes completar los campos requeridos</p>`;
        }
        return flag
    }


    // Evito que si toca enter se mande el form
    inputs.forEach((input, i) => {
        input.addEventListener('keydown', (e) => {
            if (e.keyCode === 13 || e.key === 'Enter') e.preventDefault();
        });
    });

    // Evito que para el numero se pongan letras
    var phoneInput = document.getElementById("phone");
    var regex = /^[0-9]*$/;
    let lastPhoneValue = '';
    phoneInput.addEventListener("input", function (e) {
        var inputValue = e.target.value;
        if (!regex.test(inputValue)) { // Si no es un número, borra el contenido del campo
            e.target.value = lastPhoneValue;
        } else {
            lastPhoneValue = inputValue; // Almacenar el último valor válido
        }
    });

    // Capturo todos los container que aparecen si tocan en si
    const listenRemoveFieldContainersBtns = () => { //Se fija si tocan el tachito para borrar el tratamiento previo
        const removeBtns = document.querySelectorAll('.remove-field-container-btn');
        removeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const fieldContainer = btn.closest('.further-info');
                const treatmentToremove = btn.closest('.further-info-field-container');
                fieldContainer.removeChild(treatmentToremove)
            })
        });
    };

    // Logica para agregar los contenedores que son hidden 
    const furtherInfoContainers = document.querySelectorAll('.further-info');
    furtherInfoContainers.forEach(cont => {
        const field = cont.closest('.field');
        // Capturo los inputRadios
        const inputRadios = field.querySelectorAll('input[type="radio"]');
        const inputYes = inputRadios[0];
        // Capto un cambio en su estado
        inputRadios.forEach(input => {
            input.addEventListener('change', () => {
                // Si tiene para agregar mas de uno
                const addSign = field.querySelector('.add-field-container');
                // Si esta chequeado el si....
                if (inputYes.checked) {
                    cont.classList.remove('hidden');

                    if (addSign) addSign.classList.remove('hidden');
                    // Si toca en agregar, armo una caja mas para que agregue estudios
                    addSign?.addEventListener('click', () => {
                        const fieldContainer = cont.querySelector('.further-info-field-container');
                        const clonedContainer = fieldContainer.cloneNode(true);
                        // Obtén todos los campos de entrada clonados
                        const clonedInputs = clonedContainer.querySelectorAll('input, select');
                        const clonedLabels = clonedContainer.querySelectorAll('label');
                        // Le saco la clase red
                        clonedLabels.forEach(lab =>lab.classList.remove('red'));
                        // Establece los valores de los campos clonados como vacíos
                        clonedInputs.forEach(input => {
                            input.value = '';
                        });
                        cont.appendChild(clonedContainer);
                        listenRemoveFieldContainersBtns();
                    });
                } else {
                    cont.classList.add('hidden');
                    if (addSign) addSign.classList.add('hidden')
                }
            })
        })
    });

    // Logica para mostrar preguntas de embarazo si es mujer
    const genderOption = document.querySelector('.gender-select');
    const womenContainer = document.querySelector('.women-only');
    if (genderOption.value == 'Femenino') { //women
        womenContainer.classList.remove('hidden');
    };
    genderOption.addEventListener('change', () => {
        if (genderOption.value == 'Femenino') { //women
            womenContainer.classList.remove('hidden');
        } else {
            womenContainer.classList.add('hidden');
        };
    });

    // Logica para mostrar input si tocan 'otro' en face treatments
    const otherOptionCheckbox = document.querySelector('#face-treatment-other-option');
    const otherOptionInputContainer = document.querySelector('.other-treatment-input-container');
    otherOptionCheckbox.addEventListener('click',()=>{
        otherOptionCheckbox.checked ? otherOptionInputContainer.classList.remove('hidden') :
        otherOptionInputContainer.classList.add('hidden');
    })

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
    const signaturePad = new SignaturePad(canvas);

    canvas.addEventListener('touchstart', () => {
        checkButton.classList.remove('hidden');
        // canvas.width = canvas.offsetWidth;
        // canvas.height = canvas.offsetHeight;
    })

    let signatureImage;
    let formData = new FormData();
    // Establecer el grosor mínimo del trazo
    signaturePad.maxWidth = 1; // Valor en píxeles
    // Returns signature image as data URL (see https://mdn.io/todataurl for the list of possible parameters)
    // Si confirma la firma
    checkButton.addEventListener('click', async (e) => {
        e.preventDefault();
        checkButton.classList.add('hidden');
        signatureImage = signaturePad.toDataURL(); // save image as PNG
        signatureImage = dataURLtoFile(signatureImage, 'firma.png');
        formData.append('signature', signatureImage);
    });
    // Por si quieren limpiar firma
    clearButton.addEventListener('click', (e) => {
        e.preventDefault()
        signaturePad.clear();
        formData.delete('signature')
    });

    
    // Logica para dejar la fecha de abajo en la fecha del dia
    const inputDate = document.querySelector('#date');
    // Formar la fecha en formato YYYY-MM-DD
    const formattedDate = getTodaysDate();
    // Establecer el valor predeterminado en el input date
    inputDate.value = formattedDate;


    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Chequeo si hay algun campo sin completar
        let allFieldsComplete = checkForAllFieldsComplete();
        if (!allFieldsComplete) return

        // Logica para clonar repo
        let bodyClone = document.body.cloneNode(true);
        // Remuevo lo innecesario
        bodyClone.removeChild(bodyClone.querySelector('.spinner-overlay'));
        // Agarro los tachos de basura para borrar, tambien el agregar + 
        let elementsToRemove = bodyClone.querySelectorAll('.remove-field-container-btn, .add-field-container, .button-container, .button-to-remove');
        elementsToRemove.forEach(el => el.remove())
        // Agarro todo lo que quiero cambiar
        let inputsToChange = bodyClone.querySelectorAll('input,select');
        inputsToChange.forEach(input => {
            let type = input.type;
            let value = input.value;
            // Para los input text, date, mail lo reemplazo por <p>
            if (type == 'text' || type == 'date' || type == 'email') {//Estos los cambio por un <p> con la etiqueta
                // Creo la etiqueta p  <p class="patient-option bold"></p> con el valor del input
                const paragraph = document.createElement('p');
                paragraph.classList.add('patient-option', 'bold');
                paragraph.textContent = type == 'date' ? dateFormater(value) : value;
                input.parentNode.replaceChild(paragraph, input);
            } else if (type == 'radio' || type == 'checkbox') {
                // Si esta chequeado, pinto ese input chequeado
                input.checked ? input.setAttribute("checked", "checked") : null;
            } else { //Es el select
                // Ahora cambio el select
                let selectToPickValue = document.getElementById('gender');//Lo agarro desde el documento
                const selectValue = selectToPickValue.options[selectToPickValue.selectedIndex].text;
                // Creo la etiqueta p  <p class="patient-option bold"></p> con el valor del input
                const paragraph = document.createElement('p');
                paragraph.classList.add('patient-option', 'bold');
                paragraph.textContent = selectValue;
                input.parentNode.replaceChild(paragraph, input);
            };
        });

        // Me fijo si esta chequeado en si el input que abre opciones, si
        // no esta chequeado le agrego una clase al label para que quede bien en el PDF
        let specifyFields = Array.from(document.querySelectorAll('.specify-field'));
        if (document.querySelector('#previous-treatments-yes').checked) {
            // Le agrego la clase
            bodyClone.querySelector('#unique-label-container').classList.remove('form-label-container-close');
            bodyClone.querySelector('#unique-form-sublabel').classList.remove('form-sublabel-nothing-open');
            // Voy por cada contenedor que tiene para especificar, si hay alguno que esta mostrando le agrego mas margen bottom a consideration
            let openedSpecifyFields = specifyFields.filter(field => {
                // Solo me trae aquellos no estan hidden
                return !field.querySelector('.further-info').classList.contains('hidden')
            });
            if (openedSpecifyFields.length) {
                bodyClone.querySelector('#unique-form-sublabel').classList.add('form-sublabel-more-margin');
            }
        };

        // return console.log(bodyClone);
        formData.append('contentHTML', bodyClone.innerHTML); //Mando el html

        // Muestro el cargando pdf...
        document.querySelector('.spinner-overlay').classList.remove('hidden');

        let response = await fetch('/generateMedicalPDF', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            // Borro el formdata
            formData.delete('contentHTML');
            
            document.querySelector('.spinner-overlay').classList.add('hidden');
            // Convierte la respuesta en un Blob (archivo)
            const archivoBlob = await response.blob();
            // Crea un enlace de descarga
            const linkToDownload = document.createElement('a');
            linkToDownload.href = URL.createObjectURL(archivoBlob);
            linkToDownload.download = 'formulario.pdf';

            // Simula un clic en el enlace para iniciar la descarga
            linkToDownload.click();

            // Limpia los recursos del enlace
            URL.revokeObjectURL(linkToDownload.href);
            console.log(response);
        };
    });
});