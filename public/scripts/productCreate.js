window.addEventListener('load', () => {

    const form = document.querySelector('.create-product-form')
    const inputs = document.querySelectorAll('.create-product-form input')
    const textArea = document.querySelector('.create-product-form textarea')
    let formErrors = false

    // Logica para pintar imagenes y elegir ppal
    let files = document.querySelector('.files')
    files.addEventListener('change', (e) => {
        // Contenedor donde van a ir las fotos
        let divContainer = document.querySelector('.images-radio-box-wrapper');
        // Lo limpio porque si cargo nuevas no tendrian que estar las de antes
        divContainer.innerHTML = '';
        // Archivos del input
        let fileObject = e.target.files
        let files = [];
        // Recorro el objeto del input y guardo los archivos en un array
        for (let i = 0; i < fileObject.length; i++) {
            const file = fileObject[i];
            files.push(file);
        }

        const filePromises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    let boxHTML;

                    if (file.type.startsWith('image/')) {
                        // Si es una imagen
                        boxHTML =
                            `
                    <div class="image-radio-box">
                        <div class="image-container">
                            <label for="${reader.result}"><img src="${reader.result}" alt="${file.name}"></label>
                        </div>
                        <input type="radio" name="mainImage" id="${reader.result}" value="${file.name}">
                    </div>
                    `;
                    } else {
                        boxHTML = '';
                    }
                    resolve(boxHTML)
                }
            });
        });
        Promise.all(filePromises).then((boxes) => {
            // Agrega los boxes al contenedor
            boxes.forEach(box => divContainer.innerHTML += box)
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        formErrors = false;
        const requiredInputs = document.querySelectorAll('.required');
        requiredInputs.forEach(inp => {
            inp.classList.remove('input-error')
            if (!inp.value) {
                inp.classList.add('input-error')
                formErrors = true
            }

        })

        textArea.classList.remove('input-error')
        if (textArea.value.trim() == '') {

            textArea.classList.add('input-error')
            formErrors = true
        }

        if (!formErrors) {
            form.submit()
        }

    })

})