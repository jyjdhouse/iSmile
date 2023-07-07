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

    // funcion para convertir a html el contenido
    const htmlText = converter.makeHtml(blogTextCont.innerText);
    blogTextCont.innerHTML = htmlText


    // por si hay menu de admin para togglearlo
    adminActionsToggle?.addEventListener('click', () => {
        adminDropdown.classList.toggle('blog-admin-actions-dropdown-active')
    });




    if (window.innerWidth < 768) { //Resolucion mobile
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

    } 

    const date = new Date(blogDateCont.innerText)
    const day = date.getDate();
    const month = date.toLocaleString('es', { month: 'long' });
    const year = date.getFullYear();

    const fullDate = `Creado el ${day} de ${month} del año ${year}`
    blogDateCont.innerHTML = fullDate

})