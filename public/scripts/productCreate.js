import {isNumeric} from './utils.js'
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
                            <img src="${reader.result}" alt="${file.name}" class='image-to-select-main'>
                        </div>
                        <input type="radio" name="mainImage" value="${file.name}" class="radio-from-image">
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
            boxes.forEach(box => divContainer.innerHTML += box);
            listenForImagesToSelectMain();
        });
        
    });
    function listenForImagesToSelectMain(){
        const images = document.querySelectorAll('.image-to-select-main');
        console.log(images);
        images.forEach(img=>{
            img.addEventListener('click',()=>{
                console.log('Di click');
                const cont = img.closest('.image-radio-box');
                console.log(cont);
                cont.querySelector('input').checked = true;
            })
        })
    };
    // listenForImagesToSelectMain();
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

    });
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

})