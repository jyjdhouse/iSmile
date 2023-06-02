window.addEventListener('unload', () => {
    window.scrollTo(0, 0);
});
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
    let video = document.querySelector('.video');
    const rect = video.getBoundingClientRect();
    const elementPosition = rect.y //posicion que esta con respecto al total

    // Función que se ejecutará cuando se haga scroll
    function detectarElementoEnPantalla() {
        if (window.pageYOffset >= elementPosition) {
            // console.log('Se llego al video');
        }

        // Obtener la posición actual de la ventana gráfica
        const windowHeight = window.innerHeight;
        const totalViewportHeight = document.documentElement.scrollHeight;
        // console.log(totalViewportHeight);
        const windowTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowBottom = windowTop + windowHeight;

        // Verificar si el elemento está visible en la pantalla
        if (rect.top < windowBottom && rect.bottom > windowTop) {
            // El elemento está visible en la pantalla
            video.play(); //Arranca la reproduccion
        } else {
            // El elemento no está visible en la pantalla
            video.pause(); //Pausa la reproduccion
        }
    }

    // Detectar el elemento en la posición inicial
    detectarElementoEnPantalla();

    // Asignar la función al evento scroll
    window.addEventListener('scroll', detectarElementoEnPantalla);

    //funcion control video

    const videoToControl = document.querySelector('.video')
    const volumeBtns = document.querySelectorAll('.volume-controls')
    const volumeMuted = document.querySelector('.bx-volume-mute')
    const volumeFull = document.querySelector('.bx-volume-full')
    const playBtns = document.querySelectorAll('.play-btns')
    const pauseVideo = document.querySelector('.bx-pause')
    const playVideo = document.querySelector('.bx-play')


    let isVideoMuted = true
    let isVideoPaused = false
    if (isVideoMuted) {
        videoToControl.muted = true
        volumeFull.style.display = 'none'
    }
    if (!isVideoPaused) {
        videoToControl.play()
        playVideo.style.display = 'none'
    }

    const toggleVideoVolume = () => {
        volumeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                isVideoMuted = !isVideoMuted
                if (!isVideoMuted) {
                    videoToControl.muted = false
                    volumeFull.style.display = 'flex'
                    volumeMuted.style.display = 'none'
                } else {
                    videoToControl.muted = true
                    volumeFull.style.display = 'none'
                    volumeMuted.style.display = 'flex'
                }
            })
        })
    }
    toggleVideoVolume()

    const togglePlayVideo = () => {
        playBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                isVideoPaused = !isVideoPaused
                if (isVideoPaused) {
                    videoToControl.pause()
                    playVideo.style.display = 'flex'
                    pauseVideo.style.display = 'none'
                } else {
                    videoToControl.play()
                    playVideo.style.display = 'none'
                    pauseVideo.style.display = 'flex'
                }
            })
        })
    }
    togglePlayVideo()

    // LOGICA PARA GALLERY SHOW TODO: Si le gusta, hcaer funciones para activar/desactivar

    let galleryShowContainer = document.querySelector('.gallery-show-container');
    const galleryShowLabelContainer = document.querySelector('.gallery-show-label-container');
    let galleryTimeoutIds = new Map(); // Usamos un Map para almacenar los IDs de temporizador por cada producto
    // Agarro todos los productos, y escucho por si pasa el mouse por arriba
    let galleryProducts = Array.from(document.querySelectorAll('.product-gallery-card'));
    // Pregunto por tamano de pantalla, si es mobile dejo 3 en vez de 6
    if (window.innerWidth < 1024) { //Mobile y Tablet
        // Itera sobre los hijos del contenedor para dejarle solo 4 productos
        galleryProducts.forEach((prod, i) => {
            if (galleryProducts.length > 3) {
                galleryProducts.splice(i, 1);
                galleryShowContainer.removeChild(prod);
            };
        });
        // Logica de touch
        // Capturo si toca en algun lugar fuera de el contenedor asi le agrego devuelta la clase 'Ver productos'
        document.addEventListener("touchstart", function (e) {
            // Obtén la referencia al elemento que se tocó
            var target = e.target;
            // Verifica si el elemento tocado está fuera de galleryShow
            if (!galleryShowContainer.contains(target) && target !== galleryShowContainer) {
                galleryShowLabelContainer.classList.remove('gallery-show-label-container-hidden');
                // Cancelar los temporizadores de todos los productos
                clearTimeOutsIds();
            } else { //Toca el contenedor
                galleryShowLabelContainer.classList.add('gallery-show-label-container-hidden');
            };
            // Ahora voy por todas las tarjetas de productos
            galleryProducts.forEach(prod => {
                // Si toco en alguno de los productos
                if (!(!prod.contains(target) && target !== prod)) {
                    resetTimeout(prod)
                    const timeoutId = setTimeout(() => {
                        showProductDetail(prod)
                    }, 2000);
                    // Guardar el ID de temporizador en el Map
                    galleryTimeoutIds.set(prod, timeoutId);
                } else {
                    const timeoutId = galleryTimeoutIds.get(prod);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    hideProductDetail(prod)
                }
            })
        });

    } else {
        // Logica de hover
        galleryShowContainer.addEventListener('mouseenter', () => { //Aca tengo que ocultar el "Ver productos"
            galleryShowLabelContainer.classList.add('gallery-show-label-container-hidden');
            // Voy por cada producto
            galleryProducts.forEach(prod => {
                //         const galleryDetail = prod.querySelector('.gallery-product-detail');
                // Si se hace hover en en un producto
                prod.addEventListener('mouseenter', () => {
                    resetTimeout(prod)
                    const timeoutId = setTimeout(() => {
                        showProductDetail(prod)
                    }, 2000);
                    // Guardar el ID de temporizador en el Map
                    galleryTimeoutIds.set(prod, timeoutId);
                });
                //Si va por otro producto...
                prod.addEventListener('mouseleave', () => {
                    const timeoutId = galleryTimeoutIds.get(prod);
                    if (timeoutId) {
                        clearTimeout(timeoutId);
                    }
                    hideProductDetail(prod)
                });

            })
        });
        galleryShowContainer.addEventListener('mouseleave', () => { //Aca tengo que mostar el "Ver productos"
            galleryShowLabelContainer.classList.remove('gallery-show-label-container-hidden');
            // limpio los timeouts ids
            clearTimeOutsIds();

        });
    };
    // Funciones para mostrar/ocultar y para reiniciar el timeout
    function showProductDetail(prod) {
        const galleryDetail = prod.querySelector('.gallery-product-detail');
        galleryDetail.classList.add('gallery-product-detail-active');
    }

    function hideProductDetail(prod) {
        const galleryDetail = prod.querySelector('.gallery-product-detail');
        galleryDetail.classList.remove('gallery-product-detail-active');
    }

    function resetTimeout(prod) {
        const timeoutId = galleryTimeoutIds.get(prod);

        if (timeoutId) {
            clearTimeout(timeoutId);
            galleryTimeoutIds.delete(prod);
        }
    }

    function clearTimeOutsIds() {
        // Cancelar los temporizadores de todos los productos
        galleryTimeoutIds.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        galleryTimeoutIds.clear(); // Limpiar el Map después de cancelar los temporizadores
    }







    // LOGICA PARA ABOUT-US
    // Agarro a todos los contenedores
    const aboutUsContaner = document.querySelector('.about-us-container');
    // Me fijo si toco fuera asi saco todas las clases
    document.addEventListener('touchstart', (e) => {
        var target = e.target;
        // Verifico si toca fuera
        if (!aboutUsContaner.contains(target) && target !== aboutUsContaner) {
            clearTimeout(timeoutId);
            // Voy por cada contenedor
            topicContainers.forEach(cont => {
                const img = cont.querySelector('.topic-image');
                const video = cont.querySelector('.topic-video');
                const label = cont.querySelector('.topic-label');
                const viewMoreContainer = cont.querySelector('.view-more-container');
                //Dejo a todos con igual tamano
                cont.classList.remove('mobile-container-active')
                video.playbackRate = 1;
                video.currentTime = 0;
                img.classList.remove('hidden');
                video.classList.add('hidden');
                label.classList.remove('topic-label-hidden');
                viewMoreContainer.classList.remove('view-more-container-active');
            });
        }
    })
    let timeoutId;
    const topicContainers = document.querySelectorAll('.column-container');
    topicContainers.forEach(container => {
        const img = container.querySelector('.topic-image');
        const video = container.querySelector('.topic-video');
        const label = container.querySelector('.topic-label');
        const viewMoreContainer = container.querySelector('.view-more-container');

        // Haciendo el hover
        container.addEventListener('mouseenter', () => {
            if (window.innerWidth < 1024) {
                container.classList.add('mobile-container-active')
            }
            img.classList.add('hidden');
            video.classList.remove('hidden');
            label.classList.add('topic-label-hidden');
            // console.log('Tendria que mostrar el video');
            // console.log(video);
            const duration = (video.duration - video.duration * .2) * 1000  //En ms, lo corto un poco para que el timeout empieze justo antes
            console.log(duration);
            video.play();
            timeoutId = setTimeout(() => {
                video.playbackRate = 0.5;
                viewMoreContainer.classList.add('view-more-container-active')
                label.classList.remove('topic-label-hidden');
            }, duration);
        });
        // Deja de hacer el hover
        container.addEventListener('mouseleave', () => {
            if (window.innerWidth < 1024) {
                container.classList.remove('mobile-container-active');
            }
            clearTimeout(timeoutId);
            video.playbackRate = 1;
            video.currentTime = 0;
            img.classList.remove('hidden');
            video.classList.add('hidden');
            label.classList.remove('topic-label-hidden');
            viewMoreContainer.classList.remove('view-more-container-active');
        });
    })

})