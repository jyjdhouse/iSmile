import {isInDesktop} from './utils.js';

window.addEventListener('load', () => {

    const mainImg = document.querySelector('.main-img')
    const productFiles = document.querySelectorAll('.product-img')
    const converter = new showdown.Converter();
    const productText = document.querySelector('.product-description')
    const videoElements = document.querySelectorAll('.video');
    
    // función para convertir a html el contenido
    const htmlText = converter.makeHtml(productText.innerText);
    productText.innerHTML = htmlText

    productFiles.forEach(file => {
        // cuando tocan la foto/video
        file.addEventListener('click', () => {
            const activeImg = document?.querySelector('.other-img-container-active')
            activeImg?.classList.remove('other-img-container-active');
            file.classList.add('other-img-container-active');
            
            // Pregunto si es foto o video, y en base a eso cambio
            if(file.classList.contains('video')){ //Video
                const fileSrc = file.querySelector('source').src;
                mainImgContainer.innerHTML = 
                `
                <video class="video main-img" muted playsinline loop>
                    <source src="${fileSrc}" type="video/mp4" alt="main-product-image">
                    <source src="${fileSrc}" type="video/webm" alt="main-product-image">
                    No se puede reproducir el video
                </video>
                `;
                videoElements.forEach(video=>video.currentTime = 0)
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
    // Logica para hacer que los videos se reproduzcan

    videoElements.forEach(video=>video.play())
    // Apenas carga me fijo cuantas other-images vienen- en base a eso le doy width
    const otherImgs = document.querySelectorAll('.other-img-container');
    const count = otherImgs.length;
    otherImgs.forEach(cont => {
        if(isInDesktop()){
    
            if(count==1) {
                cont.style.height = '40%';
                return
            }
            cont.style.height = `${100 / count - (count > 2 ? 2 : 15)}%`
            cont.style.width = "80%"
        } else{
            if(count==1) {
                cont.style.width = '50%';
                return
            }
            cont.style.width = `${100 / count - (count > 2 ? 5 : 15)}%`
            cont.style.height = "60%"
            
        }  
    });
    
    // Modifico el tamano de otherImg en función de la foto gde
    const otherImgContainer = document.querySelector('.other-product-imgs-container');
    count == 1 ? otherImgContainer.style.justifyContent = 'center' : null;
    // console.log(otherImgContainer);
    const mainImgContainer = document.querySelector('.main-img-container');
    // console.log(mainImgContainer.offsetWidth, mainImgContainer.clientWidth);
    if(isInDesktop()){
        otherImgContainer.style.height = '25rem'
        
    } else{
       /*  const widthToSet = mainImgContainer.offsetWidth;
        otherImgContainer.style.width = `${widthToSet}px`; */
        
        otherImgContainer.style.width = `90%`;
    }
    
    // Cuando cambia la resolución va cambiando con esto
    // window.addEventListener('resize', () => {
    //     
    // })

    // LOGICA para tocar boton "ELiminar productop"
    // Capturo cuando tocan el boton
    const startDeleteBtn = document.querySelector('.start-product-delete');
    const deleteProductFormPopup = document.querySelector('.update-delete-btn-container');
    const blackScreen = document.querySelector('.black-screen');
    const cancelProductDeleteBtn = document.querySelector('.cancel-product-delete');
    startDeleteBtn?.addEventListener('click',()=>{
        // Hago aparecer el popup
        deleteProductFormPopup.classList.add('update-delete-btn-container-active');
        blackScreen.classList.add('black-screen-active');
    });
    // si toca cancelar... 
    cancelProductDeleteBtn?.addEventListener('click',(e)=>{
        e.preventDefault();
        // Hago desaparecer el popup
        deleteProductFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
    // si toca blackscreen... 
    blackScreen?.addEventListener('click',()=>{
        // Hago desaparecer el popup
        deleteProductFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });

    // Logica para mostrar detalles del producto
    const productInfoItems = document.querySelectorAll('.product-info-item');
    //Voy por cada uno para ocultarlo
    productInfoItems.forEach(container => {
        //"DESCRIPCION - INGREDIENTES - TAMANO"
        const infoToggler = container.querySelector('.product-info-label');
    
        infoToggler.addEventListener('click',()=>{
            const informationToToggle = container.querySelector('.product-information');
            // Primero me fijo si esta abierto o cerrado
            if (!informationToToggle.classList.contains('product-information-active')) { //Quiere decir que estaba cerrado
                // Activo la altura
                informationToToggle.classList.add('product-information-active');
                // Cambio el signo
                container.querySelector('.product-info-toggler').innerHTML = '-';
                return
            }
            // Aca lo cierro
            // Activo la altura
            informationToToggle.classList.remove('product-information-active');
            // Cambio el signo
            setTimeout(() => {
                container.querySelector('.product-info-toggler').innerHTML = '+';
            }, 300);
            return
        });

    });
})
