window.addEventListener('load', () => {

    const form = document.querySelector('.create-blog-form')
    const inputs = form.querySelectorAll('input')
    const textArea = form.querySelector('textarea')
    let formErrors = false
    let images = document.querySelector('.images')
    let imagesRadioContentContainer = document.querySelector('.images-radio-content-wrapper')

    // LOGICA de mostrar fotos y selecciónar ppal
    // Capturo cuando se cargan fotos
    images.addEventListener('change', (e) => {
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
                        boxHTML =
                        `
                        <div class="image-radio-box">
                            <div class="image-container">
                            <img src="${reader.result}" alt="${file.name}" class='image-to-select-main'>
                            </div>
                            <input type="radio" name="mainImage" value="${file.name}" class="radio-from-image">
                        </div>
                        `
                    }else{
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
});


