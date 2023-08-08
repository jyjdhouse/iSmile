window.addEventListener('load', () => {

    const paragraphs = document.querySelectorAll('service-info-p');
    const openDropdown = document.querySelectorAll('.open-dropdown');
    const closeCard = document.querySelectorAll('.close-dropdown');
    const mainImageInfoContainer = document.querySelector('.service-title-info-container')
    const serviceDetailCardsContainer = document.querySelector('.service-detail-cards-container');

    // hago la función de los que se remueven generales
    function removeClasses(item) {
        let dropdown = item.querySelector('.servicio-dropdown');
        let plusBtn = item.querySelector('.open-dropdown');
        let minusBtn = item.querySelector('.close-dropdown');
        dropdown.classList.remove('servicio-dropdown-active');
        item.classList.remove('service-detail-card-active');
        plusBtn.classList.add('icon-active');
        plusBtn.classList.remove('icon-inactive');
        minusBtn.classList.add('icon-inactive');
        minusBtn.classList.remove('icon-active');
    }

    function addClasses(item) {
        let dropdown = item.querySelector('.servicio-dropdown');
        let minusBtn = item.querySelector('.close-dropdown');
        let plusBtn = item.querySelector('.open-dropdown');

        dropdown.classList.add('servicio-dropdown-active');
        item.classList.add('service-detail-card-active');
        minusBtn.classList.remove('icon-inactive');
        minusBtn.classList.add('icon-active');
        plusBtn.classList.add('icon-inactive');
        plusBtn.classList.remove('icon-active');
    }

    openDropdown.forEach(act => {
        act.addEventListener('click', () => {
            let activeCard = document.querySelector('.service-detail-card-active');
            if (activeCard !== null) {
                activeCard.classList.remove('service-detail-card-active');
                removeClasses(activeCard);
                let minusBtn = activeCard.querySelector('.close-dropdown');
                minusBtn.classList.add('icon-inactive');
                minusBtn.classList.remove('icon-active');
            } else {

            }
            let parent = act.closest('.service-detail-card');
            addClasses(parent);

        })

    })

    closeCard.forEach(btn => {
        btn.addEventListener('click', () => {
            let parent = btn.closest('.service-detail-card');
            removeClasses(parent);

        })
    })


    const timeoutId = setTimeout(() => {
        console.log('entro')
        mainImageInfoContainer.classList.add('service-title-info-container-active');
        serviceDetailCardsContainer.classList.add('service-detail-cards-container-active')
        return clearTimeout(timeoutId)
    }, 750)

    // Logica para imagen editable
    const editImageBtn = document.querySelector('.change-image-btn-container');
    const editImageForm = document.querySelector('.edit-file-overlay');
    const cancelBtn = document.querySelector('.cancel-file-action');
    const serviceImage = document.querySelector('.service-detail-title-container img')
    editImageBtn.addEventListener('click', () => {
        editImageForm.classList.toggle('edit-file-overlay-active')
    });

    // Logica para editar contendio

    let previousSrc;

    // Cuando tocan el boton de cancelar

    cancelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        editImageForm.classList.remove('edit-file-overlay-active');
        // Vuelvo la imagen a la foto que tenia
        if (previousSrc) {
            serviceImage?.setAttribute('src', previousSrc);
            previousSrc = undefined;
        }

        // Reiniciar el valor del elemento <input>
        editImageForm.querySelector('input').value = '';

    });

    // Para mostrar la foto que subieron
    const hiddenInputFile = document.querySelector('.edit-file-input');
    hiddenInputFile.addEventListener('change', (e) => { //Subieron un archivo para cambiar la foto
        previousSrc = serviceImage.getAttribute('src');
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            serviceImage.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(file);

        // Armo tambien el oldFilename
        let oldFilenameInput = document.createElement('input');
        oldFilenameInput.name = 'old_filename';
        oldFilenameInput.setAttribute('hidden', true);
        const oldFilenameValue = previousSrc.split('/')[previousSrc.split('/').length - 1];
        oldFilenameInput.value = oldFilenameValue;
        // Agrego al form
        editImageForm.appendChild(oldFilenameInput);
    });

    editImageForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pathNameArray = window.location.pathname.split('/'); // /servicios/2/?1
        // El id de la especialidad
        const specialtyId = parseInt(pathNameArray[2]);
        // Armo el input para mandar por el form
        let specialtyIdInput = document.createElement('input');
        specialtyIdInput.name = 'specialtyId';
        specialtyIdInput.setAttribute('hidden', true);
        specialtyIdInput.value = specialtyId;
        // Agrego al form
        editImageForm.appendChild(specialtyIdInput);

        let specialtyServiceId;
        if (pathNameArray.length == 4) {
            specialtyServiceId = parseInt(pathNameArray[3]);
            let specialtyServiceIdInput = document.createElement('input');
            specialtyServiceIdInput.name = 'specialtyServiceId';
            specialtyServiceIdInput.setAttribute('hidden', true);
            specialtyServiceIdInput.value = specialtyServiceId;
            // Agrego al form
            editImageForm.appendChild(specialtyServiceIdInput);
        };
        // Hago el submit
        editImageForm.submit();
    })
})