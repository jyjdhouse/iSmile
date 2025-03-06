import { checkForNumericInputs } from "./utils.js";
window.addEventListener('load', () => {
    let selectedTreatmentsToDestroy = [];
    // Logica para que todos los inputs numericos no acepten letras
    checkForNumericInputs();

    // LOGICA PARA MOSTRAR LABELS
    // agaarro las labels 
    const listenCheckboxLabels = () => {
        let checkboxLabels = Array.from(document.querySelectorAll('.checkbox-label'));
        checkboxLabels.forEach(lab => {
            lab.addEventListener('click', () => {
                // Busco el form al que pertenecen
                const form = lab.closest('form');
                const isDestroyForm = form.classList.contains('delete-treatment-form');
                // lugar donde van a ir los shown. (lo agarro aca para que este actualziado)
                let shownSectionContainer = form.querySelector('.shown-labels-container');
                let name = lab.innerHTML;
                let id = lab.dataset.id;
                // Me fijo que ya no este
                let oldShownLabels = Array.from(shownSectionContainer.querySelectorAll('.shown-label'));
                const isAlreadyShown = oldShownLabels.filter(lab => lab.innerHTML == name);
                if (isAlreadyShown.length) return;
                // Dependiendo en que form este lo pusheo al array correspondiente
                isDestroyForm ? selectedTreatmentsToDestroy.push(id) : null;

                if (!isAlreadyShown.length) {
                    if (isDestroyForm) {
                        shownSectionContainer.innerHTML +=
                            `<div class="shown-label-container" data-id="${id}">
                        <p class="shown-label">${name}</p>
                    `
                    } else {
                        shownSectionContainer.innerHTML +=
                            `<div class="shown-label-container" data-id="${id}">
                        <p class="shown-label">${name}</p>
                        <input type="file" class="label-file-input" accept="image/*">
                        `
                    }
                }
                listenRemoveLabelsBtns();
            });
        });
    }
    listenCheckboxLabels();
    const listenRemoveLabelsBtns = () => {
        const btns = document.querySelectorAll('.shown-label');
        btns.forEach(btn => {

            btn.addEventListener('click', () => {
                const form = btn.closest('form');
                const container = btn.closest('.shown-label-container')
                if (form.classList.contains('delete-treatment-form')) {
                    const idToRemove = container.dataset.id;
                    const indexToRemove = selectedTreatmentsToDestroy.findIndex(id=>id==idToRemove);
                    // Lo borro del array
                    selectedTreatmentsToDestroy.splice(indexToRemove,1);
                }
                container.remove();
            })
            console.log(selectedTreatmentsToDestroy);
        })
    };
    listenRemoveLabelsBtns();

    // LOGICA para buscador de tarjetas
    const listenToSearchInput = () => {
        // Esto es un queselAll porque hay 2 buscadores
        let inputSearches = document.querySelectorAll('.search-checkbox');
        inputSearches.forEach(inputSearch => {
            inputSearch.addEventListener('input', (e) => {
                const form = inputSearch.closest('form')
                // Agarro las labels 
                let checkboxLabels = Array.from(form.querySelectorAll('.checkbox-label'));
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
        const shownLabelsContainer = document.querySelectorAll('.form .shown-label-container');
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
        const newPrice = document.querySelector('.form input[name="new_price"]').value;
        const newCashPrice = document.querySelector('.form input[name="new_cash_price"]').value;
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
            if (response.ok) {
                // Dejo de mostrar el spinner
                handleSpinnerBehave(false);
                // Limpio todas las tarjetas
                document.querySelectorAll('.form .shown-label-container').forEach(cont => cont.remove());
            }
        } catch (error) {
            return console.log(`Error al mandar el formulario: ${error}`);
        }

    });

    // LOGICA PARA SELECTS
    const specialtySelect = document.getElementById('specialty_id');
    const specialtyServiceSelect = document.getElementById('specialtyService_id')
    specialtySelect.addEventListener('change', (e) => {
        // Le pongo hidden a todas las subespecialidades
        specialtyServiceSelect.classList.remove('required')
        specialtyServiceSelect.value = '';
        specialtyServiceSelect.querySelectorAll('option').forEach(opt => opt.classList.add('hidden'));
        // Busco la opcion que eligio
        const optionChosen = Array.from(specialtySelect.querySelectorAll('option')).find(opt => opt.value == e.target.value);
        const hasSubCategory = optionChosen.dataset.subcategory;
        if (hasSubCategory == 'true') {
            specialtyServiceSelect.classList.add('required')
            const specialtyId = optionChosen.value;
            // Le saco el hidden a los que corresponde
            const optionsToShow = Array.from(specialtyServiceSelect.querySelectorAll('option')).filter(opt => opt.dataset.specialtyid == specialtyId);
            optionsToShow.forEach(opt => opt.classList.remove('hidden'));
        }
    });

    // LOGICA para cuando mandar form de agregar servicio
    const addTreatmentForm = document.querySelector('.add-treatment-form');
    function checkForRequiredFields(form) {
        const requiredInputs = form.querySelectorAll('.required');
        let flag = true;
        requiredInputs.forEach(inp => {
            if (!inp.value) {
                inp.classList.add('error-border');
                flag = false;
            }
        });
        return flag
    };

    addTreatmentForm.addEventListener('submit', (e) => {
        const formIsComplete = checkForRequiredFields(e.target);
        if (!formIsComplete) e.preventDefault();
    });

    // Logica para escuchar cuando cambian los input y despintar lo rojo
    const inputs = document.querySelectorAll('input,select,textarea');
    inputs.forEach(inp => {
        inp.addEventListener('input', (e) => {
            if (e.target.value) inp.classList.remove('error-border')
        })
    });

    const destroyTreatmentsForm = document.querySelector('.delete-treatment-form');
    destroyTreatmentsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Inserto al input los ids a borrar
        document.getElementById('ids').value = JSON.stringify(selectedTreatmentsToDestroy);
        e.target.submit();
    })
});