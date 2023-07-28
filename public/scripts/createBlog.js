window.addEventListener('load', () => {

    const form = document.querySelector('.create-blog-form')
    const inputs = form.querySelectorAll('input')
    const textArea = form.querySelector('textarea')
    let formErrors = false
    let images = document.querySelector('.images')
    let imagesRadioContentContainer = document.querySelector('.images-radio-content-wrapper')


    // form.addEventListener('submit', (e) => {

    //     e.preventDefault()
    //     formErrors = false
    //     inputs.forEach(inp => {
    //         inp.classList.remove('input-error')
    //         if (!inp.value) {
    //             inp.classList.add('input-error')
    //             formErrors = true
    //         }

    //     })

    //     textArea.classList.remove('input-error')
    //     if (textArea.value.trim() == '') {

    //         textArea.classList.add('input-error')
    //         formErrors = true
    //     }

    //     if (!formErrors) {
    //         form.submit()
    //     }

    // })
    // LOGICA de mostrar fotos y selecciónar ppal
    // Capturo cuando se cargan fotos
    images.addEventListener('change', (e) => {
        // Contenedor donde van a ir las fotos
        let divContainer = document.querySelector('.images-radio-box-wrapper');
        // Archivos del input
        console.log(e.target.files);
        let fileObject = e.target.files
        let files = [];
        // Recorro el objeto del input y guardo los archivos en un array
        for (let i = 0; i < fileObject.length; i++) {
            const file = fileObject[i];
            files.push(file);
        }
        console.log(files);
        const filePromises = files.map((file) => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    let boxHTML =
                        `
                        <div class="image-radio-box">
                            <div class="image-container">
                                <label for="${reader.result}"><img src="${reader.result}" alt="${reader.result}"></label>
                            </div>
                            <input type="radio" name="mainImage" id="${reader.result}" value="${file.name}">
                        </div>
                        `
                    resolve(boxHTML)
                }
            });
        });
        Promise.all(filePromises).then((boxes) => {
            // Agrega los boxes al contenedor
            boxes.forEach(box => divContainer.innerHTML += box)
        });
    });
});


