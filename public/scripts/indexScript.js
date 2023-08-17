import { checkIfIsInScreen, isInDesktop } from "./utils.js";

window.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    let videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        video.muted = true;
        video.play();
    });

    // Función que se ejecutará cuando se haga scroll
    function detectarElementoEnPantalla(e, element) {
        // console.log(e);
        const rect = element.getBoundingClientRect();
        const elementPosition = rect.y //posición que esta con respecto al total
        // if (window.pageYOffset >= elementPosition) {
        //     console.log('Se llego al elemento');
        // }

        // Obtener la posición actual de la ventana gráfica
        const windowHeight = window.innerHeight;
        const totalViewportHeight = document.documentElement.scrollHeight;
        // console.log(totalViewportHeight);
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + windowHeight;

        // Verificar si el elemento está visible en la pantalla
        if (rect.top < windowBottom && rect.bottom > windowTop) {
            // El elemento está visible en la pantalla
            // console.log('Se llego al elemento');
            // video.play(); //Arranca la reproducción
        } else {
            // El elemento no está visible en la pantalla
            console.log('Se FUE del elemento');
            // video.pause(); //Pausa la reproducción
        }
    }

    // Detectar el elemento en la posición inicial
    // detectarElementoEnPantalla();

    // Asignar la función al evento scroll
    // window.addEventListener('scroll', detectarElementoEnPantalla(video));



    // LOGICA QUE APAREZCAN LAS COSAS DEL BANNER AL SCROLLEAR
    const bannerImgContainer = document.querySelector('.discount-banner-img-container');
    const bannerImgObserver = checkIfIsInScreen(.6, handleVisibleBannerImg, bannerImgContainer)
    // Me fijo si aparece en pantalla
    bannerImgObserver.observe(bannerImgContainer);
    function handleVisibleBannerImg(container) {
        console.log(container);
        container.classList.add('discount-banner-img-container-active');
    };
    const bannerTextContainer = document.querySelector('.discount-banner-text-container');
    const bannerTextObserver = checkIfIsInScreen(.6, handleVisibleBannerText, bannerTextContainer)
    // Me fijo si aparece en pantalla
    bannerTextObserver.observe(bannerTextContainer);
    function handleVisibleBannerText(container) {
        container.classList.add('discount-banner-text-container-active');
    }

    // Logica para mostrar labels en slideShow
    const slideShowSection = document.querySelector('.slide-show')
    const slideShowObserver = checkIfIsInScreen(.85, handleVisibleSlideSection, slideShowSection)
    // Me fijo si aparece en pantalla
    slideShowObserver.observe(slideShowSection);
    function handleVisibleBannerText(container) {
        container.classList.add('discount-banner-text-container-active');
    }
    let slideIntervalId;
    function handleVisibleSlideSection() {
        slideIntervalId = setInterval(updateSlideShow, 3500);
    }

    const slideImageContainers = document.querySelectorAll('.slide-image-container')
    slideImageContainers?.forEach(container => {
        container.addEventListener('mouseenter', () => {
            // Freno el slideShow
            clearInterval(slideIntervalId);
        });
        container?.addEventListener('mouseleave', () => {
            slideIntervalId = setInterval(updateSlideShow, 5000);
        });
    });


    // LOGICA para slideShow
    let slideImagesGroup;
    // Depende que resolución agarro los diferentes grupos
    if (isInDesktop()) {
        slideImagesGroup = document.querySelector('.slide-images-wraper-desktop').querySelectorAll('.slide-image-group')
    } else {
        slideImagesGroup = document.querySelector('.slide-images-wraper-mobile').querySelectorAll('.slide-image-group')
    }
    let slideShowIndex = 1;

    function updateSlideShow() {
        // Le saco el nombre porque aparece una vez que esta en vista
        slideImagesGroup.forEach((container, index) => {
            container.classList.remove('slide-image-group-active', 'slide-image-group-next', 'slide-image-group-prev');
            if (index === slideShowIndex) {
                container.classList.add('slide-image-group-active');
            } else if (index === (slideShowIndex + 1) % slideImagesGroup.length) {
                container.classList.add('slide-image-group-next');
            } else {
                container.classList.add('slide-image-group-prev');
            }
        });
        slideShowIndex = (slideShowIndex + 1) % slideImagesGroup.length;
    }


    // LOGICA para aboutUS
    if (!isInDesktop()) { //Mobile
        let startX = 0;
        let deltaX = 0;
        let currentIndex = 0;

        const aboutUsFixedFramesWrapper = document.querySelector('.about-us-frames-space');
        const aboutUsCarousel = document.querySelector('.about-us-frames-container')
        const amountToScroll = window.innerWidth * 1.2; //Popr el column gap
        aboutUsFixedFramesWrapper?.addEventListener('touchstart', (e) => { //Capturo donde arranca el touch
            startX = e.touches[0].clientX;
            aboutUsCarousel.classList.add('about-us-frames-container-moving');
        });
        aboutUsFixedFramesWrapper?.addEventListener('touchmove', (e) => {

            deltaX = e.touches[0].clientX - startX; //Si es positivo desplaza para derecha, sino para izq

            // Para que si llega a la ultima, no me mueva la foto
            if (currentIndex <= 3 && currentIndex >= 0) {
                // Traslado el carousel mientras scrollea
                if (deltaX < 0) {//scrollLeft
                    // Si no esta en la ultima...
                    if (currentIndex < 2) {
                        e.preventDefault();

                        aboutUsCarousel.style.transform = `translateX(-${(currentIndex) * amountToScroll - deltaX * 1}px)`
                    }

                } else if (deltaX > 0 && currentIndex > 0) {//Mueve hacia la derecha
                    e.preventDefault();
                    aboutUsCarousel.style.transform = `translateX(${-(currentIndex) * amountToScroll + deltaX * 1}px)`;
                };
            };

        }, { passive: false });
        aboutUsFixedFramesWrapper?.addEventListener('touchend', (e) => {
            aboutUsCarousel.classList.remove('about-us-frames-container-moving')
            if (deltaX < 0 && currentIndex < 2) { //Si scrollLeft...
                aboutUsCarousel.style.transform = `translateX(-${deltaX}px)`;
                aboutUsCarousel.style.transform = `translateX(-${currentIndex * amountToScroll + amountToScroll}px)`;
                currentIndex++
            }
            if (deltaX > 0 && currentIndex > 0) { //Si scrollRight...
                aboutUsCarousel.style.transform = `translateX(${deltaX}px)`;
                aboutUsCarousel.style.transform = `translateX(${-currentIndex * amountToScroll + amountToScroll}px)`;
                currentIndex--
            }
            //LOGICA DE DOTS cuando hace un touch end
            getActiveDot(currentIndex)
        });

        function getActiveDot(currentIndex) {
            const dots = document.querySelectorAll('.about-us-dot');
            dots.forEach((dot, i) => {
                dot.classList.remove('about-us-dot-active')
                if (i === currentIndex) {
                    dot.classList.add('about-us-dot-active')
                }
            })
        }

    }

    // LOGICA gallery show
    if (!isInDesktop()) { //Solo para mobile la logica
        const productGalleryCards = document.querySelectorAll('.product-gallery-card');
        let timeoutId = undefined;
        let time = 4000;
        let lastCardTouched;
        // Me fijo cuando toca en un producto de la galeria
        productGalleryCards.forEach(card => {
            card.addEventListener("touchend", function (e) {
                // Si no estaba con la clase hover, no lo mando al link, solamente muestro el hover
                if (!card.classList.contains("product-gallery-card-hover") && card != lastCardTouched) {
                    if (lastCardTouched) {
                        lastCardTouched.classList.remove("product-gallery-card-hover");
                        clearTimeout(timeoutId);
                    }
                    lastCardTouched = card;
                    e.preventDefault();
                    card.classList.add("product-gallery-card-hover");
                    // Este timeout es para que despues de 2 segundos de haber tocado lo vuelva a como estaba
                    timeoutId = setTimeout(() => {
                        card.classList.remove("product-gallery-card-hover");
                        lastCardTouched = undefined;
                    }, time);
                }
            });
        });
        const galleryEditBtns = document.querySelector('.gallery-show').querySelectorAll('.change-image-btn');
        const galleryCancelEditBtns = document.querySelector('.gallery-show').querySelectorAll('.cancel-file-action');
        // Si hace click en el galleryEditBtns saco el timeout
        galleryEditBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (timeoutId) clearTimeout(timeoutId)
            });
        });
        // Si hace click en el Cancelar pongo el timout
        galleryCancelEditBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.product-gallery-card')
                if (!timeoutId) {
                    timeoutId = setTimeout(() => {
                        card.classList.remove("product-gallery-card-hover");
                        lastCardTouched = undefined;
                    }, time);
                }
            });
        });
    }

    // LOGICA para instagram posts
    // Lo defino aca porque en mobile tiene repercución
    const editBtns = document.querySelectorAll('.change-image-btn');
    const cancelBtns = document.querySelectorAll('.cancel-file-action');
    if (isInDesktop()) { //Desktop
        const igCards = document.querySelectorAll('.instagram-card');
        igCards.forEach((card, i) => {
            if (i == 0) card.classList.remove('instagram-card-active')
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.instagram-client-overlay');
                overlay?.classList.add('instagram-client-overlay-active');
            });
            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.instagram-client-overlay');
                overlay?.classList.remove('instagram-client-overlay-active');
            });
        });
    } else { //Mobile
        function toggleActiveImage() {
            const cards = document.querySelectorAll('.instagram-card');
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].classList.contains('instagram-card-active')) {
                    cards[i].classList.remove('instagram-card-active');
                    cards[(i + 1) % cards.length].classList.add('instagram-card-active');
                    break;
                }
            }
        }
        // Ejecutar la función cada 3 segundos
        let intervalId = setInterval(toggleActiveImage, 3000);

        // Capturo edit clicks, si hay freno el intervalo
        editBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Freno el intervalo
                clearInterval(intervalId);
            })
        });
        // Si cancelan vuelve el intervalo
        cancelBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                intervalId = setInterval(toggleActiveImage, 3000);
            });
        });
    }

    // Logica para editar contendio

    let previousSrc;
    editBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const form = btn.closest('.edit-file-overlay');
            const cancelLabel = form.querySelector('.cancel-file-action');
            const selectFileLabel = form.querySelector('.instagram-input-file-label');
            const confirmFileBtn = form.querySelector('.confirm-instagram-file-btn');
            cancelLabel.classList.remove('hidden');
            selectFileLabel.classList.remove('hidden');
            confirmFileBtn.classList.remove('hidden');
        });
    });
    // Cuando tocan el boton de cancelar

    cancelBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const form = btn.closest('.edit-file-overlay');
            const cancelLabel = form.querySelector('.cancel-file-action');
            const selectFileLabel = form.querySelector('.instagram-input-file-label');
            const confirmFileBtn = form.querySelector('.confirm-instagram-file-btn');
            cancelLabel.classList.add('hidden');
            selectFileLabel.classList.add('hidden');
            confirmFileBtn.classList.add('hidden');
            // Vuelvo la imagen a la foto que tenia
            if (previousSrc) {
                form.closest('.instagram-card')?.querySelector('.instagram-image')?.setAttribute('src', previousSrc) ||
                    form.closest('.landing-video-container')?.querySelector('.video')?.setAttribute('src', previousSrc) ||
                    form.closest('.blog-background')?.querySelector('.blog-background-image')?.setAttribute('src', previousSrc) ||
                    form.closest('.product-gallery-card')?.querySelector('.gallery-image')?.setAttribute('src', previousSrc);
                previousSrc = undefined;
            }

            // Reiniciar el valor del elemento <input>
            form.querySelector('input').value = '';
        });
    });

    // Para mostrar la foto que subieron
    const hiddenInputsFile = document.querySelectorAll('.edit-file-input');
    hiddenInputsFile.forEach(input => {
        input.addEventListener('change', (e) => { //Subieron un archivo para cambiar la foto
            // Agarro esa foto
            const form = input.closest('.edit-file-overlay');
            const fileElement = form.closest('.instagram-card')?.querySelector('.instagram-image') ||
                form.closest('.landing-video-container')?.querySelector('.video') ||
                form.closest('.blog-background')?.querySelector('.blog-background-image') ||
                form.closest('.product-gallery-card')?.querySelector('.gallery-image');
            previousSrc = fileElement.getAttribute('src');
            var file = e.target.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                fileElement.setAttribute('src', e.target.result);
            }
            reader.readAsDataURL(file);
            // Cuando hay un cambio en el input, se agregan 2 input hidden con section_id y position
            let sectionInput = document.createElement('input');
            sectionInput.name = 'home_sections_id';
            sectionInput.setAttribute('hidden', true);
            const sectionValue = form.dataset.sectionid;
            sectionInput.value = sectionValue;
            // Ahora el de position
            let positionInput = document.createElement('input');
            positionInput.name = 'position';
            positionInput.setAttribute('hidden', true);
            const positionValue = form.dataset.position;
            positionInput.value = positionValue;
            // Armo tambien el oldFilename
            let oldFilenameInput = document.createElement('input');
            oldFilenameInput.name = 'old_filename';
            oldFilenameInput.setAttribute('hidden', true);
            const oldFilenameValue = previousSrc.split('/')[previousSrc.split('/').length - 1];
            oldFilenameInput.value = oldFilenameValue;
            // Agrego todos al form
            form.appendChild(sectionInput);
            form.appendChild(positionInput);
            form.appendChild(oldFilenameInput);

        })
    });

    // Logica para destruir los descuentos
    const startDestroyingProcess = document.querySelector('.start-discounts-destroying');
    const destroyDiscountsPopup = document.querySelector('.destroy-discounts-popup');
    const cancelButton = document.querySelector('.cancel-destroying-process-btn');
    const blackScreen = document.querySelector('.black-screen')
    startDestroyingProcess?.addEventListener('click',()=>{
        blackScreen.classList.add('black-screen-active');
        destroyDiscountsPopup.classList.add('destroy-discounts-popup-active');
    });
    cancelButton?.addEventListener('click',(e)=>{
        e.preventDefault();
        blackScreen.classList.remove('black-screen-active');
        destroyDiscountsPopup.classList.remove('destroy-discounts-popup-active');
    });
    blackScreen?.addEventListener('click',()=>{
        blackScreen.classList.remove('black-screen-active');
        destroyDiscountsPopup.classList.remove('destroy-discounts-popup-active');
    })

});