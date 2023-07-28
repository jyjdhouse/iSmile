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

            });
        });
    }
    listenCheckboxLabels();
    const listenRemoveLabelsBtns = () => {
        const btns = document.querySelectorAll('.shown-label');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.shown-label-container').remove();
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

    // Muestro o saco el spinner de 'cargando'
    function handleSpinnerBehave(boolean) {
        const loadingContainer = document.querySelector('.button-loading-spinner');
        const loadingAnimation = document.querySelector('.button-loading-spinner .loading-container');
        if (boolean) { //Muestro
            loadingContainer.classList.add('button-loading-spinner-active');
            loadingAnimation.classList.add('loading-container-active');
            return
        }
        loadingContainer.classList.remove('button-loading-spinner-active')
        loadingAnimation.classList.remove('loading-container-active');
        return
    }

    // Funcion que va por cada campo y creo el formData para enviar por post
    function loadFormData(formData) {
        const shownLabelsContainer = document.querySelectorAll('.shown-label-container');
        let ids = [];
        // Voy por cada uno para agregar id, file
        shownLabelsContainer.forEach(cont => {
            const id = cont.dataset.id;
            const file = cont.querySelector('.label-file-input').files[0];
            ids.push(id);
            if (file) {
                formData.append('files', file); // Agregar el archivo al FormData
            } else {
                const emptyFile = new File([], 'empty_file.txt', { type: 'text/plain' });
                formData.append('files', emptyFile); // Agregar null al FormData si no hay archivo
            }
        });
        // Ahora lo pusheo al FormData
        formData.append('ids', JSON.stringify(ids));

        // Ahora con los prices
        const newPrice = document.querySelector('input[name="new_price"]').value;
        const newCashPrice = document.querySelector('input[name="new_cash_price"]').value;
        //Los sumo al formData
        formData.append('newPrice', newPrice);
        formData.append('newCashPrice', newCashPrice);
    }
    // Logica de cuando manda el formulario mandarle las imagenes
    const form = document.querySelector('.form');
    form.addEventListener('submit', async (e) => {
        try {
            e.preventDefault();
            let formData = new FormData();
            loadFormData(formData);
            handleSpinnerBehave(true);
            // Hago el fetch
            let response = await fetch('/api/admin/updateServicesPrice', {
                method: 'PUT',
                body: formData
            });
            if(response.ok){
                // Dejo de mostrar el spinner
                handleSpinnerBehave(false);
                // Limpio todas las tarjetas
                document.querySelectorAll('.shown-label-container').forEach(cont=>cont.remove());
            }
        } catch (error) {
            return console.log(`Error al mandar el formulario: ${error}`);
        }

    })
});