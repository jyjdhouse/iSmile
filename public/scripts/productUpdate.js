window.addEventListener('load', () => {

    const form = document.querySelector('.create-product-form')
    const inputs = document.querySelectorAll('.required-input')
    const textArea = document.querySelector('.create-product-form textarea')
    let formErrors = false

    inputs.forEach(inp => {
        inp.addEventListener('change', (e) => {
            inp.value(e.target.value)
        })
    })

    // LOGICA PARA MOSTRAR IMAGENES
    let files = document.querySelector('.files')


    files.addEventListener('change', (e) => {
        // Contenedor donde van a ir las fotos
        let divContainer = document.querySelector('.images-radio-box-wrapper');
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
                    } else if (file.type.startsWith('video/')) {
                        // Si es un video
                        boxHTML = ``;
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
        formErrors = false
        inputs.forEach(inp => {
            inp.classList.remove('input-error')
            if (!inp.value || inp.value.trim() == '') {
                inp.classList.add('input-error')
                formErrors = true
            }

        })

        /*  textArea.classList.remove('input-error')
         if(textArea.value.trim() == ''){
             
             textArea.classList.add('input-error')
             formErrors = true
         } */

        if (!formErrors) {
            form.submit()
        }

    });

    // Logica para reproducir los videos que esten
    const videosInView = document.querySelectorAll('.video');
    videosInView.forEach(video => video.play());

})