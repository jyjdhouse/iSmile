import { isNumeric } from "./utils.js";
window.addEventListener('load', () => {
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
                let name = lab.innerHTML;
                let id = lab.dataset.id;
                let treatmentIdInput = document.createElement('input');
                treatmentIdInput.name = 'treatments_id';
                treatmentIdInput.setAttribute('hidden', true);
                treatmentIdInput.value = id;
                // Lo agrego al form
                document.querySelector('.form').appendChild(treatmentIdInput);
                // lugar donde van a ir los shown. (lo agarro aca para que este actualziado)
                let shownSectionContainer = document.querySelector('.shown-labels-container');
                // Me fijo que ya no este
                let oldShownLabels = Array.from(shownSectionContainer.querySelectorAll('.shown-label'));
                const isAlreadyShown = oldShownLabels.filter(lab => lab.innerHTML == name);
                !isAlreadyShown.length ? shownSectionContainer.innerHTML += `<p class="shown-label" data-id="${id}">${name}</p>` : null;
                listenRemoveLabelsBtns();

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

});