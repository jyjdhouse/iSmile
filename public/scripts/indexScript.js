import { checkIfIsInScreen, isInDesktop } from "./utils.js";

window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    let video = document.querySelector('.video');
    console.log(video);

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
    const aboutUsContainer = document.querySelector('.about-us-container');
    // Funcion que maneja cuando el contenedor esta visible
    const handleAboutUsContainer = (visible) => {//Llega true o false
        const paragraphs = document.querySelectorAll('.about-us-information-paragraph');
        const list = document.querySelector('.about-us-details-list')
        const listItems = document.querySelectorAll('.about-us-list-item');
        const title = document.querySelector('.about-us-information-title');
        if (visible) { //Si esta en pantalla
            title.classList.add('about-us-information-title-visible');
            // Los parrafos
            paragraphs.forEach((p, i) => {
                p.style.animationDelay = `${1 * i}s`;
                p.classList.add('about-us-information-paragraph-visible');
            });
            // Los items de la lista
            listItems.forEach((l, i) => {
                l.style.animationDelay = `${5 + .5 * i}s`;
                l.classList.add('about-us-list-item-visible');
            });
            list.style.transitionDelay = `${4}s`;
            list.classList.add('about-us-details-list-visible')
            return
        }
    }
    const handleVisibleLabel = (label) => {
        label.classList.add('slide-image-label-visible');
    }
    // Crear una instancia del Intersection Observer
    const observer = checkIfIsInScreen(.4, handleAboutUsContainer, true)

    // Logica para mostrar labels en slideShow
    const labels = document.querySelectorAll('.slide-image-label');
    const slideImageContainers = document.querySelectorAll('.slide-image-container')
    if (isInDesktop()) { //Si esta en desktop es distinto el slideShow
        slideImageContainers.forEach(container => {
            container.addEventListener('mouseenter', () => {
                const labelToActivate = container.querySelector('.slide-image-label');
                labelToActivate.classList.add('slide-image-label-visible');
                // Freno el slideShow
                clearInterval(slideIntervalId);
            });
            container.addEventListener('mouseleave', () => {
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

    // Observar el contenedor
    observer.observe(aboutUsContainer);

    // LOGICA para slideShow
    let slideImagesGroup;
    // Depende que resolucion agarro los diferentes grupos
    if(isInDesktop()){
        slideImagesGroup = document.querySelector('.slide-images-wraper-desktop').querySelectorAll('.slide-image-group')
    } else{
        slideImagesGroup = document.querySelector('.slide-images-wraper-mobile').querySelectorAll('.slide-image-group')
    }
    let currentIndex = 1;

    function updateSlideShow() {
        slideImagesGroup.forEach((container, index) => {
          container.classList.remove('slide-image-group-active', 'slide-image-group-next', 'slide-image-group-prev');
          if (index === currentIndex) {
            container.classList.add('slide-image-group-active');
          } else if (index === (currentIndex + 1) % slideImagesGroup.length) {
            container.classList.add('slide-image-group-next');
          } else if (index === (currentIndex - 1 + slideImagesGroup.length) % slideImagesGroup.length) {
            container.classList.add('slide-image-group-prev');
          }
        });
        currentIndex = (currentIndex + 1) % slideImagesGroup.length;
      }
    let slideIntervalId = setInterval(updateSlideShow, 5000);


})