window.addEventListener('load', () => {
    let images = document.querySelector('.images')


    images.addEventListener('change', (e) => {
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

})