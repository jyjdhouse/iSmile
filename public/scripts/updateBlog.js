import { listenForImagesToSelectMain } from "./utils.js";

window.addEventListener('load', () => {
    let images = document.querySelector('.images')


    images.addEventListener('change', (e) => {
        // Contenedor donde van a ir las fotos
        let divContainer = document.querySelector('.images-radio-box-wrapper');
        // Limpio todos los que son a partir del input
        const containersToRemove = divContainer.querySelectorAll('.image-radio-box.from-input');
        containersToRemove.forEach(cont=>cont.remove());
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
                        boxHTML =
                        `
                        <div class="image-radio-box from-input">
                            <div class="image-container">
                            <img src="${reader.result}" alt="${file.name}" class='image-to-select-main'>
                            </div>
                            <input type="radio" name="mainImage" value="${file.name}" class="radio-from-image">
                        </div>
                        `
                    } else{
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
    

    // Logica para reproducir videos
    const videos = document.querySelectorAll('.video');
    videos.forEach(video=>video.play())

})