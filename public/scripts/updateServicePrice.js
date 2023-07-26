import { isNumeric } from "./utils.js";
window.addEventListener('load', () => {
    let selectedTreatments = [];
    // Logica para que todos los inputs numericos no acepten letras
    let numericInputs = document.querySelectorAll('.numeric-only-input');
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

    // LOGICA PARA MOSTRAR LABELS
    // agaarro las labels 
    const listenCheckboxLabels = () => {
        let checkboxLabels = Array.from(document.querySelectorAll('.checkbox-label'));
        checkboxLabels.forEach(lab => {
            lab.addEventListener('click', () => {
                // lugar donde van a ir los shown. (lo agarro aca para que este actualziado)
                let shownSectionContainer = document.querySelector('.shown-labels-container');
                let name = lab.innerHTML;
                let id = lab.dataset.id;
                // Me fijo que ya no este
                let oldShownLabels = Array.from(shownSectionContainer.querySelectorAll('.shown-label'));
                const isAlreadyShown = oldShownLabels.filter(lab => lab.innerHTML == name);
                if (isAlreadyShown.length) return;

                selectedTreatments.push({
                    id
                })
                // let treatmentIdInput = document.createElement('input');
                // treatmentIdInput.name = 'treatments_id';
                // treatmentIdInput.setAttribute('hidden', true);
                // treatmentIdInput.value = id;
                // Lo agrego al form
                // document.querySelector('.form').appendChild(treatmentIdInput);


                !isAlreadyShown.length ? shownSectionContainer.innerHTML +=
                    `<div class="shown-label-container" data-id="${id}">
                    <p class="shown-label">${name}</p>
                    <input type="file" class="label-file-input">
                ` : null
                    ;
                listenRemoveLabelsBtns();
                listenFileInputs();

            });
        });
    }
    listenCheckboxLabels();
    const listenRemoveLabelsBtns = () => {
        const btns = document.querySelectorAll('.shown-label');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.remove();
                const id = btn.dataset.id;
                // Ahora tengo que borrar el input del form
                const treatmentInputs = Array.from(document.querySelectorAll('input[name="treatments_id"'));
                treatmentInputs.find(inp => inp.value == id).remove();
            })
        })
    };
    listenRemoveLabelsBtns();

    // LOGICA para buscador de tarjetas
    const listenToSearchInput = () => {
        let inputSerach = document.querySelector('.search-checkbox');
        inputSerach.addEventListener('input', (e) => {
            // Agarro las labels 
            let checkboxLabels = Array.from(document.querySelectorAll('.checkbox-label'));
            // tomo el valor de busqueda
            let value = e.target.value.toLowerCase();
            // Si el valor esta contenido en el nombre, muestro las etiquetas
            checkboxLabels.forEach(label => {
                if (!label.innerHTML.toLowerCase().includes(value)) {
                    label.classList.add('hidden');
                } else {
                    label.classList.remove('hidden')
                }
            });
        });
    }
    listenToSearchInput();
    // LOGICA para las fotos de los input
    function listenFileInputs() {
        const fileInputs = document.querySelectorAll("input[type='file'");
        fileInputs.forEach(inp => {
            inp.addEventListener('change', async (e) => {
                const base64Img = await getBase64(e.target.files[0])
                const container = inp.closest('.shown-label-container');
                // Busco si ya esta en la lista que voy a mandar
                let treatmentToAppendFileIndex = selectedTreatments.findIndex(treat => treat.id == container.dataset.id);
                selectedTreatments[treatmentToAppendFileIndex].file = base64Img;
                return

            })
        })
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    const imageInBase64 = event.target.result.split(',')[1];
                    resolve(imageInBase64);
                };
                reader.readAsDataURL(file);
            } else {
                reject(new Error('No se seleccionó ninguna imagen.'));
            }
        });
    }

    // Logica de cuando manda el formulario mandarle las imagenes
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedTreatmentsToBody = document.createElement('input');
        selectedTreatmentsToBody.type = 'hidden';
        selectedTreatmentsToBody.name = 'treatments_id';
        selectedTreatmentsToBody.value = JSON.stringify(selectedTreatments);
        form.appendChild(selectedTreatmentsToBody);
        console.log(form);
        form.submit();
    })
});