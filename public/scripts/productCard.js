import { activateClass, deactivateClass, listenSizesBtns, clearQuickActions } from './utils.js';
window.addEventListener('load', () => {
    const QuickActionsMobile = () => {
        const quickCartAddingBtns = document.querySelectorAll('.quick-cart-container'); //Todos los botones de carrito
        const quickSizesCloseBtns = document.querySelectorAll('.close-sizes-btn');
        quickCartAddingBtns.forEach(btn => { //Toca en el carro'
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Capturo el id del boton
                const productId = btn.dataset.productid;
                const colorId = btn.dataset.colorid
                // Encuentro al contenedor que se le dio click en el carro
                const container = quickActionContainers.find(cont => cont.dataset.productid == productId && cont.dataset.colorid == colorId);
                container.querySelector('.quick-sizes-container').classList.add('quick-sizes-container-active');
            });
        });
        quickSizesCloseBtns.forEach(btn => {
            btn.addEventListener('click', (e) => { //Toca la x para cerrar talles
                e.stopPropagation();
                // Capturo el id del boton
                const id = btn.dataset.productid;
                const colorId = btn.dataset.colorid
                // Encuentro al contenedor que se le dio click en el carro
                const container = quickActionContainers.find(cont => cont.dataset.productid == id && cont.dataset.colorid == colorId);
                clearQuickActionsMobile(container);
            })
        });
    };
    const clearQuickActionsMobile = (container) => {
        container?.querySelector('.quick-sizes-container').classList.remove('quick-sizes-container-active');
        container?.querySelector('.quick-cart-container').classList.remove('quick-cart-container-active');
        container?.querySelector('.quick-fav-container').classList.remove('quick-fav-container-active');
    }
    // const listenSizeBtns = () => {
    //     const btns = document.querySelectorAll('.quick-size');
    //     btns.forEach(btn => {
    //         btn.addEventListener('click', () => {
    //             body.classList.add('noScroll');
    //             activateClass([blackScreen, quickAddCartContainer]);
    //             // Desactivo la clase active
    //             quickActionContainers.forEach(cont => {
    //                 cont.querySelector('.quick-sizes-container').classList.remove('quick-sizes-container-active');
    //             });
    //         });
    //     });
    // };

    const body = document.querySelector('body');
    const carouselContainers = document.querySelectorAll('.product-card-container');
    const closeCartBtns = document.querySelectorAll('.close-cart-menu');

    const quickAddCartContainer = 'add-to-cart-container'
    const blackScreen = 'black-screen';

    // El Array.from es para convertirlo en un verdadero Array
    const quickActionContainers = Array.from(document.querySelectorAll('.product-quick-actions-container'));

    var intervalId;
    var timeout;
    var lastContainer;
    let currentImage = 0;

    // Discrimino por medidas de pantalla
    if (window.innerWidth < 1024) { // Mobile & Tablet
        QuickActionsMobile();
        // listenSizeBtns();

        // LOGICA PARA PASAR EL CARROUSEL CUANDO TOCA CON EL DEDO
        carouselContainers.forEach(container => {
            container.addEventListener('touchstart', () => {
                // Comparo el ultimo container con el que esta tocando
                if (container != lastContainer) { //Si es distinto
                    clearQuickActionsMobile(lastContainer); //Si estaba en quickActions, lo saco de ahi
                    clearInterval(intervalId); //Detengo el anterior
                    clearTimeout(timeout);
                    currentImage = 0;
                    //Vuelve a la 1er foto
                    lastContainer && handleCarouselAutoSlide(lastContainer.querySelectorAll('.product-image-test'));
                    //Arranco el nuevo
                    intervalId = setInterval(() => { //Esto es para que cambie la primer foto, 
                        // pero despues lo tengo que frenar y redefinir
                        handleConditionForSlide(container);
                    }, 0);
                };
                lastContainer = container;
            });
        });
    } else { //Destkop
        // Esto escucha un hover, por eso solo desktop
        carouselContainers.forEach(container => { //Va por cada carousel los productos
            container.addEventListener('mouseenter', () => { //Cuando el mouse se para arriba    

                intervalId = setInterval(() => { //Esto cambia la foto al instante pero con intervalId
                    handleConditionForSlide(container);//Apenas se para arriba, cambia la foto
                }, 0);
                applyQuickActions(container);
            });

            container.addEventListener('mouseleave', () => { //Cuando el mouse se va del producto
                currentImage = 0;
                const images = container.querySelectorAll('.product-image-test');

                images.forEach(img => {
                    if (img.classList.contains('video')) {//Si saco en el medio del video, lo pauso y lo reinicio
                        img.pause();
                        img.currentTime = 0
                    }
                });

                handleCarouselAutoSlide(images, container); //Vuelve a la 1er foto
                clearInterval(intervalId); // Detiene el carousel
                clearTimeout(timeout); //Por si no habia arrancado el timeout
                clearQuickActions(container); //no muestra mas el quickActions del product
            })
        });
    };

    window.addEventListener('resize', function () {
        if (window.innerWidth < 768) { // Menor a 768px
            QuickActionsMobile();
        }
    });

    // LOS BOTONES X DE LOS CART
    closeCartBtns.forEach(btn => {
        btn.addEventListener('click', () => { //Escucha la x de los cart quickCart
            deactivateClass([quickAddCartContainer, blackScreen]);
            body.classList.remove('noScroll');
        });
    });



    const handleConditionForSlide = (container) => { //Nos dice donde esta parada la foto para saber a cual pasar

        let images = container.querySelectorAll('.product-image-test');// Imagenes del producto

        if (currentImage < images.length - 1) {
            currentImage += 1;
        } else {
            currentImage = 0;
        };
        return handleCarouselAutoSlide(images, container);
    }

    const applyQuickActions = (container) => {//Escucha aquel contenedor que se le hace hover para aplicar quickActions

        container.querySelector('.product-quick-actions-container').classList.add(`product-quick-actions-container-active`);
        container.querySelector('.quick-cart-container').addEventListener('click', () => {
            container.querySelector('.quick-cart-container').classList.add('quick-cart-container-active');
            container.querySelector('.quick-fav-container').classList.add('quick-fav-container-active');
            container.querySelector('.quick-sizes-container').classList.add('quick-sizes-container-active');
        });
        let condition = true
        listenSizesBtns(condition);
    };



    const handleCarouselAutoSlide = (images, container) => { //[<prev>,<active>,<next>]
        let slidesLength = images.length;
        images.forEach((img, i) => { //Va por cada imagen de un producto particular
            // TODO: Ver logica para reproducir video
            if (i == currentImage) {
                img.classList.remove('product-image-test-prev-slide');
                img.classList.remove('product-image-test-next-slide');
                img.classList.add('product-image-test-active');
            } else if (i == currentImage - 1 || (currentImage == 0 && i == slidesLength - 1)) {
                img.classList.remove('product-image-test-active');
                img.classList.remove('product-image-test-next-slide');
                img.classList.add('product-image-test-prev-slide');
            }
            else {
                img.classList.remove('product-image-test-active');
                img.classList.remove('product-image-test-prev-slide');
                img.classList.add('product-image-test-next-slide');

            }

            // ACA PREGUNTAMOS SI VIENE VIDEO

            if (img.classList.contains('video') && i == currentImage) {
                img.play(); //Arranco el video
                const duration = img.duration * 1000; //Duracion del video 

                clearInterval(intervalId); //Limpio el intervalo de 0s
                timeout = setTimeout(() => { //Video termina
                    // Reinicio video
                    img.pause();
                    img.currentTime = 0;
                    // Paso a la siguiente al toque, y ejecuto devuelta el carousel
                    handleConditionForSlide(container);
                    intervalId = setInterval(() => {
                        handleConditionForSlide(container);
                    }, 2000);
                }, duration);

            } else if (!img.classList.contains('video') && currentImage == 1 && i == currentImage) {
                //En el caso que no haya video

                clearInterval(intervalId); //Por si no viene video, para que no quede con el intervalo inicial (0s)
                intervalId = setInterval(() => {
                    handleConditionForSlide(container);
                }, 2000);
            }
        });
    };


    document.querySelector(`.${blackScreen}`).addEventListener('click', () => {
        deactivateClass([quickAddCartContainer])
    });
});