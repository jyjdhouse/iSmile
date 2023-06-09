import { checkIfIsInScreen, isInDesktop } from "./utils.js";

window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    let video = document.querySelector('.video');
    // video.muted = true
    // video.play();

    // Función que se ejecutará cuando se haga scroll
    function detectarElementoEnPantalla(e, element) {
        // console.log(e);
        const rect = element.getBoundingClientRect();
        const elementPosition = rect.y //posicion que esta con respecto al total
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
            console.log('Se llego al elemento');
            // video.play(); //Arranca la reproduccion
        } else {
            // El elemento no está visible en la pantalla
            console.log('Se FUE del elemento');
            // video.pause(); //Pausa la reproduccion
        }
    }

    // Detectar el elemento en la posición inicial
    // detectarElementoEnPantalla();

    // Asignar la función al evento scroll
    // window.addEventListener('scroll', detectarElementoEnPantalla(video));



    // LOGICA QUE APAREZCAN LOS TEXTOS AL SCROLLEAR
    const handleVisibleLabel = (label) => {
        label.classList.add('slide-image-label-visible');
    }

    // Logica para mostrar labels en slideShow
    const labels = document.querySelectorAll('.slide-image-label');
    const slideImageContainers = document.querySelectorAll('.slide-image-container')
    if (isInDesktop()) { //Si esta en desktop es distinto el slideShow
        slideImageContainers?.forEach(container => {
            container.addEventListener('mouseenter', () => {
                const labelToActivate = container.querySelector('.slide-image-label');
                labelToActivate.classList.add('slide-image-label-visible');
                // Freno el slideShow
                clearInterval(slideIntervalId);
            });
            container?.addEventListener('mouseleave', () => {
                const labelToDeactivate = container.querySelector('.slide-image-label');
                labelToDeactivate.classList.remove('slide-image-label-visible');
                slideIntervalId = setInterval(updateSlideShow, 5000);
            });
        });
    } else { //Aca es otra logica
        labels.forEach(lab => {

            const labelObserver = checkIfIsInScreen(.5, handleVisibleLabel, lab);
            labelObserver.observe(lab);
        });
    }


    // LOGICA para slideShow
    let slideImagesGroup;
    // Depende que resolucion agarro los diferentes grupos
    if (isInDesktop()) {
        slideImagesGroup = document.querySelector('.slide-images-wraper-desktop').querySelectorAll('.slide-image-group')
    } else {
        slideImagesGroup = document.querySelector('.slide-images-wraper-mobile').querySelectorAll('.slide-image-group')
    }
    let slideShowIndex = 1;

    function updateSlideShow() {
        // Le saco el nombre porque aparece una vez que esta en vista
        labels.forEach(lab => lab.classList.remove('slide-image-label-visible'));
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
    let slideIntervalId = setInterval(updateSlideShow, 5000);

    // LOGICA para aboutUS
    const detailsContainer = document.querySelector('.about-us-details-container');
    const lists = document.querySelectorAll('.about-us-details-list');
    // Funcion que maneja cuando el contenedor esta visible
    const handleVisibleLists = () => {
        lists.forEach((element, i) => {
            element.style.transitionDelay = `${i * 1}s`
            element.classList.add('about-us-details-list-visible')
        });
        detailsContainer.classList.add('about-us-details-container-active');
    }
    // Crear una instancia del Intersection Observer
    const detailsObserver = checkIfIsInScreen(.4, handleVisibleLists, true);
    detailsObserver.observe(detailsContainer);
    if (!isInDesktop()) { //Mobile
        let aboutUsIndex = 1
        function toggleActiveAboutUsInfo() {
            const frames = document.querySelectorAll('.about-us-frame');
            const details = document.querySelectorAll('.about-us-details-container-mobile .about-us-details-list')
            frames.forEach((frame, index) => {
                frame.classList.remove('about-us-frame-active', 'about-us-frame-next', 'about-us-frame-prev');
                if (index === aboutUsIndex) {
                    frame.classList.add('about-us-frame-active');
                } else if (index === (aboutUsIndex + 1) % frames.length) {
                    frame.classList.add('about-us-frame-next');
                } else {
                    frame.classList.add('about-us-frame-prev');
                }
            });
            details.forEach((det, index) => {
                det.classList.remove('about-us-details-list-active', 'about-us-details-list-next', 'about-us-details-list-prev');
                if (index === aboutUsIndex) {
                    det.classList.add('about-us-details-list-active');
                } else if (index === (aboutUsIndex + 1) % details.length) {
                    det.classList.add('about-us-details-list-next');
                } else {
                    det.classList.add('about-us-details-list-prev');
                }
            });
            aboutUsIndex = (aboutUsIndex + 1) % frames.length;
        }
        // Ejecutar la función cada 3 segundos
        setInterval(toggleActiveAboutUsInfo, 3000);
    }


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
                    }, time);
                }
            });
        });

    }

    // LOGICA para instagram posts

    if (isInDesktop()) {
        const igCards = document.querySelectorAll('.instagram-card');
        igCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.instagram-overlay');
                overlay.classList.add('instagram-overlay-active');
            });
            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.instagram-overlay');
                overlay.classList.remove('instagram-overlay-active');
            });
        });
    } else { //Mobile
        function toggleActiveImage() {
            const cards = document.querySelectorAll('.instagram-card');
            console.log(cards);
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].classList.contains('instagram-card-active')) {
                    cards[i].classList.remove('instagram-card-active');
                    cards[(i + 1) % cards.length].classList.add('instagram-card-active');
                    break;
                }
            }
        }
        // Ejecutar la función cada 3 segundos
        setInterval(toggleActiveImage, 3000);
    }
})