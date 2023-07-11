import { checkIfIsInScreen, isInDesktop } from "./utils.js";

window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    let video = document.querySelector('.video');
    video.muted = true
    video.play();

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
            // console.log('Se llego al elemento');
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
    // Lo defino aca porque en mobile tiene repercucion
    const editBtns = document.querySelectorAll('.change-image-btn');
    const cancelBtns = document.querySelectorAll('.cancel-file-action');
    if (isInDesktop()) { //Desktop
        const igCards = document.querySelectorAll('.instagram-card');
        igCards.forEach((card,i) => {
            if(i==0)card.classList.remove('instagram-card-active')
            card.addEventListener('mouseenter', () => {
                const overlay = card.querySelector('.instagram-client-overlay');
                overlay.classList.add('instagram-client-overlay-active');
            });
            card.addEventListener('mouseleave', () => {
                const overlay = card.querySelector('.instagram-client-overlay');
                overlay.classList.remove('instagram-client-overlay-active');
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
            console.log(form.closest('.blog-background')?.querySelector('.blog-background-image'));
            form.closest('.instagram-card')?.querySelector('.instagram-image')?.setAttribute('src', previousSrc) ||
                form.closest('.landing-video-container')?.querySelector('.video')?.setAttribute('src', previousSrc) ||
                form.closest('.blog-background')?.querySelector('.blog-background-image')?.setAttribute('src', previousSrc) ||
                form.closest('.product-gallery-card')?.querySelector('.gallery-image')?.setAttribute('src', previousSrc);

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
            const oldFilenameValue = previousSrc.split('/')[previousSrc.split('/').length-1];
            oldFilenameInput.value = oldFilenameValue;
            // Agrego todos al form
            form.appendChild(sectionInput);
            form.appendChild(positionInput);
            form.appendChild(oldFilenameInput);

        })
    });



})