import { activateClass, deactivateClass } from "./utils.js";
window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    var carouselImages = document.querySelector('.carousel-images-container');
    var carouselBar = document.querySelector('.scrollbar-carousel');
    var images = document.querySelectorAll('.product-image');
    var imageWidth = images[0]?.offsetWidth;
    var imageShowed = 0

    const checkForVideo = () => { //Se fija si hay video
        let img = mobileImages[currentIndex];
        const video = fixedCarouselMobile.querySelector('video');
        if (img.classList.contains('video')) {//Si es video
            img.play();
        } else { //Sino, lo vuelvo al inicio y lo pauso
            if(video){
                video.currentTime = 0;
                video.pause();
            }
            
        }
    };

    // LOGICA PARA TOCAR LA FOTO Y CAMBIARLA
    const carouselImagesContainer = document.querySelector('.carousel-images-container');
    const sideImagesDesktop = document.querySelectorAll('.side-image-desktop');
    const sideImageslength = sideImagesDesktop.length;
    // console.log(sideImageslength);
    const sideImageHeight = 100 / sideImageslength - 1; //Si hay 4 es 100/4 = 25 -1 = 24 (para que quede espacio)
    sideImagesDesktop.forEach(img => {
        // LOGICA PARA ADAPTAR SIZE DE SIDE-IMAGES
        img.style.height = `${sideImageHeight}%`

        // Le doy play al video
        img.classList.contains('video') && img.play();

        img.addEventListener('click', () => {
            let newElement;
            // Para sacarle la clase active a la foto anterior
            document.querySelector('.product-image-active').classList.remove('product-image-active');
            carouselImagesContainer.innerHTML = '';

            // Si es video hago algo distinto
            if (img.classList.contains('video')) {
                //Creo el elemento, con todas sus propiedades
                newElement = document.createElement('video');
                const newElementSrc = img.getAttribute('src');
                newElement.src = newElementSrc;
                newElement.classList.add('product-image', 'video');
                newElement.loop = true;
                newElement.play();
                // Aca reinicio el video chiquito, asi quedan sincronizados
                img.currentTime = 0;
                img.play();
            } else {
                // Tengo que crear una etiqueta para agregarsela al div
                newElement = document.createElement('img');
                const newElementSrc = img.getAttribute('src');
                newElement.src = newElementSrc;
                newElement.classList.add('product-image');
            };
            carouselImagesContainer.appendChild(newElement);
            img.classList.add('product-image-active');
        });
    });




    // LOGICA PARA MOSTRAR SIZE GUIDE & PRODUCT SPECIFICATIONS
    const sizeGuideBtn = document.getElementById('size-guide-btn');
    const productSpecificationsBtn = document.getElementById('product-specifications-btn');
    const closeSizeGuideBtns = document.querySelectorAll('.close-size-guide-btn');
    const body = document.querySelector('body');

    const blackScreen = 'black-screen';
    const sizeGuideImgContainer = 'size-guide-img-container';
    const productSpecificationsContainer = 'product-specifications-container';

    const productDetailBtn = document.getElementById('product-specifications-btn')
    const specificationsListContainer = document.querySelector('.specifications-list-container')

    sizeGuideBtn?.addEventListener('click', () => {
        body.classList.add('noScroll');
        activateClass([blackScreen, sizeGuideImgContainer]);
    });
    /*   productSpecificationsBtn.addEventListener('click', () => {
          body.classList.add('noScroll');
          activateClass([blackScreen, productSpecificationsContainer]);
      }) */
    document.querySelector(`.${blackScreen}`).addEventListener('click', () => {
        body.classList.remove('noScroll');
        clientPopupContainers.forEach(popup => { //Elimino de todos los popups la clase active
            popup.classList.remove('client-popup-container-active')
        });

        deactivateClass([blackScreen, sizeGuideImgContainer, productSpecificationsContainer, deleteProductPopupContainer]);
    });
    closeSizeGuideBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.remove('noScroll');
            deactivateClass([blackScreen, sizeGuideImgContainer, productSpecificationsContainer]);
        })
    });

    // LOGICA PARA MOSTRAR POPUPS
    const clientPopupTogglers = document.querySelectorAll('.client-popup-open-btn'); //Todos los togglers
    const paymentPopupCloseBtns = document.querySelectorAll('.client-popup-close-btn-container'); //Todas las x
    const clientPopupContainers = document.querySelectorAll('.client-popup-container'); //Todos los popUps

    clientPopupTogglers.forEach(container => {//Voy por cada clientPopup
        const popUpContainer = container.querySelector('.client-popup-container');
        container.addEventListener('click', () => { //Toca para abrir popup
            // console.log('hola');
            body.classList.add('noScroll');
            popUpContainer.classList.add('client-popup-container-active');
            activateClass([blackScreen]);
        });
    });

    paymentPopupCloseBtns.forEach(btn => {//Voy por cada x
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); //Para que no escuche el event listener del pader
            deactivateClass([blackScreen]);
            body.classList.remove('noScroll');
            clientPopupContainers.forEach(popup => { //Elimino de todos los popups la clase active
                popup.classList.remove('client-popup-container-active')
            });
        })
    });

    productDetailBtn?.addEventListener('click', () => {
        specificationsListContainer.classList.toggle('specifications-list-container-active')
    })

    // LOGICA PARA DARLE LIKE
    const heart = document.querySelector('.favourite-logo')

    heart?.addEventListener('click', () => {
        //todo futuro: agregarlo a wishlist

        if (heart.classList.contains('fa-regular')) {
            heart.classList.add('fa-solid');
            heart.classList.remove('fa-regular');
        } else {
            heart.classList.remove('fa-solid');
            heart.classList.add('fa-regular');
        }
    });


    // LOGICA PARA CARROUSEL EN MOBILE
    const fixedCarouselMobile = document.querySelector('.carousel-mobile');
    const height = fixedCarouselMobile?.getBoundingClientRect().height;
    const carouselMobile = fixedCarouselMobile?.querySelector('.carousel-images-container');
    const mobileImages = fixedCarouselMobile?.querySelectorAll('.product-image');
    const productInfoContainer = document.querySelector('.product-info-container');
    const dotsContainer = document.querySelector('.dots-carousel-container');
    let imageHeight;
    let dots;

    // dots solo funcion
    const getActiveDot = (currentIndex) => {
        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('dots-carousel-active')
            }
        })
    }
    const paintDots = () => {
        const amount = mobileImages?.length
        for (let i = 0; i < amount; i++) {
            dotsContainer.innerHTML+= `<div class="dots-carousel"></div>`
        };
        dots = document.querySelectorAll('.dots-carousel');
    };
    paintDots();

    // BAJO LAS IMAGENES
    mobileImages?.forEach((img, i) => {
        i == 0 ? imageHeight = img.getBoundingClientRect().height : null;
        img.style.transform = `translateY(${100 * i}%)`
    });
    let startY = 0;
    let deltaY = 0;
    let currentIndex = 0;
    let scrollPos;


    // Le pregunto si esta queriendo subir el productInfo, para si es asi directamente lo hago scrollear esos px
    productInfoContainer.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;

        scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
    });
    productInfoContainer.addEventListener('touchmove', (e) => {
        deltaY = e.touches[0].clientY - startY;
        // Pregunto si scrolleo down..
        if (deltaY < 0 && (scrollPos <= .5 * imageHeight)) {
            // El usuario no scrolleo lo equivalente a 1 imagen, entonces lo bajo hasta el productInfo
            window.scrollTo(0, 1.1 * imageHeight);
        }
    });
    fixedCarouselMobile?.addEventListener('touchstart', (e) => { //Capturo donde arranca el touch
        startY = e.touches[0].clientY;
        body.classList.add('noScroll');
        carouselMobile.classList.add('carousel-images-container-moving');
    });


    // Si toca las fotos...
    fixedCarouselMobile?.addEventListener('touchmove', (e) => {

        deltaY = e.touches[0].clientY - startY; //Si es positivo desplaza para arriba, sino para abajo

        // Para que si llega a la ultima, no me mueva la foto
        if (currentIndex <= mobileImages.length && currentIndex >= 0) {
            // Traslado el carousel mientras scrollea
            if (deltaY < 0) {//ScrollDown...
                if (currentIndex == mobileImages.length - 1) {
                    window.scrollTo(0, 1.1 * imageHeight);
                }
                // Si no esta en la ultima...
                if (currentIndex < mobileImages.length - 1) {
                    e.preventDefault();
                    carouselMobile.style.transform = `translateY(-${(currentIndex) * imageHeight - deltaY * 1}px)`
                }

            } else if (deltaY > 0 && currentIndex > 0) {//ScrollUp
                e.preventDefault();
                // Si esta en la ultima, hago un scrollUp de la pagina
                if (currentIndex == mobileImages.length - 1) {
                    window.scrollTo(0, 0);
                };

                carouselMobile.style.transform = `translateY(${-(currentIndex) * imageHeight + deltaY * 1}px)`;
            }


        }

    }, { passive: false });
    fixedCarouselMobile?.addEventListener('touchend', (e) => {
        carouselMobile.classList.remove('carousel-images-container-moving')
        if (deltaY < 0 && currentIndex < mobileImages.length - 1) { //Si scrollDown...
            carouselMobile.style.transform = `translateY(-${deltaY}px)`;
            carouselMobile.style.transform = `translateY(-${currentIndex * imageHeight + imageHeight}px)`;
            currentIndex++
            checkForVideo();
        }
        if (deltaY > 0 && currentIndex > 0) { //Si scrollUp...
            carouselMobile.style.transform = `translateY(${deltaY}px)`;
            carouselMobile.style.transform = `translateY(${-currentIndex * imageHeight + imageHeight}px)`;
            currentIndex--
            checkForVideo();
        }
        body.classList.remove('noScroll');

        //LOGICA DE DOTS cuando hace un touch end

        const activeDot = document.querySelector('.dots-carousel-active')
        activeDot.classList.remove('dots-carousel-active')
        getActiveDot(currentIndex)


    });

    // LOGICA DE DOTS

    // cuando carga solamente por primera vez
    getActiveDot(currentIndex)

    // cuando carga solamente a la primera vez

    const clickOnDot = (currentIndex) => {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const imageHeight = mobileImages[0].getBoundingClientRect().height
                if (i > currentIndex) {
                    carouselMobile.style.transform = `translateY(-${i * imageHeight}px)`;
                    currentIndex = i
                    const activeDot = document.querySelector('.dots-carousel-active')
                    activeDot.classList.remove('dots-carousel-active')
                    getActiveDot(currentIndex)
                } else {
                    carouselMobile.style.transform = `translateY(${-i * imageHeight}px)`;
                    currentIndex = i
                    const activeDot = document.querySelector('.dots-carousel-active')
                    activeDot.classList.remove('dots-carousel-active')
                    getActiveDot(currentIndex)
                }

            })
        })
    }

    clickOnDot(currentIndex);

    // LOGICA PARA ACCIONES DE ADMIN
    const adminContainerTogggler = document.querySelector('.admin-container-button');
    const adminActionsContainer = document.querySelector('.admin-actions-container');
    adminContainerTogggler?.addEventListener('click', (e) => {
        e.stopPropagation(); // Detener la propagación del evento para que no se active el controlador de eventos en el objeto document
        adminActionsContainer.classList.toggle('admin-actions-container-active');
    });
    document.addEventListener('click', (e) => {
        // Me fijo si toco en cualquier lado menos en el contenedor de Admin
        let clickInAdmincontainer = e.target == adminActionsContainer || adminActionsContainer?.contains(e.target);
        // Si el objetivo no es el contenedor ni ningún elemento hijo
        if (!clickInAdmincontainer && adminActionsContainer?.classList.contains('admin-actions-container-active')) {
            adminActionsContainer.classList.remove('admin-actions-container-active');
        }
    });


    /* LOGICA PARA MOSTRAR DELETE PRODUCT POPUP */
    const deleteProductPopupToggler = document.querySelectorAll('.delete-product-popup-toggler');
    const deleteProductPopupContainer = 'delete-product-popup-container';
    deleteProductPopupToggler.forEach(btn => {
        btn.addEventListener('click', () => {
            const element = document.querySelector(`.${deleteProductPopupContainer}`);
            element.classList.toggle(`${deleteProductPopupContainer}-active`);
            document.querySelector(`.${blackScreen}`).classList.toggle(`${blackScreen}-active`);
        })
    })
});