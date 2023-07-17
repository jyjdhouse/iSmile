window.addEventListener('load', () => {

    const converter = new showdown.Converter();
    const images = document.querySelectorAll('.other-img-container');
    const adminActionsToggle = document.querySelector('.admin-toggle')
    const adminDropdown = document.querySelector('.blog-admin-actions-dropdown')
    const blogTextCont = document.querySelector('.blog-detail-text-container')
    const blogDateCont = document.querySelector('.blog-date')
    const imgList = document.querySelector('.other-img-list')
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
        let activeImg = 0

        const autoSlideCondition = () => {
            if (activeImg < images.length - 1) {
                activeImg++
            } else {
                activeImg = 0
            }
            autoSlideCarousel()
        }

        const autoSlideCarousel = () => {
            images.forEach((img, i) => {
                if (images.length > 2) {

                    img.classList.remove('prev-img-container', 'next-img-container', 'img-container-active');
                    if (i == activeImg) {
                        img.classList.remove('prev-img-container')
                        img.classList.remove('next-img-container')
                        img.classList.add('img-container-active')
                    }
                    else if (i == activeImg - 1) {
                        img.classList.remove('img-container-active')
                        img.classList.remove('next-img-container')
                        img.classList.add('prev-img-container')
                    }
                    else if (i == images.length - 1 && activeImg == 0) {
                        img.classList.remove('img-container-active')
                        img.classList.remove('next-img-container')
                        img.classList.add('prev-img-container')
                    }
                    else {
                        img.classList.remove('img-container-active')
                        img.classList.remove('prev-img-container')
                        img.classList.add('next-img-container');
                    }
                    clearInterval(intervalId)
                    intervalId = setInterval(() => {
                        autoSlideCondition()
                    }, intervalTime);
                } else if (images.length === 1) {

                } else {
                    img.classList.remove('img-container-active', 'carousel-animation');

                    if (i === activeImg) {
                        img.classList.add('img-container-active');
                    } else {
                        img.classList.add('carousel-animation');
                    }
                    clearInterval(intervalId)
                    intervalId = setInterval(() => {
                        autoSlideCondition()
                    }, intervalTime);
                }

            })
        }
        intervalId = setInterval(() => {
            autoSlideCondition();
        }, 0);

    } else { //Si es desktop tengo que hacer la logica de la cantidad de imagenes que me vienen
        const otherImages = document.querySelectorAll('.other-img-container');
        const otherImagesCount = otherImages?.length;
        if(otherImagesCount){
            const widthToSet = 100/otherImagesCount - 5;
            otherImages?.forEach(img=>img.style.width =`${widthToSet}%`);
        }
    }

    const date = new Date(blogDateCont.innerText)
    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'long' });
    const year = date.getFullYear();

    const fullDate = `Creado el ${day} de ${month} del año ${year}`
    blogDateCont.innerHTML = fullDate


    // LOGICA para tocar boton "ELiminar productop"
    // Capturo cuando tocan el boton
    const startDeleteBtn = document.querySelector('.start-blog-delete');
    const deleteBlogFormPopup = document.querySelector('.update-delete-btn-container');
    const blackScreen = document.querySelector('.black-screen');
    const cancelBlogDeleteBtn = document.querySelector('.cancel-blog-delete');
    startDeleteBtn.addEventListener('click', () => {
        // Hago aparecer el popup
        deleteBlogFormPopup.classList.add('update-delete-btn-container-active');
        blackScreen.classList.add('black-screen-active');
    });
    // si toca cancelar... 
    cancelBlogDeleteBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Hago desaparecer el popup
        deleteBlogFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
    // si toca blackscreen... 
    blackScreen.addEventListener('click', () => {
        // Hago desaparecer el popup
        deleteBlogFormPopup.classList.remove('update-delete-btn-container-active');
        blackScreen.classList.remove('black-screen-active');
    });
})