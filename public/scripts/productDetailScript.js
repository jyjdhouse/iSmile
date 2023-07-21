window.addEventListener('load', () => {

    const mainImg = document.querySelector('.main-img')
    const productFiles = document.querySelectorAll('.product-img')

    productFiles.forEach(file => {
        // cuando tocan la foto/video
        file.addEventListener('click', () => {
            const activeImg = document?.querySelector('.other-img-container-active')
            activeImg?.classList.remove('other-img-container-active');
            file.classList.add('other-img-container-active');
            console.log(file);
            // Pregunto si es foto o video, y en base a eso cambio
            if(file.classList.contains('video')){ //Video
                const fileSrc = file.querySelector('source').src
                mainImgContainer.innerHTML = 
                `
                <video class="video main-img" muted playsinline loop>
                    <source src="${fileSrc}" type="video/mp4" alt="main-product-image">
                    <source src="${fileSrc}" type="video/webm" alt="main-product-image">
                    No se puede reproducir el video
                </video>
                `;
                mainImgContainer.querySelector('.main-img').play();
                return
            } //Sino es foto
            mainImgContainer.innerHTML = 
                `
                <img src="${file.src}" class="main-img"
                            alt="main-product-image">
                `
        })
    });
    // Logica para hacer que los video
    const videoElements = document.querySelectorAll('.video');
    videoElements.forEach(video=>video.play())
    // Apenas carga me fijo cuantas other-images vienen- en base a eso le doy width
    const otherImgs = document.querySelectorAll('.other-img-container');
    const count = otherImgs.length;
    otherImgs.forEach(cont => cont.style.width = `${100 / count - (count > 2 ? 5 : 15)}%`)
    // Modifico el tamano de otherImg en función de la foto gde
    const otherImgContainer = document.querySelector('.other-product-imgs-container');
    // console.log(otherImgContainer);
    const mainImgContainer = document.querySelector('.main-img-container');
    let widthToSet = mainImgContainer.offsetWidth;
    otherImgContainer.style.width = `${widthToSet}px`;
    // Cuando cambia la resolución va cambiando con esto
    window.addEventListener('resize', () => {
        widthToSet = mainImgContainer.offsetWidth;
        otherImgContainer.style.width = `${widthToSet}px`;
    })

    // LOGICA para tocar boton "ELiminar productop"
    // Capturo cuando tocan el boton
    const startDeleteBtn = document.querySelector('.start-product-delete');
    const deleteProductFormPopup = document.querySelector('.update-delete-btn-container');
    const blackScreen = document.querySelector('.black-screen');
    const cancelProductDeleteBtn = document.querySelector('.cancel-product-delete');
    startDeleteBtn.addEventListener('click',()=>{
        // Hago aparecer el popup
        deleteProductFormPopup.classList.add('update-delete-btn-container-active');
        blackScreen.classList.add('black-screen-active');
    });
    // si toca cancelar... 
    cancelProductDeleteBtn.addEventListener('click',(e)=>{
        e.preventDefault();
        // Hago desaparecer el popup
        deleteProductFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
    // si toca blackscreen... 
    blackScreen.addEventListener('click',()=>{
        // Hago desaparecer el popup
        deleteProductFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
})
