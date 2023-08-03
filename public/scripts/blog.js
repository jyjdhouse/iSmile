import { checkIfIsInScreen } from "./utils.js";

window.addEventListener('load', () => {

    const converter = new showdown.Converter();
    const filesContainer = Array.from(document.querySelectorAll('.other-img-container'));
    const adminActionsToggle = document.querySelector('.admin-toggle')
    const adminDropdown = document.querySelector('.blog-admin-actions-dropdown')
    const blogTextCont = document.querySelector('.blog-detail-text-container')
    const blogDateCont = document.querySelector('.blog-date')
    const otherFilesSection = document.querySelector('.other-img-list')
    const intervalTime = 3000
    let intervalId;

    // función para convertir a html el contenido
    const htmlText = converter.makeHtml(blogTextCont.innerText);
    blogTextCont.innerHTML = htmlText


    // por si hay menu de admin para togglearlo
    adminActionsToggle?.addEventListener('click', () => {
        adminDropdown.classList.toggle('blog-admin-actions-dropdown-active')
    });




    if (window.innerWidth < 768) { //Resolución mobile
        let actualIndex = 0;

        // Cuando baja hasta el carrusel arranca las fotos
        const observer = checkIfIsInScreen(.6, handleVisibleCarrusel, otherFilesSection)
        // Me fijo si aparece en pantalla
        observer.observe(otherFilesSection)

        // Logica para pasar entre foto y foto/video
        const updateBlogOtherFilesClasses = () => {
            // Si el actual index es > a la cantidad de imagenes es que vuelve a arrancar
            if (actualIndex >= filesContainer.length) actualIndex = 0;

            filesContainer.forEach((otherFileContainer, index) => {

                otherFileContainer.classList.remove('img-container-active', 'next-img-container', 'prev-img-container');
                if (index === actualIndex) {
                    otherFileContainer.classList.add('img-container-active');
                } else if (index === (actualIndex + 1) % filesContainer.length) {
                    otherFileContainer.classList.add('next-img-container');
                } else {
                    otherFileContainer.classList.add('prev-img-container');
                }
                // ACA PREGUNTAMOS SI VIENE VIDEO
                if (otherFileContainer.classList.contains('video-container') && index == actualIndex) {
                    const video = otherFileContainer.querySelector('.video');
                    video.currentTime = 0;
                    video.play(); //Arranco el video
                    const duration = video.duration * 1000 - 500; //Duración del video 
                    clearInterval(intervalId); //Limpio el intervalo de 0s
                    setTimeout(() => { //Video termina
                        intervalId = setInterval(() => {
                            // Reinicio video
                            video.pause();
                            // Paso a la siguiente al toque, y ejecuto devuelta el carousel
                            actualIndex++
                            updateBlogOtherFilesClasses();
                        }, intervalTime);
                    }, duration);
                } else if (!otherFileContainer.classList.contains('video') && index == actualIndex) {
                    //En el caso que no haya video
                    clearInterval(intervalId); //Por si no viene video, para que no quede con el intervalo inicial (0s)
                    intervalId = setInterval(() => {
                        actualIndex++
                        updateBlogOtherFilesClasses();
                    }, intervalTime);
                }
            });
        };
        function handleVisibleCarrusel (carrusel){
            intervalId = setInterval(() => {
                updateBlogOtherFilesClasses();
            }, 0);
        }
    } else { //Si es desktop tengo que hacer la logica de la cantidad de imagenes que me vienen
        const otherImages = document.querySelectorAll('.other-img-container');
        const otherImagesCount = otherImages?.length;
        if (otherImagesCount) {
            const widthToSet = 100 / otherImagesCount - 5;
            otherImages?.forEach(img => img.style.width = `${widthToSet}%`);
        }
    }

    const date = new Date(blogDateCont.innerText)
    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'long' });
    const year = date.getFullYear();

    const fullDate = `${day} de ${month} del ${year}`
    blogDateCont.innerHTML = fullDate

    // LOGICA para hacer correr los videos
    const videos = document.querySelectorAll('.video');
    videos.forEach(video => {
        const observer = checkIfIsInScreen(.6, handleVisibleVideo, video)
        // Me fijo si aparece en pantalla
        observer.observe(video)
    });
    function handleVisibleVideo (video){
        video.play();
    };
    
    // LOGICA para tocar boton "ELiminar productop"
    // Capturo cuando tocan el boton
    const startDeleteBtn = document.querySelector('.start-blog-delete');
    const deleteBlogFormPopup = document.querySelector('.update-delete-btn-container');
    const blackScreen = document.querySelector('.black-screen');
    const cancelBlogDeleteBtn = document.querySelector('.cancel-blog-delete');
    startDeleteBtn?.addEventListener('click', () => {
        // Hago aparecer el popup
        deleteBlogFormPopup.classList.add('update-delete-btn-container-active');
        blackScreen.classList.add('black-screen-active');
    });
    // si toca cancelar... 
    cancelBlogDeleteBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        // Hago desaparecer el popup
        deleteBlogFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
    // si toca blackscreen... 
    blackScreen?.addEventListener('click', () => {
        // Hago desaparecer el popup
        deleteBlogFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
})