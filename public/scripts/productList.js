import { checkIfIsInScreen, isInDesktop } from "./utils.js";
window.addEventListener('load', () => {
    const productCards = document.querySelectorAll('.product-card-container');
    let intervalId;
    let intervalTime = 2000;
    let actualIndex = 0;
    let timeout;
    let lastCard;
    // Logica para pasar entre foto y foto/video
    const updateProductCardsClasses = (card) => {
        const images = Array.from(card.querySelectorAll('.product-image-test'));
        // Si el actual index es > a la cantidad de imagenes es que vuelve a arrancar
        if (actualIndex >= images.length) actualIndex = 0;

        images.forEach((image, index) => {

            if (images.length == 2) {
                image.classList.remove('product-image-test-active', 'carousel-animation');
                if (index === actualIndex) {
                    image.classList.add('product-image-test-active');
                } else {
                    image.classList.add('carousel-animation');
                }
            } else {
                image.classList.remove('product-image-test-active', 'product-image-test-next-slide', 'product-image-test-prev-slide');
                if (index === actualIndex) {
                    image.classList.add('product-image-test-active');
                } else if (index === (actualIndex + 1) % images.length) {
                    image.classList.add('product-image-test-next-slide');
                } else {
                    image.classList.add('product-image-test-prev-slide');
                }
            }


            // ACA PREGUNTAMOS SI VIENE VIDEO

            if (image.classList.contains('video') && index == actualIndex) {
                image.currentTime = 0;
                image.play(); //Arranco el video
                const duration = image.duration * 1000; //Duración del video 
                clearInterval(intervalId); //Limpio el intervalo de 0s
                timeout = setTimeout(() => { //Video termina
                    intervalId = setInterval(() => {
                        // Reinicio video
                        image.pause();
                        // Paso a la siguiente al toque, y ejecuto devuelta el carousel
                        actualIndex++
                        updateProductCardsClasses(card);
                    }, intervalTime);
                }, duration);

            } else if (!image.classList.contains('video') && index == actualIndex) {
                // console.log('Estoy aca');
                //En el caso que no haya video
                clearInterval(intervalId); //Por si no viene video, para que no quede con el intervalo inicial (0s)
                intervalId = setInterval(() => {
                    actualIndex++
                    updateProductCardsClasses(card);
                }, intervalTime);
            }
        });
    };
    // Voy por cada tarjeta
    productCards.forEach(card => {
        if (isInDesktop()) { //Logica si esta en desktop
            // Cuando pasa por arriba...
            card.addEventListener('mouseenter', () => {
                intervalId = setInterval(() => {
                    actualIndex++
                    updateProductCardsClasses(card);
                }, 0);
            });
            // Cuando se va...
            card.addEventListener('mouseleave', () => {
                actualIndex = 0;
                updateProductCardsClasses(card);
                clearInterval(intervalId);
                clearTimeout(timeout);
            });
        } else {
            card.addEventListener('touchstart', () => {

                // Comparo el ultimo container con el que esta tocando
                if (card != lastCard) { //Si es distinto

                    //Vuelve a la 1er foto
                    actualIndex = 0;
                    lastCard && updateProductCardsClasses(lastCard);
                    clearInterval(intervalId); //Detengo el anterior
                    clearTimeout(timeout);
                    //Arranco el nuevo
                    intervalId = setInterval(() => { //Esto es para que cambie la primer foto, 
                        // pero despues lo tengo que frenar y redefinir
                        actualIndex++
                        updateProductCardsClasses(card);
                    }, 0);
                };
                lastCard = card;
            });
        }

    });

    // PARA LA GALERIA
    const galleryPhotosSection = document.querySelector('.gallery-photo-section');
    const galleryPhotos = galleryPhotosSection?.querySelectorAll('.gallery-photo');
    const photosWrapper = document.querySelector('.photo-wrapper');
    let currentIndex = 0;

    function listenArrowClicks(){
        const arrows = document.querySelectorAll('.change-gallery-photo-btn');
        const imageWidth = galleryPhotos[0].getBoundingClientRect().width;
        arrows.forEach(btn=>{
            btn.addEventListener('click',()=>{
                // si toca la flecha de la izquierda
                if(btn.classList.contains('previous-photo-btn')){
                    // Me fijo que no este en la primer foto
                    if(currentIndex == 0)return
                    // Si no esta en la primera voy 1 para atras
                    currentIndex--
                    photosWrapper.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
                    getActiveDot(currentIndex);
                    return
                };
                // Me fijo que no este en la ultima foto
                if(currentIndex == galleryPhotos.length-1)return
                // Si no esta en la primera voy 1 para atras
                currentIndex++
                photosWrapper.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
                getActiveDot(currentIndex);
                return
            })
        })
    };
    listenArrowClicks();
    // Si esta en tablet/mobile ==> Carrusel
    if (!isInDesktop()) {
        let startX = 0;
        let deltaX = 0;
        

        const amountToScroll = window.innerWidth; //Popr el column gap
        galleryPhotosSection?.addEventListener('touchstart', (e) => { //Capturo donde arranca el touch
            startX = e.touches[0].clientX;
            photosWrapper.classList.add('photo-wrapper-moving');
        });
        galleryPhotosSection?.addEventListener('touchmove', (e) => {

            deltaX = e.touches[0].clientX - startX; //Si es positivo desplaza para derecha, sino para izq

            // Para que si llega a la ultima, no me mueva la foto
            if (currentIndex <= galleryPhotos.length && currentIndex >= 0) {
                // Traslado el carousel mientras scrollea
                if (deltaX < 0) {//scrollLeft
                    // Si no esta en la ultima...
                    if (currentIndex < galleryPhotos.length - 1) {
                        e.preventDefault();
                        photosWrapper.style.transform = `translateX(-${(currentIndex) * amountToScroll - deltaX * 1}px)`
                    }

                } else if (deltaX > 0 && currentIndex > 0) {//Mueve hacia la derecha
                    e.preventDefault();
                    photosWrapper.style.transform = `translateX(${-(currentIndex) * amountToScroll + deltaX * 1}px)`;
                };
            };

        }, { passive: false });
        galleryPhotosSection?.addEventListener('touchend', (e) => {
            photosWrapper.classList.remove('photo-wrapper-moving')
            if (deltaX < 0 && currentIndex < galleryPhotos.length - 1) { //Si scrollLeft...
                photosWrapper.style.transform = `translateX(-${deltaX}px)`;
                photosWrapper.style.transform = `translateX(-${currentIndex * amountToScroll + amountToScroll}px)`;
                currentIndex++
            }
            if (deltaX > 0 && currentIndex > 0) { //Si scrollRight...
                photosWrapper.style.transform = `translateX(${deltaX}px)`;
                photosWrapper.style.transform = `translateX(${-currentIndex * amountToScroll + amountToScroll}px)`;
                currentIndex--
            }
            //LOGICA DE DOTS cuando hace un touch end
            getActiveDot(currentIndex)
        });

    }
    // Para pintar el activo
    function getActiveDot(currentIndex) {
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.classList.remove('gallery-dot-active')
            if (i === currentIndex) {
                dot.classList.add('gallery-dot-active')
            }
        })
    };
    // Escucha si tocan el dot
    function clickOnDot() {
        const dots = document.querySelectorAll('.gallery-dot');
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                const imageWidth = galleryPhotos[0].getBoundingClientRect().width;
                if (i > currentIndex) {
                    photosWrapper.style.transform = `translateX(-${i * imageWidth}px)`;
                    currentIndex = i
                    getActiveDot(currentIndex)
                } else {
                    photosWrapper.style.transform = `translateX(${-i * imageWidth}px)`;
                    currentIndex = i
                    getActiveDot(currentIndex)
                }

            })
        })
    };
    clickOnDot();
});