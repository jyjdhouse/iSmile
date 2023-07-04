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
            image.classList.remove('product-image-test-active', 'product-image-test-next-slide', 'product-image-test-prev-slide');
            if (index === actualIndex) {
                image.classList.add('product-image-test-active');
            } else if (index === (actualIndex + 1) % images.length) {
                image.classList.add('product-image-test-next-slide');
            } else {
                image.classList.add('product-image-test-prev-slide');
            }
            // ACA PREGUNTAMOS SI VIENE VIDEO

            if (image.classList.contains('video') && index == actualIndex) {
                image.currentTime = 0;
                image.play(); //Arranco el video
                const duration = image.duration * 1000; //Duracion del video 
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
                console.log('toco');
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

});